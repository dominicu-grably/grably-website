"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

type TierId = "not-running" | "compliant" | "partial" | "high-risk";
type Phase = "questions" | "lead" | "result";

interface Option {
  label: string;
  description: string;
  value: number;
  gap: string | null;
}

interface Question {
  id: number;
  prompt: string;
  sub: string;
  options: Option[];
}

// A color can come from a brand token (className) or, where no token exists
// (amber / red), an inline hex — matching the spec.
interface ColorProps {
  className?: string;
  style?: React.CSSProperties;
}

interface TierMeta {
  badge: string;
  headline: string;
  sub: string;
  cta: string;
  color: ColorProps;
}

interface ResultData {
  score: number;
  scorePercent: number;
  gaps: string[];
  tier: TierId;
  q1Value: number;
}

// ─── Content (authoritative — do not edit copy) ─────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: "Is your store currently offering same-day delivery to customers?",
    sub: "LCRB permits licensed BC retailers to offer delivery using retailer-employed drivers.",
    options: [
      {
        label: "Yes — we run delivery now",
        description: "Active delivery operation with at least one driver",
        value: 2,
        gap: null,
      },
      {
        label: "Planning to start soon",
        description: "Within the next 3 months",
        value: 1,
        gap: null,
      },
      {
        label: "No — not offering delivery",
        description: "In-store and pickup only",
        value: 0,
        gap: null,
      },
    ],
  },
  {
    id: 2,
    prompt: "How do you assign delivery orders to drivers today?",
    sub: "The LCRB requires a documented record of which driver handled each delivery.",
    options: [
      {
        label: "Phone call or text message",
        description: "We call or text the driver with order details",
        value: 0,
        gap: "Dispatch method not documented — LCRB requires driver identity per delivery",
      },
      {
        label: "WhatsApp or messaging app",
        description: "Group chat or direct message to driver",
        value: 0,
        gap: "Dispatch method not documented — LCRB requires driver identity per delivery",
      },
      {
        label: "Spreadsheet or paper log",
        description: "Manual entry of order assignments",
        value: 1,
        gap: "Spreadsheet dispatch lacks timestamp and driver identity enforcement",
      },
      {
        label: "Dedicated dispatch software",
        description: "Orders assigned and tracked digitally with records",
        value: 2,
        gap: null,
      },
    ],
  },
  {
    id: 3,
    prompt: "How does your driver verify customer age at the door?",
    sub: "LCRB requires proof that age verification was conducted at point of delivery — not just at order placement.",
    options: [
      {
        label: "They check ID but don't record it",
        description: "Verbal check only, nothing documented",
        value: 0,
        gap: "No documented age verification at delivery — high enforcement risk",
      },
      {
        label: "We trust the customer's word",
        description: "No ID check at the door",
        value: 0,
        gap: "No documented age verification at delivery — high enforcement risk",
      },
      {
        label: "Driver writes it down manually",
        description: "Paper log or notes app",
        value: 1,
        gap: "Manual age verification records are inconsistent and hard to produce in an audit",
      },
      {
        label: "Captured in a delivery app with photo/record",
        description: "Timestamped digital record of ID verification",
        value: 2,
        gap: null,
      },
    ],
  },
  {
    id: 4,
    prompt: "What proof do you have that each delivery was completed?",
    sub: "LCRB requires customer acknowledgment of receipt as part of your delivery record.",
    options: [
      {
        label: "Driver texts us when done",
        description: "Informal confirmation only",
        value: 0,
        gap: "No proof of delivery documented — cannot demonstrate completion in an audit",
      },
      {
        label: "Nothing — we assume it's delivered",
        description: "No formal confirmation step",
        value: 0,
        gap: "No proof of delivery documented — cannot demonstrate completion in an audit",
      },
      {
        label: "Photo or note in a chat",
        description: "Driver sends a photo to confirm",
        value: 1,
        gap: "Manual proof of delivery is incomplete without customer signature or timestamped photo",
      },
      {
        label: "Customer signature + photo in delivery app",
        description: "Timestamped and stored with the delivery record",
        value: 2,
        gap: null,
      },
    ],
  },
  {
    id: 5,
    prompt: "If a delivery fails — customer not home, refused — what's your process?",
    sub: "The LCRB requires a documented reason for every failed delivery attempt.",
    options: [
      {
        label: "Driver brings it back, no record",
        description: "No documentation of why it wasn't delivered",
        value: 0,
        gap: "Failed deliveries not documented — creates compliance gap if questioned by LCRB",
      },
      {
        label: "Driver lets us know verbally or by text",
        description: "Informal notification, no formal log",
        value: 1,
        gap: "Informal failed delivery records are difficult to produce in an audit",
      },
      {
        label: "Reason code documented in delivery system",
        description: "Timestamped record with reason (not home, refused, etc.)",
        value: 2,
        gap: null,
      },
    ],
  },
  {
    id: 6,
    prompt: "Can you produce a complete delivery log for last Tuesday within 5 minutes?",
    sub: "This is the LCRB's standard audit request. The log must include driver, timestamps, addresses, and outcomes for every delivery that day.",
    options: [
      {
        label: "No — we'd have to piece it together",
        description: "Records are scattered across texts and notes",
        value: 0,
        gap: "Cannot produce delivery records on demand — critical audit risk",
      },
      {
        label: "Partially — we have some information",
        description: "Some records exist but not a complete log",
        value: 1,
        gap: "Partial delivery records — gaps in driver identity, timestamps, or outcomes",
      },
      {
        label: "Yes — it's in our system ready to export",
        description: "Complete, timestamped log available immediately",
        value: 2,
        gap: null,
      },
    ],
  },
  {
    id: 7,
    prompt: "Do you generate a compliance manifest for each delivery run?",
    sub: "A delivery manifest is a consolidated LCRB-required document covering all deliveries in a single run — driver, vehicle, items, timestamps, and outcomes.",
    options: [
      {
        label: "No — I didn't know this was required",
        description: "No manifest document produced",
        value: 0,
        gap: "No delivery manifest generated — required by LCRB for every delivery run",
      },
      {
        label: "We create something manually",
        description: "Spreadsheet or document we compile ourselves",
        value: 1,
        gap: "Manual manifests are inconsistent and may not meet LCRB format requirements",
      },
      {
        label: "Yes — auto-generated by our system",
        description: "PDF manifest created automatically per run",
        value: 2,
        gap: null,
      },
    ],
  },
];

