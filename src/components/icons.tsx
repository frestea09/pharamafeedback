
import type { SVGProps } from "react";
// This file is intentionally left almost blank.
// The LayananReviewLogo was causing hydration errors and has been replaced with a lucide icon.
// This file is kept to prevent breaking imports, but the logo component is no longer used.
export function LayananReviewLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
    </svg>
  );
}
