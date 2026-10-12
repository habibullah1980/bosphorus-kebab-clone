"use client";

import React, { useState } from "react";
import { MenuItem } from "@/data/restaurant";
import { formatPrice } from "@/context/CartContext";

interface ProductCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  variant?: "grid" | "featured" | "list";
}

export function ProductCard({ item, onSelect, variant = "list" }: ProductCardProps) {
  if (variant === "featured") {
    return (
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="flex w-full cursor-pointer items-center gap-4 rounded-[var(--sf-radius)] bg-[var(--sf-surface)] p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 active:scale-[0.98] lg:gap-5 lg:hover:translate-x-1 lg:hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
      >
        <div className="size-[72px] shrink-0 overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-brand-tint)] lg:size-20">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="size-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-[19px] font-bold tracking-[-0.01em] lg:text-[22px]">
            {item.name}
          </div>
          <div className="mt-1 line-clamp-2 text-xs leading-snug text-[var(--sf-muted)] lg:text-[13px]">
            {item.description}
          </div>
        </div>
        <div className="flex min-w-[48px] flex-col items-end justify-center pl-2 lg:min-w-0 lg:pr-2">
          <div className="text-[15px] font-bold tabular-nums lg:text-lg">
            {formatPrice(item.priceCents)}
          </div>
          <span className="mt-1 hidden text-[13px] font-semibold text-[var(--sf-brand)] lg:inline-block">
            + Add
          </span>
          <span
            aria-hidden="true"
            className="mt-1 text-xl font-semibold text-[var(--sf-brand)] lg:hidden"
          >
            +
          </span>
        </div>
      </button>
    );
  }

  if (variant === "grid") {
    return (
      <article className="group w-40 shrink-0 bg-[var(--sf-surface)] [scroll-snap-align:start] lg:w-auto lg:shrink lg:overflow-hidden lg:rounded-[var(--sf-radius)] lg:border lg:border-[var(--sf-border)]">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="w-full cursor-pointer text-left outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-[var(--sf-brand)] focus-visible:ring-offset-2 active:scale-95 lg:group-hover:-translate-y-1.5 lg:group-hover:shadow-[0_20px_48px_rgba(0,0,0,0.1)] lg:group-active:scale-[0.96]"
        >
          <div className="mb-3 aspect-[4/3] w-40 overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-brand-tint)] lg:mb-0 lg:w-full lg:rounded-none">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="size-full object-cover transition-transform duration-500 lg:group-hover:scale-110"
            />
          </div>
          <div className="lg:p-5">
            <h3 className="m-0 text-[19px] font-bold tracking-[-0.01em] lg:text-[22px] lg:tracking-[-0.015em]">
              {item.name}
            </h3>
            <p className="m-0 mt-1.5 hidden h-10 overflow-hidden text-[13px] leading-relaxed text-[var(--sf-muted)] lg:block">
              {item.description}
            </p>
            <div className="mt-1 flex items-center justify-between lg:mt-4">
              <span className="text-sm font-medium tabular-nums text-[var(--sf-muted)] lg:text-[17px] lg:font-bold lg:text-[var(--sf-surface-fg)]">
                {formatPrice(item.priceCents)}
              </span>
              <span className="hidden rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)]/10 px-3 py-1.5 text-[13px] font-semibold text-[var(--sf-brand)] transition-colors duration-200 group-hover:bg-[var(--sf-brand)]/20 lg:inline-block">
                + Add
              </span>
            </div>
          </div>
        </button>
      </article>
    );
  }

  // Default menu row item (exact match for reference menu page item)
  return (
    <div
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(item);
      }}
      className="mx-3 mb-2 flex cursor-pointer items-start justify-between gap-3 rounded-[var(--sf-radius)] border border-transparent bg-[var(--sf-surface)] p-3.5 transition-all duration-300 ease-out lg:mx-0 lg:mb-0 lg:items-stretch lg:gap-3.5 lg:rounded-[var(--sf-radius)] lg:border-[var(--sf-border)] lg:p-4 lg:hover:border-[var(--sf-muted)]/30 lg:hover:shadow-[0_4px_16px_rgba(0,0,0,.06)]"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <span
            className={`mb-1 self-start rounded-[var(--sf-radius-control)] px-1.5 py-0.5 text-[9px] font-bold lg:mb-1.5 lg:px-2 lg:py-[3px] lg:text-[10px] ${
              item.dietaryTags.includes("Beliebt")
                ? "bg-[var(--sf-brand)] text-[var(--sf-brand-fg)]"
                : "bg-[var(--sf-brand-tint)] text-[var(--sf-surface-fg)]"
            }`}
          >
            {item.dietaryTags[0]}
          </span>
        )}
        <div className="text-[13.5px] font-semibold tracking-[-0.01em] lg:text-[19px] lg:font-bold">
          {item.name}
        </div>
        <div className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-[var(--sf-muted)] lg:mt-1 lg:text-[12.5px] lg:leading-relaxed">
          {item.description}
        </div>
        <div className="mt-1.5 text-[13px] font-bold tabular-nums lg:mt-auto lg:pt-2.5 lg:text-[15px]">
          {formatPrice(item.priceCents)}
        </div>
      </div>
      <div className="relative size-[70px] shrink-0 overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-brand-tint)] lg:size-[110px]">
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          aria-label="Add item"
          className="absolute -right-1.5 -bottom-1.5 grid size-[26px] place-items-center rounded-full bg-[var(--sf-surface)] text-[18px] font-bold text-[var(--sf-brand)] shadow-[0_2px_6px_rgba(0,0,0,.2)] transition-all duration-200 ease-out hover:scale-110 lg:-right-1 lg:-bottom-1 lg:size-8 lg:text-[22px] lg:shadow-[0_4px_12px_rgba(0,0,0,.18)]"
        >
          +
        </button>
      </div>
    </div>
  );
}
