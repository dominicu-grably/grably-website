import { NextResponse } from "next/server";
import { Resend } from "resend";

interface QuizRequestBody {
  firstName?: unknown;
  storeName?: unknown;
  email?: unknown;
  score?: unknown;
  scorePercent?: unknown;
  gaps?: unknown;
  answers?: unknown;
  submittedAt?: unknown;
  tier?: unknown;
}

interface QuizSubmission {
  firstName: string;
  storeName: string;
  email: string;
  score: number;
  scorePercent: number;
  gaps: string[];
  tier: string;
  submittedAt: string;
}

// Basic in-memory rate limit: 3 submissions per IP per hour.
// Note: per serverless instance only — acceptable for basic abuse prevention.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissionsByIp = new Map<string, number[]>();

const TO_ADDRESS = "hello@grably.ca";
const FROM_ADDRESS = process.env.DEMO_FROM ?? "Grably <onboarding@resend.dev>";

const TIER_LABELS: Record<string, string> = {
  "not-running": "Not yet running delivery",
  compliant: "Mostly compliant",
  partial: "Partial compliance",
  "high-risk": "High compliance risk",
};

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export async function POST(request: Request) {
  // Rate limiting
  const ip = getClientIp(request);
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let body: QuizRequestBody;
  try {
    body = (await request.json()) as QuizRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate required fields
  if (
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.storeName) ||
    !isNonEmptyString(body.email) ||
    !isValidEmail(body.email)
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const submission: QuizSubmission = {
    firstName: body.firstName.trim(),
    storeName: body.storeName.trim(),
    email: body.email.trim(),
    score: typeof body.score === "number" ? body.score : 0,
    scorePercent: typeof body.scorePercent === "number" ? body.scorePercent : 0,
    gaps: toStringArray(body.gaps),
    tier: isNonEmptyString(body.tier) ? body.tier.trim() : "",
    submittedAt: isNonEmptyString(body.submittedAt) ? body.submittedAt.trim() : "",
  };

  const tierLabel = TIER_LABELS[submission.tier] ?? submission.tier;
  const scoreLine =
    submission.tier === "not-running"
      ? "Score: N/A (not yet running delivery)"
      : `Score: ${submission.scorePercent}% (${submission.score}/12)${
          tierLabel ? ` — ${tierLabel}` : ""
        }`;

  const subject = `New compliance quiz lead — ${submission.storeName}`;
  const infoLines = [
    `First Name: ${submission.firstName}`,
    `Store Name: ${submission.storeName}`,
    `Email: ${submission.email}`,
    scoreLine,
    `Submitted: ${submission.submittedAt || "—"}`,
  ];
  const gapsText = submission.gaps.length
    ? submission.gaps.map((gap) => `- ${gap}`).join("\n")
    : "No gaps recorded.";
  const text = `${infoLines.join("\n")}\n\nCompliance gaps:\n${gapsText}`;
  const html = `<h2>New compliance quiz lead</h2><ul>${infoLines
    .map((line) => `<li>${line}</li>`)
    .join("")}</ul><h3>Compliance gaps</h3>${
    submission.gaps.length
      ? `<ul>${submission.gaps.map((gap) => `<li>${gap}</li>`).join("")}</ul>`
      : "<p>No gaps recorded.</p>"
  }`;

  const apiKey = process.env.RESEND_API_KEY;

  // Local-dev fallback: no Resend key → log and succeed.
  if (!apiKey) {
    console.info("[compliance-check] RESEND_API_KEY not set — logging submission:", text);
    recent.push(now);
    submissionsByIp.set(ip, recent);
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: submission.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[compliance-check] Resend error:", error);
      return NextResponse.json(
        { error: "Email delivery failed." },
        { status: 502 }
      );
    }

    recent.push(now);
    submissionsByIp.set(ip, recent);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[compliance-check] Unexpected error:", err);
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 }
    );
  }
}