const TIERS: Record<TierId, TierMeta> = {
  "not-running": {
    badge: "Not yet running delivery",
    headline: "Good news — you can start right",
    sub: "You're not running delivery yet, which means you can set up a fully compliant operation from day one. Most retailers who try to add compliance later find it much harder.",
    cta: "See how Grably sets you up right from day one →",
    color: { style: { color: "#F59E0B" } },
  },
  compliant: {
    badge: "Mostly compliant",
    headline: "You're in good shape — a few gaps to close",
    sub: "Your delivery operation has most of the compliance pieces in place. The gaps below are worth addressing before your next LCRB inspection.",
    cta: "See how Grably closes these gaps automatically →",
    // #2ECC71 === grably-accent, so use the brand token instead of a hex.
    color: { className: "text-grably-accent" },
  },
  partial: {
    badge: "Partial compliance",
    headline: "You have meaningful compliance gaps",
    sub: "Your delivery operation has several areas the LCRB specifically looks for in an inspection. These aren't hypothetical risks — they're the reason retailers get fined.",
    cta: "Book a free 20-minute call to fix these gaps →",
    color: { style: { color: "#F59E0B" } },
  },
  "high-risk": {
    badge: "High compliance risk",
    headline: "Your delivery operation has serious compliance gaps",
    sub: "The LCRB has been increasing delivery-specific inspections in BC. Running delivery without these records in place is the most common reason retailers face fines and suspension.",
    cta: "Book a free call — we can fix this in 24 hours →",
    color: { style: { color: "#E24B4A" } },
  },
};

const NO_GAPS_MESSAGE =
  "No major gaps detected. Your delivery operation appears to have the key compliance elements in place.";

const TOTAL_STEPS = QUESTIONS.length + 1; // 7 questions + lead capture
const RING_RADIUS = 54;
const RING_CIRC = 2 * Math.PI * RING_RADIUS;

