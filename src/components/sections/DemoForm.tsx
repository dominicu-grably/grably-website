"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DemoFormState {
  firstName: string;
  storeName: string;
  city: string;
  email: string;
  phone: string;
}

const EMPTY_FORM: DemoFormState = {
  firstName: "",
  storeName: "",
  city: "",
  email: "",
  phone: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const ERROR_MESSAGE =
  "Something went wrong — please email hello@grably.ca directly.";

export function DemoForm() {
  const [form, setForm] = useState<DemoFormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState("");

  const handleChange =
    (field: keyof DemoFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setSubmittedName(form.firstName.trim());
      setForm(EMPTY_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="demo-form" className="bg-grably-accent">
      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-grably-dark sm:text-4xl">
            Ready to Run Compliant Delivery?
          </h2>
          <p className="mt-4 text-lg text-grably-dark/70">
            We onboard you personally. You&apos;ll be live within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div className="mt-10 rounded-lg bg-white p-8 text-center">
            <p className="text-lg font-semibold text-grably-text">
              Thanks {submittedName} — we&apos;ll be in touch within one business
              day to book your demo.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-grably-dark">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-grably-dark">
                  Store Name
                </Label>
                <Input
                  id="storeName"
                  name="storeName"
                  required
                  autoComplete="organization"
                  value={form.storeName}
                  onChange={handleChange("storeName")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-grably-dark">
                City
              </Label>
              <Input
                id="city"
                name="city"
                required
                autoComplete="address-level2"
                value={form.city}
                onChange={handleChange("city")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-grably-dark">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-grably-dark">
                Phone <span className="font-normal text-grably-dark/70">(optional)</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange("phone")}
              />
            </div>

            {status === "error" ? (
              <p className="text-center text-sm font-medium text-grably-warn">
                {ERROR_MESSAGE}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded bg-grably-dark py-3 font-bold text-white transition-colors hover:bg-grably-mid disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "submitting" ? "Sending…" : "Book My Demo"}
            </button>

            <p className="text-center text-sm text-grably-dark/60">
              We respond within one business day. No sales pressure.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
