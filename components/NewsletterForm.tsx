"use client";

import { useState, type FormEvent } from "react";

const APPWRITE_ENDPOINT = "https://sfo.cloud.appwrite.io/v1";
const APPWRITE_PROJECT_ID = "6a0b4638002a71c2b8ec";

async function subscribeEmail(email: string): Promise<void> {
  const res = await fetch(`${APPWRITE_ENDPOINT}/functions/subscribe/executions`, {
    method: "POST",
    headers: {
      "X-Appwrite-Project": APPWRITE_PROJECT_ID,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: JSON.stringify({ email }),
      method: "POST",
      headers: { "content-type": "application/json" },
    }),
  });
  if (!res.ok) throw new Error(`Execution request failed (${res.status})`);
  const execution = await res.json();
  const result = execution.responseBody ? JSON.parse(execution.responseBody) : null;
  if (!result || !result.ok) throw new Error("Subscription failed");
}

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("email") as HTMLInputElement;
    setStatus("submitting");
    try {
      await subscribeEmail(input.value);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <>
      <form id="newsletter-form" className="newsletter-form" onSubmit={handleSubmit}>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Email address"
          required
          disabled={status === "submitting"}
        />
        <button type="submit" disabled={status === "submitting"}>
          Subscribe
        </button>
      </form>
      {status === "success" && <p className="newsletter-thanks">Thanks for signing up!</p>}
      {status === "error" && <p className="newsletter-error">Something went wrong. Please try again.</p>}
    </>
  );
}
