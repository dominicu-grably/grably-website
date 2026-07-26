import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Grably",
  description:
    "How Grably Technologies Inc. collects, uses, and protects your information.",
  alternates: { canonical: "https://grably.ca/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-grably-offwhite">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h1 className="font-serif text-4xl font-bold text-grably-text">
            Privacy Policy
          </h1>
          <div className="prose prose-lg mt-10 max-w-none">
            <p>Last updated: July 2026</p>

            <p>
              Grably Technologies Inc. (&ldquo;Grably,&rdquo; &ldquo;we,&rdquo;{" "}
              &ldquo;us&rdquo;) operates the Grably dispatch platform, including
              the Grably Driver mobile application and the Grably retailer
              dashboard (together, the &ldquo;Services&rdquo;). This policy
              explains what information we collect, how we use it, and your
              rights regarding that information.
            </p>

            <h2>Who this applies to</h2>
            <p>This policy covers:</p>
            <ul>
              <li>
                Delivery drivers using the Grably Driver app, employed by or
                contracted with licensed cannabis retailers
              </li>
              <li>
                Staff and owners of retailer organizations using the Grably
                dashboard
              </li>
              <li>
                End customers of retailers who receive SMS notifications related
                to their delivery
              </li>
            </ul>

            <h2>Information we collect</h2>

            <h3>From drivers (via the Grably Driver app)</h3>
            <ul>
              <li>
                <strong>Account information:</strong> name, email address, phone
                number
              </li>
              <li>
                <strong>Location data:</strong> precise GPS location, collected
                while you are actively on a delivery run, used to support
                dispatch and delivery tracking. Location is only captured while
                the app is in active use.
              </li>
              <li>
                <strong>Delivery records:</strong> proof-of-delivery
                photographs, customer signatures, delivery outcome and
                timestamps
              </li>
              <li>
                <strong>Device information:</strong> a push notification token,
                used to notify you of assigned deliveries
              </li>
            </ul>

            <h3>From retailer staff (via the dashboard)</h3>
            <ul>
              <li>
                Name, email address, and role, used to manage your account and
                organization
              </li>
            </ul>

            <h3>From customers (via SMS)</h3>
            <ul>
              <li>
                Phone number and delivery address, used solely to send delivery
                status notifications (e.g. &ldquo;your driver is on the
                way&rdquo;). Customers may reply STOP to opt out at any time.
              </li>
            </ul>

            <h2>How we use this information</h2>
            <p>We use collected information only to operate the Services:</p>
            <ul>
              <li>Dispatching and tracking deliveries</li>
              <li>Verifying driver identity and delivery completion</li>
              <li>
                Generating compliance records required under provincial cannabis
                regulations (e.g. BC&rsquo;s Cannabis Licensing Regulation)
              </li>
              <li>Sending operational SMS notifications to customers</li>
            </ul>
            <p>
              We do not sell personal information. We do not use your information
              for advertising or share it with data brokers or advertising
              networks.
            </p>

            <h2>Third parties</h2>
            <p>
              We share information only with service providers who help us
              operate the Services, including:
            </p>
            <ul>
              <li>
                Supabase (database and backend infrastructure, hosted in Canada)
              </li>
              <li>Telnyx (SMS delivery)</li>
              <li>Expo (push notification delivery)</li>
              <li>
                Google (mapping and directions, used server-side to calculate
                routes and ETAs)
              </li>
            </ul>
            <p>
              These providers process data on our behalf and are not permitted
              to use it for their own purposes.
            </p>

            <h2>Data retention</h2>
            <p>
              We retain delivery records, including compliance-related
              documentation (driver identity, age verification, proof of
              delivery), for six years, plus six months following any licence
              cancellation or transfer, in accordance with BC LCRB requirements.
            </p>

            <h2>Your rights</h2>
            <p>
              Under Canadian privacy law (PIPEDA and, where applicable, BC&rsquo;s
              Personal Information Protection Act), you may request access to,
              correction of, or deletion of your personal information, subject to
              our regulatory retention obligations. Contact us at the details
              below to make a request.
            </p>

            <h2 id="delete-account">Request account deletion</h2>
            <p>
              If you are a driver or retailer staff member with a Grably account
              and wish to have your account and associated data deleted, contact
              us at{" "}
              <a href="mailto:privacy@grably.ca">privacy@grably.ca</a> with the
              subject line &ldquo;Account Deletion Request&rdquo; and include your
              registered name and email address.
            </p>
            <p>We will process deletion requests within 30 days.</p>
            <p>
              <strong>What is deleted:</strong> your account credentials, name,
              email, phone number, and any device or push notification
              identifiers associated with your account.
            </p>
            <p>
              <strong>What is retained:</strong> delivery records associated with
              your account, including proof-of-delivery photographs, signatures,
              and delivery outcome history, are retained for six years (plus six
              months following any licence cancellation or transfer) as required
              under BC&rsquo;s Cannabis Licensing Regulation and LCRB
              record-keeping rules. This retention applies even after account
              deletion, as these records are regulatory compliance documentation,
              not account-management data.
            </p>
            <p>
              If you have questions about what data falls into which category,
              contact us at the email above.
            </p>

            <h2>Children&rsquo;s privacy</h2>
            <p>
              The Services are not directed at or intended for use by anyone
              under the legal age for cannabis-related activity in their
              jurisdiction. We do not knowingly collect information from minors.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will
              be reflected by an updated &ldquo;Last updated&rdquo; date above.
            </p>

            <h2>Contact us</h2>
            <p>
              Grably Technologies Inc.
              <br />
              Email: privacy@grably.ca
              <br />
              Phone: 778-900-8886
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
