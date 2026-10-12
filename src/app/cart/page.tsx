"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, formatPrice } from "@/context/CartContext";
import { RESTAURANT_DATA } from "@/data/restaurant";
import {
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowLeft,
  CheckCircle2,
  Bike,
  Store,
  Clock,
  ShieldCheck,
  CreditCard,
  Banknote,
} from "lucide-react";

export default function CartAndCheckoutPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    updateQuantity,
    removeItem,
    orderType,
    setOrderType,
    deliveryAddress,
    setDeliveryAddress,
    voucherCode,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    voucherError,
    subtotalCents,
    discountCents,
    deliveryFeeCents,
    totalCents,
    minOrderReached,
    minOrderDeficitCents,
    clearCart,
  } = useCart();

  // Form states
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [inputVoucher, setInputVoucher] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSummaryData, setOrderSummaryData] = useState<any>(null);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyVoucher(inputVoucher)) {
      setInputVoucher("");
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) {
      errors.name = "Please enter your full name";
    }
    if (!customerPhone.trim()) {
      errors.phone = "Please enter your phone number";
    } else if (!/^[0-9+\s()-]{7,20}$/.test(customerPhone.trim())) {
      errors.phone = "Please enter a valid phone number (e.g. +49 170 1234567)";
    }
    if (customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (orderType === "delivery" && !deliveryAddress.trim()) {
      errors.address = "Please enter your delivery address";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !minOrderReached) return;

    if (!validateForm()) {
      // Scroll to form if needed
      return;
    }

    // Completely client-side simulated order placement - zero external API / zero card storage
    const orderData = {
      orderId: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      items: [...items],
      orderType,
      deliveryAddress,
      customerName,
      customerPhone,
      customerEmail,
      paymentMethod,
      totalCents,
      eta: orderType === "delivery" ? RESTAURANT_DATA.eta : "15 minutes",
    };

    setOrderSummaryData(orderData);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced && orderSummaryData) {
    return (
      <div className="storefront min-h-[85vh] bg-[var(--sf-brand-tint)] px-4 py-12 lg:px-12">
        <div className="mx-auto max-w-xl rounded-[var(--sf-radius)] bg-white p-6 shadow-xl lg:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-[var(--sf-surface-fg)] lg:text-3xl">
            Order Confirmed!
          </h1>
          <p className="mt-1 text-sm text-[var(--sf-muted)]">
            Order #{orderSummaryData.orderId} · {orderSummaryData.date}
          </p>

          <div className="mt-6 rounded-[var(--sf-radius)] border border-gray-100 bg-gray-50/70 p-4 text-left text-xs sm:text-sm">
            <div className="flex justify-between py-1 border-b border-gray-200 pb-2">
              <span className="font-semibold text-gray-700">Estimated preparation:</span>
              <span className="font-bold text-[var(--sf-brand)]">{orderSummaryData.eta}</span>
            </div>
            <div className="flex justify-between py-1 pt-2">
              <span className="text-gray-600">Fulfillment type:</span>
              <span className="font-semibold capitalize">{orderSummaryData.orderType}</span>
            </div>
            {orderSummaryData.orderType === "delivery" && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Delivery address:</span>
                <span className="font-semibold text-right max-w-[200px] truncate">
                  {orderSummaryData.deliveryAddress}
                </span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Customer:</span>
              <span className="font-semibold">{orderSummaryData.customerName || "Guest"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Payment:</span>
              <span className="font-semibold uppercase">{orderSummaryData.paymentMethod} (Simulated)</span>
            </div>
            <div className="flex justify-between py-2 border-t border-gray-200 mt-2 font-bold text-base text-[var(--sf-surface-fg)]">
              <span>Paid Total:</span>
              <span>{formatPrice(orderSummaryData.totalCents)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/menu"
              className="flex h-12 w-full items-center justify-center rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] font-bold text-white shadow transition-transform hover:brightness-95 active:scale-98"
            >
              Order something else
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--sf-muted)] hover:text-black"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="storefront relative min-h-screen bg-[var(--sf-brand-tint)] px-4 py-6 lg:min-h-[700px] lg:px-12 lg:py-10 lg:pb-24">
      {/* Back link */}
      <Link
        href="/menu"
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-[var(--sf-muted)] transition-colors hover:text-[var(--sf-surface-fg)]"
      >
        <ArrowLeft className="size-3.5" />
        <span>keep browsing</span>
      </Link>

      <h1 className="m-0 mb-6 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] text-[var(--sf-surface-fg)] md:text-[48px] lg:mb-8 lg:text-[40px]">
        Your cart
      </h1>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-8">
        {/* Left Column: Cart Items & Details */}
        <div className="flex flex-col gap-4">
          {/* Cart list card */}
          <div className="rounded-[var(--sf-radius)] bg-[var(--sf-surface)] p-5 shadow-xs lg:p-7">
            <h2 className="mb-4 text-lg font-bold text-[var(--sf-surface-fg)]">
              Items in Order ({itemCount})
            </h2>

            {items.length === 0 ? (
              <div className="py-12 text-center text-[var(--sf-muted)]">
                Your cart is empty.
                <div className="mt-4">
                  <Link
                    href="/menu"
                    className="inline-flex h-10 items-center justify-center rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-5 text-xs font-bold text-white"
                  >
                    Browse menu
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-[var(--sf-border)]">
                {items.map((cartItem) => (
                  <div key={cartItem.cartItemId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <img
                      src={cartItem.item.imageUrl}
                      alt={cartItem.item.name}
                      className="size-16 rounded-[var(--sf-radius)] object-cover bg-[var(--sf-brand-tint)] sm:size-20"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold text-[var(--sf-surface-fg)] sm:text-base">
                            {cartItem.item.name}
                          </h3>
                          {cartItem.selectedModifiers.length > 0 && (
                            <p className="text-xs text-[var(--sf-muted)]">
                              {cartItem.selectedModifiers.map((m) => m.option.name).join(", ")}
                            </p>
                          )}
                          {cartItem.specialInstructions && (
                            <p className="text-[11px] text-amber-700 italic">
                              &quot;{cartItem.specialInstructions}&quot;
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-bold tabular-nums text-[var(--sf-surface-fg)] sm:text-base">
                          {formatPrice(cartItem.unitPriceCents * cartItem.quantity)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-[var(--sf-border)] bg-gray-50 px-2.5 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                            className="text-gray-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-4 text-center text-xs font-bold tabular-nums">
                            {cartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                            className="text-[var(--sf-brand)] hover:opacity-80"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(cartItem.cartItemId)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer & Delivery Form (when items present) */}
          {items.length > 0 && (
            <div className="rounded-[var(--sf-radius)] bg-[var(--sf-surface)] p-5 shadow-xs lg:p-7">
              <h2 className="mb-4 text-lg font-bold text-[var(--sf-surface-fg)]">
                Fulfillment & Contact Details
              </h2>

              {/* Delivery / Pickup options */}
              <div className="mb-6 flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[var(--sf-radius)] border p-3 text-xs font-semibold sm:text-sm ${
                    orderType === "delivery"
                      ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/60 text-[var(--sf-brand)]"
                      : "border-[var(--sf-border)] text-[var(--sf-muted)]"
                  }`}
                >
                  <Bike className="size-4" />
                  <span>Delivery ({RESTAURANT_DATA.eta})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("pickup")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-[var(--sf-radius)] border p-3 text-xs font-semibold sm:text-sm ${
                    orderType === "pickup"
                      ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/60 text-[var(--sf-brand)]"
                      : "border-[var(--sf-border)] text-[var(--sf-muted)]"
                  }`}
                >
                  <Store className="size-4" />
                  <span>Pickup (~15 min)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="customer-name" className="block text-xs font-semibold text-gray-700">Full Name *</label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    placeholder="e.g. Sarah Jenkins"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    className={`mt-1 w-full rounded-lg border p-2.5 text-xs outline-none transition-colors ${
                      formErrors.name
                        ? "border-red-500 bg-red-50/20 focus:border-red-600"
                        : "border-[var(--sf-border)] focus:border-[var(--sf-brand)]"
                    }`}
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-[11px] font-medium text-red-600">
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="customer-phone" className="block text-xs font-semibold text-gray-700">Phone Number *</label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="+49 170 1234567"
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? "phone-error" : undefined}
                    className={`mt-1 w-full rounded-lg border p-2.5 text-xs outline-none transition-colors ${
                      formErrors.phone
                        ? "border-red-500 bg-red-50/20 focus:border-red-600"
                        : "border-[var(--sf-border)] focus:border-[var(--sf-brand)]"
                    }`}
                  />
                  {formErrors.phone && (
                    <p id="phone-error" className="mt-1 text-[11px] font-medium text-red-600">
                      {formErrors.phone}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="customer-email" className="block text-xs font-semibold text-gray-700">Email Address (for confirmation)</label>
                  <input
                    id="customer-email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                      if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="sarah@example.com"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    className={`mt-1 w-full rounded-lg border p-2.5 text-xs outline-none transition-colors ${
                      formErrors.email
                        ? "border-red-500 bg-red-50/20 focus:border-red-600"
                        : "border-[var(--sf-border)] focus:border-[var(--sf-brand)]"
                    }`}
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-[11px] font-medium text-red-600">
                      {formErrors.email}
                    </p>
                  )}
                </div>
                {orderType === "delivery" && (
                  <div className="sm:col-span-2">
                    <label htmlFor="delivery-address" className="block text-xs font-semibold text-gray-700">Delivery Address *</label>
                    <input
                      id="delivery-address"
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => {
                        setDeliveryAddress(e.target.value);
                        if (formErrors.address) setFormErrors((prev) => ({ ...prev, address: "" }));
                      }}
                      placeholder="Street, house number, floor/door, postal code, city"
                      aria-invalid={!!formErrors.address}
                      aria-describedby={formErrors.address ? "address-error" : undefined}
                      className={`mt-1 w-full rounded-lg border p-2.5 text-xs outline-none transition-colors ${
                        formErrors.address
                          ? "border-red-500 bg-red-50/20 focus:border-red-600"
                          : "border-[var(--sf-border)] focus:border-[var(--sf-brand)]"
                      }`}
                    />
                    {formErrors.address && (
                      <p id="address-error" className="mt-1 text-[11px] font-medium text-red-600">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="customer-notes" className="block text-xs font-semibold text-gray-700">Delivery Instructions / Notes</label>
                  <input
                    id="customer-notes"
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="e.g. Ring bottom bell, leave at door"
                    className="mt-1 w-full rounded-lg border border-[var(--sf-border)] p-2.5 text-xs outline-none focus:border-[var(--sf-brand)]"
                  />
                </div>
              </div>

              {/* Payment selection */}
              <div className="mt-6 border-t border-[var(--sf-border)] pt-5">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-xs font-semibold ${
                      paymentMethod === "card"
                        ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/40 text-[var(--sf-brand)]"
                        : "border-[var(--sf-border)] text-gray-600"
                    }`}
                  >
                    <CreditCard className="size-4" />
                    <span>Card / Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-xs font-semibold ${
                      paymentMethod === "cash"
                        ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/40 text-[var(--sf-brand)]"
                        : "border-[var(--sf-border)] text-gray-600"
                    }`}
                  >
                    <Banknote className="size-4" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary & Voucher */}
        <div className="flex flex-col gap-4">
          <div className="sticky top-6 rounded-[var(--sf-radius)] bg-[var(--sf-surface)] p-5 shadow-xs lg:p-7">
            <h2 className="mb-4 text-lg font-bold tracking-[-0.015em] text-[var(--sf-surface-fg)]">
              Order summary
            </h2>

            {/* Voucher Box */}
            <div className="mb-4 rounded-[var(--sf-radius)] bg-[var(--sf-brand-tint)] px-3.5 py-3">
              <div className="mb-1.5 flex items-center justify-between text-[11.5px] font-semibold tracking-[0.04em] text-[var(--sf-on-tint)] uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="size-3.5" /> Voucher code
                </span>
                {appliedVoucher && (
                  <button
                    type="button"
                    onClick={removeVoucher}
                    className="text-[10px] text-red-600 underline"
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
                    placeholder="WELCOME10 / NEUKOELLN5"
                    value={inputVoucher}
                    onChange={(e) => setInputVoucher(e.target.value)}
                    className="h-[38px] min-w-0 flex-1 rounded-[var(--sf-radius)] border border-[var(--sf-border)] bg-[var(--sf-surface)] px-3 text-[13px] uppercase outline-none focus:border-[var(--sf-brand)]"
                  />
                  <button
                    type="submit"
                    className="h-[38px] shrink-0 rounded-[var(--sf-radius)] bg-[var(--sf-ink)] px-4 text-[12.5px] font-semibold text-[var(--sf-ink-fg)] transition-opacity hover:opacity-90"
                  >
                    Apply
                  </button>
                </form>
              )}
              {voucherError && <p className="mt-1 text-[11px] text-red-600">{voucherError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="text-[13px] text-[var(--sf-muted)] lg:text-sm">
              <div className="flex justify-between py-1.5">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotalCents)}</span>
              </div>
              {discountCents > 0 && (
                <div className="flex justify-between py-1.5 text-green-700 font-semibold">
                  <span>Discount</span>
                  <span className="tabular-nums">-{formatPrice(discountCents)}</span>
                </div>
              )}
              {orderType === "delivery" && (
                <div className="flex justify-between py-1.5">
                  <span>Delivery fee</span>
                  <span className="tabular-nums">{formatPrice(deliveryFeeCents)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-[var(--sf-border)] pt-3 text-base font-extrabold text-[var(--sf-surface-fg)] lg:text-lg">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(totalCents)}</span>
              </div>
            </div>

            {/* Minimum order or checkout button */}
            <div className="mt-6">
              {items.length === 0 ? (
                <button
                  type="button"
                  disabled
                  className="h-14 w-full rounded-[var(--sf-radius-control)] bg-[var(--sf-border)] text-[15px] font-semibold text-[var(--sf-muted)] cursor-not-allowed"
                >
                  Your cart is empty
                </button>
              ) : !minOrderReached ? (
                <button
                  type="button"
                  disabled
                  className="h-14 w-full rounded-[var(--sf-radius-control)] bg-[var(--sf-border)] text-xs font-semibold text-[var(--sf-muted)] cursor-not-allowed sm:text-sm"
                >
                  Minimum order €12.00 (need {formatPrice(minOrderDeficitCents)} more)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="h-14 w-full rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] text-[15px] font-bold text-white shadow-lg transition-transform hover:brightness-95 active:scale-98"
                >
                  Place order · {formatPrice(totalCents)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
