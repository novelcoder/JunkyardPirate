"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_STORAGE_KEY = "jp-cookie-consent";

type Consent = "unknown" | "accepted" | "declined";

const listeners = new Set<() => void>();

function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {
    // localStorage unavailable (private mode, blocked storage) — treat as undecided.
  }
  return "unknown";
}

function getServerSnapshot(): Consent {
  return "unknown";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function setConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Best-effort persistence; the banner will just reappear next visit.
  }
  listeners.forEach((callback) => callback());
}

export default function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);

  return (
    <>
      {consent === "accepted" && GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {consent === "unknown" && (
        <div className="cookie-banner">
          <div className="cookie-banner-inner">
            <p>
              We use cookies to understand site traffic with Google Analytics. You can accept or
              decline &mdash; either way, your choice is saved on this device.
            </p>
            <div className="cookie-banner-actions">
              <button className="btn-cookie-decline" onClick={() => setConsent("declined")}>
                Decline
              </button>
              <button className="btn-cookie-accept" onClick={() => setConsent("accepted")}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
