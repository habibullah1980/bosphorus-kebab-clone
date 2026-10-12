"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, formatPrice } from "@/context/CartContext";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Trash2, Plus, Minus, Tag, ArrowRight } from "lucide-react";

export function CartSidebar() {
  const {
    items,
    itemCount,
    updateQuantity,
    removeItem,
    orderType,
    subtotalCents,
    deliveryFeeCents,
    discountCents,
    totalCents,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    voucherError,
    minOrderReached,
    minOrderDeficitCents,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyVoucher(inputCode)) {
      setInputCode("");
    }
  };

  return (
    <div className="sticky top-0 flex max-h-[calc(100vh-80px)] flex-col self-start border-l border-[var(--sf-border)] bg-[var(--sf-surface)] p-6">
      <div className="mb-1 text-lg font-bold tracking-[-0.015em] text-[var(--sf-surface-fg)]">
        Your cart
      </div>
      <div className="mb-4 text-xs text-[var(--sf-muted)] capitalize">
        {itemCount} {itemCount === 1 ? "item" : "items"} · {orderType}
      </div>

      {/* Cart items list */}
      <div className="mb-4 flex-1 overflow-y-auto pr-1 no-scrollbar min-h-[140px] max-h-[360px]">
        {items.length === 0 ? (
          <div className="py-12 text-center text-[13px] text-[var(--sf-muted)]">
            Your cart is empty.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--sf-border)]">
            {items.map((cartItem) => (
              <div key={cartItem.cartItemId} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[var(--sf-surface-fg)] truncate">
                      {cartItem.item.name}
                    </h4>
                    {cartItem.selectedModifiers.length > 0 && (
                      <p className="mt-0.5 text-[11px] text-[var(--sf-muted)] leading-tight">
                        {cartItem.selectedModifiers.map((m) => m.option.name).join(", ")}
                      </p>
                    )}
                    {cartItem.specialInstructions && (
                      <p className="mt-0.5 text-[10px] text-amber-700 italic">
                        &quot;{cartItem.specialInstructions}&quot;
                      </p>
                    )}
                    <span className="mt-1 block text-xs font-bold text-[var(--sf-surface-fg)] tabular-nums">
                      {formatPrice(cartItem.unitPriceCents * cartItem.quantity)}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 rounded-full border border-[var(--sf-border)] bg-gray-50 px-2 py-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                      className="text-[var(--sf-muted)] hover:text-black transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="min-w-4 text-center text-xs font-bold tabular-nums">
                      {cartItem.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                      className="text-[var(--sf-brand)] hover:opacity-80 transition-opacity"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(cartItem.cartItemId)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Voucher Box */}
      <div className="mb-3 rounded-[var(--sf-radius)] bg-[var(--sf-brand-tint)] px-3.5 py-3">
        <div className="mb-1.5 flex items-center justify-between text-[11.5px] font-semibold tracking-[0.04em] text-[var(--sf-on-tint)] uppercase">
          <span className="inline-flex items-center gap-1.5">
            <Tag className="size-3" /> Voucher code
          </span>
          {appliedVoucher && (
            <button
              type="button"
              onClick={removeVoucher}
              className="text-[10px] text-red-600 underline hover:text-red-800"
            >
              Remove
            </button>
          )}
        </div>
        {appliedVoucher ? (
          <div className="rounded border border-green-200 bg-green-50 p-2 text-xs font-semibold text-green-800">
            ✓ {appliedVoucher.code} ({appliedVoucher.description})
          </div>
        ) : (
          <form onSubmit={handleApplyVoucher} className="flex gap-1.5">
            <input
              placeholder="e.g. WELCOME10"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="h-9 min-w-0 flex-1 rounded-[var(--sf-radius)] border border-[var(--sf-border)] bg-[var(--sf-surface)] px-2.5 text-[12.5px] uppercase outline-none focus:border-[var(--sf-brand)]"
            />
            <button
              type="submit"
              className="h-9 shrink-0 rounded-[var(--sf-radius)] bg-[var(--sf-ink)] px-3.5 text-xs font-semibold text-[var(--sf-ink-fg)] transition-opacity hover:opacity-90"
            >
              Apply
            </button>
          </form>
        )}
        {voucherError && <p className="mt-1 text-[11px] text-red-600">{voucherError}</p>}
      </div>

      {/* Subtotal & Totals */}
      <div className="border-t border-[var(--sf-border)] pt-3 text-[13px] text-[var(--sf-muted)]">
        <div className="flex justify-between py-0.5">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotalCents)}</span>
        </div>
        {discountCents > 0 && (
          <div className="flex justify-between py-0.5 text-green-700 font-medium">
            <span>Discount</span>
            <span className="tabular-nums">-{formatPrice(discountCents)}</span>
          </div>
        )}
        {orderType === "delivery" && (
          <div className="flex justify-between py-0.5">
            <span>Delivery</span>
            <span className="tabular-nums">{formatPrice(deliveryFeeCents)}</span>
          </div>
        )}
        <div className="flex justify-between py-2 pb-3 text-base font-bold text-[var(--sf-surface-fg)]">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(totalCents)}</span>
        </div>

        {/* Action Button */}
        {items.length === 0 ? (
          <button
            type="button"
            disabled
            className="h-[50px] w-full rounded-[var(--sf-radius-control)] text-sm font-semibold transition-opacity duration-150 cursor-not-allowed bg-[var(--sf-muted)]/40 text-white"
          >
            Your cart is empty
          </button>
        ) : !minOrderReached ? (
          <button
            type="button"
            disabled
            className="h-[50px] w-full rounded-[var(--sf-radius-control)] text-sm font-semibold transition-opacity duration-150 cursor-not-allowed bg-[var(--sf-muted)]/40 text-white"
          >
            Minimum order €12.00 (add {formatPrice(minOrderDeficitCents)})
          </button>
        ) : (
          <Link
            href="/cart"
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] text-sm font-bold text-white shadow-md transition-all hover:brightness-95 active:scale-98"
          >
            <span>Proceed to checkout</span>
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