// ─── Helpers ────────────────────────────────────────────────────────────────

type Answers = Record<number, number>; // question id → selected option index

function computeResult(answers: Answers): ResultData {
  const q1Value = QUESTIONS[0].options[answers[1]].value;

  let score = 0;
  const gaps: string[] = [];
  for (let id = 2; id <= 7; id++) {
    const option = QUESTIONS[id - 1].options[answers[id]];
    score += option.value;
    if (option.gap) gaps.push(option.gap);
  }

  const scorePercent = Math.round((score / 12) * 100);

  let tier: TierId;
  if (q1Value === 0) tier = "not-running";
  else if (scorePercent >= 75) tier = "compliant";
  else if (scorePercent >= 40) tier = "partial";
  else tier = "high-risk";

  return { score, scorePercent, gaps, tier, q1Value };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

// ─── Score ring ─────────────────────────────────────────────────────────────

function ScoreRing({
  percent,
  display,
  color,
}: {
  percent: number;
  display: string;
  color: ColorProps;
}) {
  const [offset, setOffset] = useState(RING_CIRC);

  useEffect(() => {
    const target = RING_CIRC * (1 - percent / 100);
    const raf = requestAnimationFrame(() => setOffset(target));
    return () => cancelAnimationFrame(raf);
  }, [percent]);

  return (
    <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="8"
          stroke="currentColor"
          className="text-grably-gray"
        />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={RING_CIRC}
          strokeDashoffset={offset}
          className={color.className}
          style={{ transition: "stroke-dashoffset 1s ease-out", ...color.style }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn("text-2xl font-bold", color.className)}
          style={color.style}
        >
          {display}
        </span>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export function ComplianceQuiz() {
  const [phase, setPhase] = useState<Phase>("questions");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);

  const currentQuestion = QUESTIONS[qIndex];
  const currentStepNumber =
    phase === "questions" ? qIndex + 1 : TOTAL_STEPS; // lead == last step
  const progress = (currentStepNumber / TOTAL_STEPS) * 100;

  const selectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const goBack = () => {
    if (phase === "lead") {
      setPhase("questions");
      setQIndex(QUESTIONS.length - 1);
      return;
    }
    if (qIndex > 0) setQIndex((i) => i - 1);
  };

  const goNext = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex((i) => i + 1);
    } else {
      setPhase("lead");
    }
  };

  const canSubmitLead =
    firstName.trim().length > 0 &&
    storeName.trim().length > 0 &&
    isValidEmail(email);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || !canSubmitLead) return;

    const computed = computeResult(answers);
    setResult(computed);
    setSubmitting(true);
    setSubmitError(null);

    const answersRecord: Record<string, string> = {};
    for (const question of QUESTIONS) {
      const optionIndex = answers[question.id];
      if (optionIndex !== undefined) {
        answersRecord[question.prompt] = question.options[optionIndex].label;
      }
    }

    try {
      const response = await fetch("/api/compliance-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          storeName: storeName.trim(),
          email: email.trim(),
          score: computed.score,
          scorePercent: computed.scorePercent,
          gaps: computed.gaps,
          tier: computed.tier,
          answers: answersRecord,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        setSubmitError(
          "We couldn't save your results, but they're shown below. Reach us at hello@grably.ca if you'd like a copy."
        );
      }
    } catch {
      setSubmitError(
        "We couldn't save your results, but they're shown below. Reach us at hello@grably.ca if you'd like a copy."
      );
    } finally {
      setSubmitting(false);
      setPhase("result"); // always show the result — never trap the user
    }
  };

  return (
    <div className="rounded-2xl border border-grably-gray bg-white p-6 shadow-sm sm:p-8">
      {phase !== "result" && (
        <div className="mb-8">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-grably-gray">
            <div
              className="h-full rounded-full bg-grably-accent transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-grably-textmid">
            Step {currentStepNumber} of {TOTAL_STEPS}
          </p>
        </div>
      )}

      {/* Question step */}
      {phase === "questions" && (
        <div>
          <fieldset>
            <legend className="font-serif text-xl font-bold text-grably-text sm:text-2xl">
              {currentQuestion.prompt}
            </legend>
            <p className="mt-2 text-sm text-grably-textmid">
              {currentQuestion.sub}
            </p>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((option, index) => {
                const selected = answers[currentQuestion.id] === index;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => selectOption(currentQuestion.id, index)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-colors",
                      selected
                        ? "border-grably-accent bg-grably-offwhite"
                        : "border-grably-gray hover:border-grably-accent/50"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                        selected ? "border-grably-accent" : "border-grably-gray"
                      )}
                    >
                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-grably-accent" />
                      )}
                    </span>
                    <span>
                      <span className="block font-semibold text-grably-text">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-sm text-grably-textmid">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={qIndex === 0}
              className="rounded px-4 py-2.5 text-sm font-medium text-grably-textmid transition-colors hover:text-grably-dark disabled:invisible"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={answers[currentQuestion.id] === undefined}
              className="rounded bg-grably-dark px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-grably-mid disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Lead capture step */}
      {phase === "lead" && (
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="font-serif text-xl font-bold text-grably-text sm:text-2xl">
            Where should we send your results?
          </h2>
          <p className="mt-2 text-sm text-grably-textmid">
            Get your compliance score and a breakdown of exactly where your gaps
            are.
          </p>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-grably-text">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeName" className="text-grably-text">
                Store Name
              </Label>
              <Input
                id="storeName"
                name="storeName"
                required
                autoComplete="organization"
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-grably-text">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded px-4 py-2.5 text-sm font-medium text-grably-textmid transition-colors hover:text-grably-dark"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!canSubmitLead || submitting}
              className="rounded bg-grably-dark px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-grably-mid disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Calculating…" : "See My Results"}
            </button>
          </div>
        </form>
      )}

      {/* Result step */}
      {phase === "result" && result && (
        <ResultView result={result} firstName={firstName.trim()} error={submitError} />
      )}
    </div>
  );
}

