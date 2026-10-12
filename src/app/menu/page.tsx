"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MENU_CATEGORIES, MenuItem, RESTAURANT_DATA } from "@/data/restaurant";
import { useCart, formatPrice } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductCustomizeModal } from "@/components/ProductCustomizeModal";
import { CartSidebar } from "@/components/CartSidebar";
import { ArrowLeft, Bike, ShoppingBag, MapPin } from "lucide-react";

export default function MenuPage() {
  const {
    orderType,
    setOrderType,
    deliveryAddress,
    setDeliveryAddress,
    addItem,
    itemCount,
    totalCents,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>(MENU_CATEGORIES[0].id);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(deliveryAddress);

  const handleSelectProduct = (item: MenuItem) => {
    if (item.modifierGroups && item.modifierGroups.length > 0) {
      setSelectedProduct(item);
      setIsModalOpen(true);
    } else {
      addItem(item);
    }
  };

  const handleScrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim()) {
      setDeliveryAddress(tempAddress.trim());
      setIsEditingAddress(false);
    }
  };

  return (
    <div className="storefront min-h-screen bg-[var(--sf-surface)]">
      {/* 1. TOP COVER BANNER (Desktop) */}
      <div className="relative hidden h-[160px] overflow-hidden bg-[var(--sf-ink)] lg:block lg:h-[200px]">
        <img
          src="https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/interior.jpg"
          alt="Bosphorus Interior"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--sf-ink)]/30 to-[var(--sf-ink)]/75" />
        <div className="absolute bottom-5 left-5 text-white lg:bottom-6 lg:left-12">
          <h1 className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] lg:text-[40px]">
            Menu
          </h1>
          <div className="mt-1 text-[12px] text-white/85 lg:text-[13px]">
            Delivery 25–35 min · minimum order €12.00
          </div>
        </div>
      </div>

      {/* Mobile Header bar with back arrow */}
      <div className="border-b border-[var(--sf-border)] bg-[var(--sf-surface)] px-[18px] pt-4 pb-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            aria-label="Back to home"
            className="grid size-8 place-items-center rounded-full bg-[var(--sf-brand-tint)] text-base font-bold text-[var(--sf-surface-fg)]"
          >
            ‹
          </Link>
          <div className="text-lg font-bold tracking-[-0.015em] text-[var(--sf-surface-fg)]">
            Menu
          </div>
        </div>

        {/* Mobile toggle delivery / pickup */}
        <div className="mt-2.5 flex gap-1 rounded-[var(--sf-radius-control)] bg-[var(--sf-brand-tint)] p-0.5">
          <button
            type="button"
            onClick={() => setOrderType("delivery")}
            className={`flex-1 rounded-[var(--sf-radius-control)] py-[7px] text-[11.5px] font-semibold transition-colors ${
              orderType === "delivery"
                ? "bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
                : "bg-transparent text-[var(--sf-muted)]"
            }`}
          >
            Delivery · 25–35 min
          </button>
          <button
            type="button"
            onClick={() => setOrderType("pickup")}
            className={`flex-1 rounded-[var(--sf-radius-control)] py-[7px] text-[11.5px] font-semibold transition-colors ${
              orderType === "pickup"
                ? "bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
                : "bg-transparent text-[var(--sf-muted)]"
            }`}
          >
            Pickup · 15 min
          </button>
        </div>
      </div>

      {/* 2. ORDER TYPE & ADDRESS BAR (Desktop) */}
      <div className="hidden flex-col gap-4 border-b border-[var(--sf-border)] bg-[var(--sf-surface)] px-5 py-4 lg:flex lg:flex-row lg:items-center lg:gap-5 lg:px-12">
        <div className="flex rounded-[var(--sf-radius-control)] bg-[var(--sf-brand-tint)] p-1">
          <button
            type="button"
            onClick={() => setOrderType("delivery")}
            className={`rounded-[var(--sf-radius-control)] px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
              orderType === "delivery"
                ? "bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
                : "bg-transparent text-[var(--sf-muted)]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <span>🛵</span> Delivery
            </span>
          </button>
          <button
            type="button"
            onClick={() => setOrderType("pickup")}
            className={`rounded-[var(--sf-radius-control)] px-5 py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
              orderType === "pickup"
                ? "bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
                : "bg-transparent text-[var(--sf-muted)]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <span>🥡</span> Pickup
            </span>
          </button>
        </div>

        {/* Address selector / editor */}
        <div className="flex flex-1 items-center gap-2 text-[13px]">
          <span aria-hidden="true" className="shrink-0">
            📍
          </span>
          {isEditingAddress ? (
            <form onSubmit={handleSaveAddress} className="flex items-center gap-2">
              <input
                type="text"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="h-8 rounded border border-gray-300 px-2 text-xs outline-none focus:border-[var(--sf-brand)]"
              />
              <button
                type="submit"
                className="rounded bg-[var(--sf-ink)] px-2.5 py-1 text-xs font-semibold text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="text-xs text-[var(--sf-muted)]"
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <span className="truncate text-[var(--sf-surface-fg)]">
                {orderType === "delivery" ? deliveryAddress : "Pickup: Hermannstraße 142"}
              </span>
              {orderType === "delivery" && (
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(true)}
                  className="ml-1.5 font-semibold text-[var(--sf-brand)] transition-opacity hover:opacity-70"
                >
                  Change
                </button>
              )}
            </>
          )}
        </div>

        <div className="ml-auto hidden items-center gap-1.5 text-[12.5px] text-[var(--sf-muted)] lg:inline-flex">
          <span className="size-1.5 rounded-full bg-[var(--sf-brand)]" />
          {orderType === "delivery" ? "Delivery €2.90 · minimum order €12.00" : "Ready in ~15 mins"}
        </div>
      </div>

      {/* 3. MOBILE CATEGORY TAB BAR (STICKY) */}
      <div className="sticky top-16 z-20 flex shrink-0 gap-1.5 overflow-x-auto border-b border-[var(--sf-border)] bg-[var(--sf-surface)] px-3 py-2 no-scrollbar lg:hidden">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleScrollToCategory(cat.id)}
            className={`rounded-[var(--sf-radius-control)] px-3 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? "bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
                : "bg-[var(--sf-brand-tint)] text-[var(--sf-muted)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 4. MAIN 3-COLUMN LAYOUT (Nav | Dishes | Cart) */}
      <div className="flex min-h-[800px] flex-col lg:grid lg:grid-cols-[220px_1fr_380px]">
        {/* Left Side Category Navigation */}
        <nav className="sticky top-20 hidden self-start border-r border-[var(--sf-border)] py-8 lg:block">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleScrollToCategory(cat.id)}
                className={`w-full border-l-[3px] px-6 py-3.5 text-left text-sm transition-all duration-150 ${
                  isActive
                    ? "border-l-[var(--sf-brand)] bg-[var(--sf-brand-tint)] font-semibold text-[var(--sf-surface-fg)]"
                    : "border-l-transparent bg-transparent font-medium text-[var(--sf-muted)] hover:text-[var(--sf-surface-fg)]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </nav>

        {/* Center: Dishes by Category */}
        <div className="flex-1 bg-[var(--sf-surface-fg)]/[0.03] px-0 py-0 lg:bg-transparent lg:p-8 lg:pb-24">
          {MENU_CATEGORIES.map((category) => (
            <div
              key={category.id}
              id={`cat-${category.id}`}
              className="mb-6 scroll-mt-28 lg:mb-12 lg:scroll-mt-24"
            >
              <h2 className="m-0 px-[18px] pt-[18px] pb-2 text-[22px] leading-[1.05] font-bold tracking-[-0.015em] lg:mb-[18px] lg:px-0 lg:pt-0 lg:text-[30px] lg:font-extrabold lg:tracking-[-0.03em] text-[var(--sf-surface-fg)]">
                {category.name}
              </h2>

              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4">
                {category.items.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    variant="list"
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="h-24 lg:hidden" />
        </div>

        {/* Right Column: Sticky Cart Sidebar on Desktop */}
        <div className="hidden lg:block">
          <CartSidebar />
        </div>
      </div>

      {/* Floating Mobile Cart summary footer */}
      {itemCount > 0 && (
        <div className="fixed inset-x-3.5 bottom-3.5 z-40 lg:hidden">
          <Link
            href="/cart"
            className="flex h-[52px] w-full items-center justify-between rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-6 text-[14px] font-bold text-white shadow-xl transition-all active:scale-98"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-xs">
                {itemCount}
              </span>
              <span>View Cart</span>
            </div>
            <span className="tabular-nums">{formatPrice(totalCents)}</span>
          </Link>
        </div>
      )}

      {/* Customization modal */}
      <ProductCustomizeModal
        item={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addItem}
      />
    </div>
  );
}
