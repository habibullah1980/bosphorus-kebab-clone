import React from "react";
import Link from "next/link";
import { RESTAURANT_DATA } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="bg-[var(--sf-ink)] pb-28 text-[var(--sf-ink-fg)] lg:pb-0 border-t border-white/5">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:px-12 lg:py-16">
        <div>
          <div className="text-2xl font-extrabold tracking-[-0.02em] lg:text-[26px]">
            {RESTAURANT_DATA.name}
          </div>
          <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-[var(--sf-ink-fg)]/65">
            Order directly from us — no middlemen, no markup.
          </p>
          <Link
            href="/menu"
            className="mt-5 inline-flex h-11 items-center rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-5 text-[13px] font-semibold text-[var(--sf-brand-fg)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            Order now
          </Link>
        </div>

        <div className="flex flex-col gap-2.5 text-[13px] text-[var(--sf-ink-fg)]/65">
          <div className="text-[11px] font-semibold tracking-[0.12em] text-[var(--sf-ink-fg)]/45 uppercase">
            Visit us
          </div>
          <div>{RESTAURANT_DATA.address}</div>
          <a
            href={`tel:${RESTAURANT_DATA.phone.replace(/\s+/g, "")}`}
            className="tabular-nums transition-colors hover:text-[var(--sf-ink-fg)]"
          >
            {RESTAURANT_DATA.phone}
          </a>
        </div>

        <div className="flex flex-col gap-2.5 text-[13px] text-[var(--sf-ink-fg)]/65">
          <div className="text-[11px] font-semibold tracking-[0.12em] text-[var(--sf-ink-fg)]/45 uppercase">
            Opening hours
          </div>
          <div className="tabular-nums">{RESTAURANT_DATA.openingHours}</div>
        </div>

        <div className="flex flex-col gap-2.5 text-[13px] text-[var(--sf-ink-fg)]/65">
          <div className="text-[11px] font-semibold tracking-[0.12em] text-[var(--sf-ink-fg)]/45 uppercase">
            Explore
          </div>
          <Link href="/" className="transition-colors hover:text-[var(--sf-ink-fg)]">
            Home
          </Link>
          <Link href="/menu" className="transition-colors hover:text-[var(--sf-ink-fg)]">
            Menu
          </Link>
          <Link href="/cart" className="transition-colors hover:text-[var(--sf-ink-fg)]">
            Cart & Checkout
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--sf-ink-fg)]/[0.08]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-6 text-[11px] text-[var(--sf-ink-fg)]/55 sm:flex-row sm:items-center sm:justify-between lg:px-12">
          <span>
            © 2026 {RESTAURANT_DATA.name}. All rights reserved.
          </span>
          <span>
            Powered by direckt<span className="text-[var(--sf-brand)]">.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
