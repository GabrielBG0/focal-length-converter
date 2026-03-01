"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function InfoTooltip({ children }: Props) {
  return (
    <div className="relative group inline-block">
      {/* Trigger */}
      <div
        tabIndex={0}
        className="ml-2 inline-flex h-4 w-4 items-center justify-center
                   rounded-full border border-neutral-600
                   text-[10px] text-neutral-400
                   cursor-help
                   hover:border-neutral-400 hover:text-neutral-200
                   transition"
      >
        ?
      </div>

      {/* Tooltip */}
      <div
        className="absolute left-1/2 top-6 z-50 w-64 -translate-x-1/2
                   rounded-lg border border-neutral-800
                   bg-neutral-900 px-3 py-2
                   text-xs text-neutral-300
                   opacity-0 scale-95
                   transition-all duration-150
                   group-hover:opacity-100 group-hover:scale-100
                   group-focus-within:opacity-100 group-focus-within:scale-100
                   pointer-events-none"
      >
        {children}
      </div>
    </div>
  );
}
