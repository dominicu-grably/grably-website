import { NextResponse } from "next/server";
import { Resend } from "resend";

interface DemoRequestBody {
  firstName?: unknown;
  storeName?: unknown;
  city?: unknown;
  email?: unknown;
  phone?: unknown;
}

interface DemoSubmission {
  firstName: string;
  storeName: string;
  city: string;
  email: string;
  phone: string;
}

// Basic in-memory rate limit: 1 submission per IP per 10 minutes.
// Note: per serverless instance only — acceptable for basic abuse prevention.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const lastSubmissionByIp = new Map<string, number>();

const TO_ADDRESS = "hello@grably.ca";
const FROM_ADDRESS = process.env.DEMO_FROM ?? "Grably <onboarding@resend.dev>";

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

export async function POST(request: Request) {
  // Rate limiting
  const ip = getClientIp(request);
  const now = Date.now();
  const last = lastSubmissionByIp.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse body
  let body: DemoRequestBody;
  try {
    body = (await request.json()) as DemoRequestBody;
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
    !isNonEmptyString(body.city) ||
    !isNonEmptyString(body.email)
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const submission: DemoSubmission = {
    firstName: body.firstName.trim(),
    storeName: body.storeName.trim(),
    city: body.city.trim(),
    email: body.email.trim(),
    phone: isNonEmptyString(body.phone) ? body.phone.trim() : "",
  };

  const subject = `New demo request — ${submission.storeName} (${submission.city})`;
  const lines = [
    `First Name: ${submission.firstName}`,
    `Store Name: ${submission.storeName}`,
    `City: ${submission.city}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "—"}`,
  ];
  const text = lines.join("\n");
  const html = `<h2>New demo request</h2><ul>${lines
    .map((line) => `<li>${line}</li>`)
    .join("")}</ul>`;

  const apiKey = process.env.RESEND_API_KEY;

  // Local-dev fallback: no Resend key → log and succeed.
  if (!apiKey) {
    console.info("[demo] RESEND_API_KEY not set — logging submission:", text);
    lastSubmissionByIp.set(ip, now);
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
      console.error("[demo] Resend error:", error);
      return NextResponse.json(
        { error: "Email delivery failed." },
        { status: 502 }
      );
    }

    lastSubmissionByIp.set(ip, now);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[demo] Unexpected error:", err);
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 }
    );
  }
}
