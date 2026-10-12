"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, formatPrice } from "@/context/CartContext";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { ShoppingBag, Globe } from "lucide-react";

export function Header() {
  const { totalCents, itemCount } = useCart();
  const [lang, setLang] = useState<"EN" | "DE">("EN");

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[var(--sf-border)] bg-[var(--sf-surface)] px-4 lg:h-[78px] lg:px-12">
      {/* Brand logo & title */}
      <Link
        href="/"
        className="flex items-center gap-2.5 lg:gap-3.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 rounded-[var(--sf-radius)]"
      >
        <img
          src={RESTAURANT_DATA.logoUrl}
          alt={RESTAURANT_DATA.name}
          className="size-9 rounded-[var(--sf-radius)] border border-[var(--sf-border)] object-contain lg:size-11"
        />
        <span className="block">
          <span className="block text-lg leading-none font-extrabold tracking-[-0.02em] lg:text-xl">
            {RESTAURANT_DATA.name}
          </span>
          <span className="mt-1 hidden text-[11px] text-[var(--sf-muted)] lg:block">
            {RESTAURANT_DATA.subtitle}
          </span>
        </span>
      </Link>

      {/* Main Nav Links */}
      <nav className="hidden gap-7 text-sm lg:flex">
        <Link
          href="/"
          className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 rounded font-semibold text-[var(--sf-surface-fg)] hover:text-[var(--sf-brand)] transition-colors"
        >
          Home
        </Link>
        <Link
          href="/menu"
          className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 rounded font-medium text-[var(--sf-muted)] hover:text-[var(--sf-surface-fg)] transition-colors"
        >
          Menu
        </Link>
      </nav>

      {/* Cart & Locale Button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setLang(lang === "EN" ? "DE" : "EN")}
          className="hidden text-[13px] font-medium text-[var(--sf-muted)] transition-colors hover:text-[var(--sf-surface-fg)] lg:inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 rounded px-2 py-1"
        >
          <Globe className="size-3.5" />
          <span>{lang}</span>
        </button>

        <Link
          href="/cart"
          className="inline-flex h-9 items-center gap-1.5 rounded-[var(--sf-radius-control)] bg-[var(--sf-ink)] px-3 text-xs font-semibold text-[var(--sf-ink-fg)] transition-all hover:opacity-90 active:scale-95 lg:h-[42px] lg:gap-2 lg:px-[18px] lg:text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 shadow-sm"
        >
          <span aria-hidden="true">🛒</span>
          <span className="tabular-nums font-bold">
            {formatPrice(totalCents)}
          </span>
          {itemCount > 0 && (
            <span className="ml-0.5 flex size-4.5 items-center justify-center rounded-full bg-[var(--sf-brand)] text-[10px] text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
