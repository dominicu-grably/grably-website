"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────────────────────

type DeliveryStatus =
  | "pending"
  | "picked_up"
  | "en_route"
  | "arrived"
  | "completed"
  | "incomplete"
  | "failed"
  | "returned"
  | "cancelled"
  | "unavailable";

interface TrackingData {
  delivery_status: DeliveryStatus | null;
  driver_first_name: string | null;
  vehicle_description: string | null;
  store_name: string | null;
  vehicle_plate: string | null;
  attempt_count: number | null;
  picked_up_at: string | null;
  en_route_at: string | null;
  arrived_at: string | null;
  completed_at: string | null;
}

type ViewState = "loading" | "loaded" | "not_found" | "error";

// ── Constants ─────────────────────────────────────────────────────────────────

const POLL_MS = 30_000;

// Terminal outcomes: stop polling permanently. 'incomplete' is deliberately NOT
// here — a retry may follow, so we keep polling.
const TERMINAL_STATUSES = new Set<DeliveryStatus>([
  "completed",
  "failed",
  "returned",
  "cancelled",
  "unavailable",
]);

// The "unable to deliver" group (all terminal failure outcomes).
const FAILURE_STATUSES = new Set<DeliveryStatus>([
  "failed",
  "returned",
  "cancelled",
  "unavailable",
]);

// Created once at module scope. If the public env vars are missing (e.g. a build
// without them configured) this stays null and the view falls into the error
// state rather than throwing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// ── Copy per status ───────────────────────────────────────────────────────────

interface StatusCopy {
  headline: string;
  body: string;
  timeline: boolean;
  completedHeadline?: boolean; // render the headline in green
}