// ─── Result view ────────────────────────────────────────────────────────────

function ResultView({
  result,
  firstName,
  error,
}: {
  result: ResultData;
  firstName: string;
  error: string | null;
}) {
  const tier = TIERS[result.tier];
  const isNotRunning = result.tier === "not-running";
  const ringPercent = isNotRunning ? 100 : result.scorePercent;
  const ringDisplay = isNotRunning ? "N/A" : `${result.scorePercent}%`;
  const showNoGapsRow = result.gaps.length === 0 && result.q1Value > 0;

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <ScoreRing percent={ringPercent} display={ringDisplay} color={tier.color} />
      </div>

      <div className="mt-6 flex justify-center">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-grably-offwhite px-3 py-1 text-xs font-bold uppercase tracking-wide",
            tier.color.className
          )}
          style={tier.color.style}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          {tier.badge}
        </span>
      </div>

      <h2 className="mt-4 font-serif text-2xl font-bold text-grably-text">
        Hi {firstName} — {tier.headline}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-grably-textmid">
        {tier.sub}
      </p>

      <div className="mt-8 space-y-3 text-left">
        {showNoGapsRow ? (
          <div className="flex items-start gap-3 rounded-lg bg-grably-offwhite p-4">
            <Check
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-grably-accent"
            />
            <span className="text-sm text-grably-text">{NO_GAPS_MESSAGE}</span>
          </div>
        ) : (
          result.gaps.map((gap) => (
            <div
              key={gap}
              className="flex items-start gap-3 rounded-lg bg-grably-offwhite p-4"
            >
              <X
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-grably-warn"
              />
              <span className="text-sm text-grably-text">{gap}</span>
            </div>
          ))
        )}
      </div>

      {error && (
        <p className="mt-6 text-center text-sm font-medium text-grably-warn">
          {error}
        </p>
      )}

      <Link
        href="/#demo-form"
        className="mt-8 block w-full rounded bg-grably-dark px-6 py-4 text-center font-bold text-grably-accent transition-colors hover:bg-grably-mid"
      >
        {tier.cta}
      </Link>

      <p className="mt-6 text-center text-xs text-grably-textmid">
        grably.ca · hello@grably.ca · Every delivery. Audit-ready.
      </p>
    </div>
  );
}
