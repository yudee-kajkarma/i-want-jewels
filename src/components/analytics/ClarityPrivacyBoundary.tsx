"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Public pages follow dashboard masking; private pages keep a code safeguard. */
export default function ClarityPrivacyBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const sensitive =
    /\/(admin|profile|orders|payments|account|checkout|login|register|forgot-password|reset-password|verify-otp)(\/|$)/.test(
      pathname,
    );
  return (
    <div
      style={{ display: "contents" }}
      data-clarity-mask={sensitive ? "true" : undefined}
    >
      {children}
    </div>
  );
}