function copyFor(status: DeliveryStatus | null): StatusCopy {
  switch (status) {
    case null:
    case "pending":
      return {
        headline: "Order received",
        body: "Your order is being prepared.",
        timeline: true,
      };
    case "picked_up":
      return {
        headline: "With the driver",
        body: "Your order is with the driver and out for delivery today.",
        timeline: true,
      };
    case "en_route":
    case "arrived":
      // Nothing writes 'arrived' today (reserved for a future arrival-detection
      // feature), but complete-delivery still accepts it as a valid input status,
      // so map it to the en_route presentation defensively rather than falling
      // through to the failure group.
      return {
        headline: "On its way",
        body: "Your order is on its way to you.",
        timeline: true,
      };
    case "completed":
      return {
        headline: "Delivered",
        body: "Your order has been delivered. Thank you.",
        timeline: true,
        completedHeadline: true,
      };
    case "incomplete":
      return {
        headline: "We missed you",
        body: "Your driver stopped by but couldn't reach you. They may try again shortly.",
        timeline: false,
      };
    default:
      // failed / returned / cancelled / unavailable
      return {
        headline: "Unable to deliver",
        body: "We couldn't complete this delivery. Please contact the store to reschedule.",
        timeline: false,
      };
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

// "{vehicle_description} · plate ending {vehicle_plate}", degrading gracefully.
function vehicleLine(description: string | null, plate: string | null): string | null {
  if (!description) return null;
  if (!plate) return description;
  return `${description} · plate ending ${plate}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TrackingView({ token }: { token: string }) {
  const [state, setState] = useState<ViewState>("loading");
  const [data, setData] = useState<TrackingData | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let stopped = false;
    let terminal = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    const clearPoll = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const load = async () => {
      if (!supabase) {
        if (!stopped) setState("error");
        return;
      }
      try {
        const { data: rows, error } = await supabase.rpc("get_tracking_status", {
          p_token: token,
        });
        if (stopped) return;
        if (error) {
          setState("error");
          return;
        }
        if (!rows || rows.length === 0) {
          setState("not_found");
          return;
        }
        const row = rows[0] as TrackingData;
        setData(row);
        setState("loaded");
        // Stop polling permanently once the delivery reaches a terminal outcome.
        if (row.delivery_status && TERMINAL_STATUSES.has(row.delivery_status)) {
          terminal = true;
          clearPoll();
        }
      } catch {
        if (!stopped) setState("error");
      }
    };

    // Refetch immediately when the tab becomes visible so a returning customer
    // sees current state, not stale.
    const onVisibility = () => {
      if (!terminal && document.visibilityState === "visible") load();
    };

    load();
    // Poll every 30s, but skip while the tab is hidden (Page Visibility API).
    interval = setInterval(() => {
      if (!terminal && document.visibilityState === "visible") load();
    }, POLL_MS);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      clearPoll();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [token, retryCount]);

  const retry = () => {
    setState("loading");
    setRetryCount((c) => c + 1);
  };

  return (
    <main className="flex min-h-screen items-start justify-center bg-grably-offwhite px-4 py-10 sm:py-16">
      <div className="w-full max-w-md rounded-[12px] border-[0.5px] border-[#E3E8E4] bg-white p-6 sm:p-8">
        {state === "loading" && (
          <p className="text-sm text-[#A3B0A6]">Loading your delivery status…</p>
        )}

        {state === "not_found" && (
          <>
            <h1 className="font-serif text-2xl font-bold text-grably-dark">
              We couldn&apos;t find this delivery
            </h1>
            <p className="mt-3 text-grably-textmid">
              This tracking link may have expired or the address may be incorrect.
            </p>
          </>
        )}

        {state === "error" && (
          <>
            <h1 className="font-serif text-2xl font-bold text-grably-dark">
              Something went wrong
            </h1>
            <p className="mt-3 text-grably-textmid">
              We couldn&apos;t load your delivery status. Please try again shortly.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-5 rounded bg-grably-dark px-5 py-2.5 font-bold text-white transition-colors hover:bg-grably-mid"
            >
              Try again
            </button>
          </>
        )}

        {state === "loaded" && data && <Loaded data={data} />}

        <p className="mt-8 text-xs text-[#A3B0A6]">Delivery tracking by Grably</p>
      </div>
    </main>
  );
}

// ── Loaded view ───────────────────────────────────────────────────────────────

function Loaded({ data }: { data: TrackingData }) {
  const status = data.delivery_status;
  const copy = copyFor(status);

  const isFailure = status ? FAILURE_STATUSES.has(status) : false;
  const isCompleted = status === "completed";
  const isIncomplete = status === "incomplete";

  // The driver is no longer relevant once the delivery is over (completed or a
  // terminal failure). Shown for every other state, but only if a driver name
  // actually exists (an undispatched order has none).
  const showDriver = !isCompleted && !isFailure && !!data.driver_first_name;
  const vehicle = vehicleLine(data.vehicle_description, data.vehicle_plate);

  return (
    <>
      {data.store_name && (
        <p className="text-xs uppercase tracking-wide text-[#A3B0A6]">{data.store_name}</p>
      )}

      <h1
        className={`mt-1 font-serif text-2xl font-bold ${
          copy.completedHeadline ? "text-[#27AE60]" : "text-grably-dark"
        }`}
      >
        {copy.headline}
      </h1>
      <p className="mt-3 text-grably-textmid">{copy.body}</p>

      {isIncomplete && (
        <div
          className="mt-5 bg-[#FBF6EC] px-4 py-3 text-sm text-[#854F0B]"
          style={{ borderLeft: "2px solid #BA7517", borderRadius: 0 }}
        >
          {data.attempt_count != null
            ? `Attempt ${data.attempt_count} of 3`
            : "Delivery attempted"}
        </div>
      )}

      {copy.timeline && <Timeline data={data} />}

      {showDriver && (
        <div className="mt-6 border-t border-[#E3E8E4] pt-5">
          <p className="text-xs uppercase tracking-wide text-[#A3B0A6]">Your driver</p>
          <p className="mt-1 font-medium text-grably-dark">{data.driver_first_name}</p>
          {vehicle && <p className="mt-0.5 text-sm text-grably-textmid">{vehicle}</p>}
        </div>
      )}
    </>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────

function Timeline({ data }: { data: TrackingData }) {
  // Three stages. The 'arrived' state (deliveries.arrived_at) is never written by
  // any code path today, so an "Out for delivery" stage would never fill — it's
  // dropped until arrival detection exists. arrived_at is still returned by the
  // RPC, so restoring the stage is a one-line change if that ships.
  const stages: { label: string; at: string | null }[] = [
    { label: "With the driver", at: data.picked_up_at },
    { label: "On its way", at: data.en_route_at },
    { label: "Delivered", at: data.completed_at },
  ];

  return (
    <ol className="mt-6">
      {stages.map((stage, i) => {
        const reached = stage.at !== null;
        const time = formatTime(stage.at);
        return (
          <li key={stage.label} className="flex gap-3">
            {/* Dot + connector column */}
            <div className="flex flex-col items-center">
              {/* Connector above the dot (green if this stage is reached) */}
              {i > 0 && (
                <span
                  className="h-5 w-px"
                  style={{ backgroundColor: reached ? "#27AE60" : "#E3E8E4" }}
                />
              )}
              <span
                className="h-3 w-3 rounded-full"
                style={
                  reached
                    ? { backgroundColor: "#27AE60" }
                    : { backgroundColor: "#FFFFFF", border: "1.5px solid #C9D3CC" }
                }
              />
            </div>
            {/* Label + timestamp */}
            <div className={`flex-1 ${i > 0 ? "pt-3" : ""} pb-1`}>
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={reached ? "text-grably-dark" : "text-[#A3B0A6]"}
                >
                  {stage.label}
                </span>
                {reached && time && (
                  <span className="text-sm text-grably-textmid">{time}</span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
