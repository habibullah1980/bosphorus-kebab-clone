"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RESTAURANT_DATA, MENU_CATEGORIES, REVIEWS, MenuItem } from "@/data/restaurant";
import { useCart, formatPrice } from "@/context/CartContext";
import { ProductCard } from "@/components/ProductCard";
import { ProductCustomizeModal } from "@/components/ProductCustomizeModal";
import { ArrowRight, Star, Clock, MapPin, Phone, ShieldCheck, Flame } from "lucide-react";

export default function HomePage() {
  const { addItem, totalCents, itemCount } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProduct = (item: MenuItem) => {
    // If item has modifiers, open customization modal; otherwise add directly
    if (item.modifierGroups && item.modifierGroups.length > 0) {
      setSelectedItem(item);
      setIsModalOpen(true);
    } else {
      addItem(item);
    }
  };

  // Find specialty items
  const specialtyItems = [
    MENU_CATEGORIES[1].items[0], // Adana wrap
    MENU_CATEGORIES[1].items[1], // Iskender plate
  ];

  // Bestseller items
  const bestsellerItems = [
    MENU_CATEGORIES[1].items[0], // Adana wrap
    MENU_CATEGORIES[1].items[1], // Iskender plate
    MENU_CATEGORIES[1].items[2], // Mixed grill plate
    MENU_CATEGORIES[3].items[1], // Künefe
  ];

  return (
    <div className="storefront flex flex-col">
      {/* 1. HERO SECTION */}
      <section
        aria-label="Bosphorus Kebab"
        className="relative flex h-[clamp(420px,50vh,480px)] w-full flex-col justify-end overflow-hidden bg-[var(--sf-ink)] lg:h-auto lg:min-h-[85vh] lg:justify-start"
      >
        <div className="absolute inset-0 z-0 lg:left-1/2 lg:w-1/2">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={RESTAURANT_DATA.heroPosterUrl}
            src={RESTAURANT_DATA.heroVideoUrl}
            className="size-full object-cover opacity-85 lg:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--sf-ink)] via-[var(--sf-ink)]/40 to-transparent lg:hidden" />
        </div>

        <div className="absolute inset-y-0 left-0 z-0 hidden w-1/2 bg-[var(--sf-ink)] lg:block" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] hidden w-[20%] bg-gradient-to-r from-[var(--sf-ink)] via-[var(--sf-ink)]/40 to-transparent lg:block" />

        <div className="relative z-10 flex w-full flex-col px-5 pb-8 lg:h-full lg:w-1/2 lg:justify-center lg:px-16 lg:py-20 xl:px-24">
          <div className="lg:max-w-xl">
            <div
              role="status"
              className="mb-4 inline-flex w-max items-center gap-1.5 rounded-[var(--sf-radius-control)] bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md lg:mb-8 lg:gap-2.5 lg:bg-white/10 lg:px-3.5 lg:text-xs lg:tracking-wider lg:uppercase"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full animate-pulse bg-[var(--sf-brand)]"
              />
              <span>Open · until 23:00</span>
            </div>

            <h1 className="m-0 text-[40px] leading-[1.02] font-extrabold tracking-[-0.04em] text-white sm:text-[50px] lg:text-6xl lg:leading-[1.05] lg:tracking-tight xl:text-7xl">
              Straight from the charcoal <br />
              <span className="font-normal italic text-[var(--sf-brand)] font-serif">
                grill.
              </span>
            </h1>

            <p className="mt-6 hidden text-lg leading-relaxed text-gray-300 lg:block">
              Adana, Iskender, Lahmacun, Künefe — as in Gaziantep. In Neukölln since 2019. Fresh
              ingredients, real fire, Turkish hospitality.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] text-white/80 lg:hidden">
              <span className="flex items-center gap-1 tabular-nums font-semibold">
                <span className="text-[var(--sf-star)]">★</span> 4.8
              </span>
              <span>·</span>
              <span className="tabular-nums">1,247 reviews</span>
            </div>

            <div className="mt-10 hidden flex-wrap gap-4 lg:flex">
              <Link
                href="/menu"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-8 text-base font-semibold text-white outline-none transition-all hover:scale-105 hover:brightness-95 hover:shadow-xl active:scale-95"
              >
                Order online
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/menu"
                className="inline-flex h-14 items-center justify-center rounded-[var(--sf-radius-control)] border border-white/20 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur-sm outline-none transition-all hover:bg-white/10 active:scale-95"
              >
                View the menu
              </Link>
            </div>

            <div className="mt-12 hidden grid-cols-2 gap-4 border-t border-white/10 pt-8 text-sm text-gray-400 lg:grid">
              <div>
                <p className="font-semibold text-white">Rating</p>
                <p className="tabular-nums">4.8 (1,247 reviews)</p>
              </div>
              <div>
                <p className="font-semibold text-white">Delivery</p>
                <p className="tabular-nums">25–35 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFO STRIP (Opening hours, address, phone, radius) */}
      <section
        aria-label="Address"
        className="grid grid-cols-2 border-b border-[var(--sf-border)] bg-[var(--sf-surface)] lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
      >
        <div className="border-[var(--sf-border)] border-r border-b px-5 py-5 transition-colors duration-200 hover:bg-[var(--sf-brand-tint)] lg:border-b-0 lg:px-8 lg:py-7">
          <div className="mb-1 text-[10px] font-semibold tracking-wider text-[var(--sf-muted)] uppercase lg:mb-2 lg:text-[11px]">
            Opening hours
          </div>
          <div className="text-xs font-medium tabular-nums lg:text-sm">
            {RESTAURANT_DATA.openingHours}
          </div>
        </div>

        <div className="border-[var(--sf-border)] border-b px-5 py-5 transition-colors duration-200 hover:bg-[var(--sf-brand-tint)] lg:border-r lg:border-b-0 lg:px-8 lg:py-7">
          <div className="mb-1 text-[10px] font-semibold tracking-wider text-[var(--sf-muted)] uppercase lg:mb-2 lg:text-[11px]">
            Address
          </div>
          <div className="text-xs font-medium tabular-nums lg:text-sm">
            {RESTAURANT_DATA.address}
          </div>
        </div>

        <div className="border-[var(--sf-border)] border-r px-5 py-5 transition-colors duration-200 hover:bg-[var(--sf-brand-tint)] lg:border-r lg:px-8 lg:py-7">
          <div className="mb-1 text-[10px] font-semibold tracking-wider text-[var(--sf-muted)] uppercase lg:mb-2 lg:text-[11px]">
            Phone
          </div>
          <div className="text-xs font-medium tabular-nums lg:text-sm">
            {RESTAURANT_DATA.phone}
          </div>
        </div>

        <div className="px-5 py-5 transition-colors duration-200 hover:bg-[var(--sf-brand-tint)] lg:px-8 lg:py-7">
          <div className="mb-1 text-[10px] font-semibold tracking-wider text-[var(--sf-muted)] uppercase lg:mb-2 lg:text-[11px]">
            Delivery radius
          </div>
          <div className="text-xs font-medium tabular-nums lg:text-sm">
            {RESTAURANT_DATA.deliveryRadius}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY TILES */}
      <section
        aria-labelledby="categories-heading"
        className="px-5 py-10 lg:px-16 lg:py-20 bg-[var(--sf-surface)]"
      >
        <h2
          id="categories-heading"
          className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] text-[var(--sf-surface-fg)] md:text-[56px] lg:text-[40px] mb-4 lg:mb-3"
        >
          <span className="lg:hidden">The menu</span>
          <span className="hidden lg:inline">
            Explore the{" "}
            <span className="font-normal italic text-[var(--sf-brand)] font-serif">menu</span>.
          </span>
        </h2>
        <p className="mb-10 hidden max-w-[600px] text-base text-[var(--sf-muted)] lg:block">
          From crispy lahmacun to sweet künefe — discover the variety of Turkish cuisine, freshly
          prepared for you.
        </p>

        <div className="flex gap-3 overflow-x-auto pr-5 pb-3 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pr-0 lg:pb-0">
          {MENU_CATEGORIES.map((category) => {
            const firstItemImg = category.items[0]?.imageUrl || RESTAURANT_DATA.logoUrl;
            return (
              <Link
                key={category.id}
                href={`/menu#cat-${category.id}`}
                className="group relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-[var(--sf-radius)] transition-all duration-300 ease-out active:scale-95 lg:h-60 lg:w-auto lg:shrink lg:shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:hover:-translate-y-1.5 lg:hover:shadow-[0_16px_32px_rgba(0,0,0,0.14)]"
              >
                <div className="absolute inset-0 bg-[var(--sf-brand-tint)]">
                  <img
                    src={firstItemImg}
                    alt={category.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--sf-ink)]/85 to-transparent to-60%" />
                  <div className="absolute right-3 bottom-3 left-3 text-left text-white lg:right-6 lg:bottom-6 lg:left-6">
                    <div className="text-sm leading-tight font-bold tracking-[-0.01em] lg:text-2xl lg:tracking-[-0.02em]">
                      {category.name}
                    </div>
                    <div className="hidden text-[13px] font-medium tabular-nums text-white/80 lg:block mt-1">
                      {category.items.length} dishes →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. OUR SPECIALITY (The heart of the kitchen) */}
      <section
        aria-labelledby="specialties-heading"
        className="px-5 py-10 lg:px-16 lg:py-20 bg-[var(--sf-brand-tint)] text-[var(--sf-surface-fg)]"
      >
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex-1">
            <div className="mb-3 text-[12.5px] font-semibold tracking-[0.08em] text-[var(--sf-brand)] uppercase lg:mb-4">
              Our speciality
            </div>
            <h2
              id="specialties-heading"
              className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] text-[var(--sf-surface-fg)] md:text-[56px] lg:text-[40px] mb-6"
            >
              The heart of the
              <br className="hidden lg:block" />{" "}
              <span className="font-normal italic text-[var(--sf-brand)] font-serif">kitchen</span>.
            </h2>
            <p className="mt-4 mb-8 hidden text-base leading-relaxed text-[var(--sf-muted)] lg:block">
              Every grill speciality is cooked fresh over an open charcoal fire — the aroma you know
              from a traditional Turkish ocakbaşı.
            </p>

            <div className="flex flex-col gap-4 lg:gap-5">
              {specialtyItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  variant="featured"
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          </div>

          <div className="relative hidden h-[clamp(400px,50vw,560px)] flex-1 overflow-hidden rounded-[var(--sf-radius)] shadow-[0_24px_48px_rgba(15,27,45,0.15)] lg:block">
            <img
              src="https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/chef.jpg"
              alt="Chef at charcoal grill"
              className="size-full object-cover"
            />
            <div className="absolute right-8 bottom-8 rounded-[var(--sf-radius)] bg-[var(--sf-surface)] px-6 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-105">
              <div className="text-sm font-bold flex items-center gap-1.5">
                <Flame className="size-4 text-[var(--sf-brand)]" />
                100% charcoal
              </div>
              <div className="mt-0.5 text-xs text-[var(--sf-muted)]">Lit fresh every day</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS */}
      <section
        aria-labelledby="bestsellers-heading"
        className="px-5 py-10 lg:px-16 lg:py-20 bg-[var(--sf-surface)]"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 lg:mb-12">
          <div>
            <div className="hidden lg:block">
              <div className="mb-3 text-[12.5px] font-semibold tracking-[0.08em] text-[var(--sf-brand)] uppercase">
                Our bestsellers
              </div>
            </div>
            <h2
              id="bestsellers-heading"
              className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] text-[var(--sf-surface-fg)] md:text-[56px] lg:text-[40px] max-w-[640px]"
            >
              <span className="lg:hidden">Popular</span>
              <span className="hidden lg:inline">
                The classics you&apos;ll{" "}
                <span className="font-normal italic text-[var(--sf-brand)] font-serif">love</span>.
              </span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden h-12 items-center rounded-[var(--sf-radius-control)] bg-[var(--sf-ink)] px-6 text-sm font-semibold text-[var(--sf-ink-fg)] transition-all hover:brightness-125 lg:inline-flex"
          >
            See the full menu →
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pr-5 pb-4 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pr-0 lg:pb-0">
          {bestsellerItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              variant="grid"
              onSelect={handleSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 6. OUR STORY */}
      <section
        aria-labelledby="story-heading"
        className="grid grid-cols-1 items-center gap-8 bg-[var(--sf-brand-tint)] px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24"
      >
        <div>
          <div className="mb-3 text-[12.5px] font-semibold tracking-[0.08em] text-[var(--sf-brand)] uppercase">
            Our story
          </div>
          <h2
            id="story-heading"
            className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] text-[var(--sf-surface-fg)] md:text-[56px] lg:text-[40px] mb-5"
          >
            From Gaziantep to{" "}
            <span className="font-normal italic text-[var(--sf-brand)] font-serif">Neukölln</span>.
          </h2>
          <p className="mb-4 text-[15px] leading-relaxed text-[var(--sf-muted)] lg:text-base">
            Mehmet Yılmaz opened Bosphorus Kebab with his brother in 2019. The recipes are the
            family&apos;s — Adana like his grandmother&apos;s, lahmacun from the wood oven, künefe
            in the Syrian-Turkish tradition.
          </p>
          <p className="mb-6 text-[15px] leading-relaxed text-[var(--sf-muted)] lg:text-base">
            We buy our lamb fresh each morning from the Turkish butcher round the corner. Our bread
            comes from our own stone oven. And the çay? From the samovar, always.
          </p>

          <div className="flex items-center gap-3.5">
            <div className="size-12 shrink-0 overflow-hidden rounded-full bg-[var(--sf-brand-muted)] lg:size-14 border border-[var(--sf-brand)]/20">
              <img
                src="https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/chef.jpg"
                alt="Mehmet Yılmaz"
                className="size-full object-cover"
              />
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-[-0.01em] lg:text-base">
                Mehmet Yılmaz
              </div>
              <div className="text-[11px] text-[var(--sf-muted)] lg:text-xs">
                Owner & head chef
              </div>
            </div>
          </div>
        </div>

        <div className="grid h-[300px] gap-3.5 lg:h-[480px] grid-cols-2">
          <div className="overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-brand-muted)] transition-transform duration-300 hover:scale-[1.02] shadow-sm">
            <img
              src="https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/interior.jpg"
              alt="Restaurant interior"
              className="size-full object-cover"
            />
          </div>
          <div className="mt-6 overflow-hidden rounded-[var(--sf-radius)] bg-[var(--sf-brand-muted)] transition-transform duration-300 hover:scale-[1.02] lg:mt-8 shadow-sm">
            <img
              src="https://pub-a67e46c5141e43e695aa5c32f986002d.r2.dev/platform/stock/menu/humus.jpg"
              alt="Fresh Hummus"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7. REVIEWS */}
      <section
        aria-labelledby="reviews-heading"
        className="px-5 py-12 lg:px-16 lg:py-24 bg-[var(--sf-ink)] text-[var(--sf-ink-fg)]"
      >
        <div className="mb-8 text-center lg:mb-14">
          <div className="mb-3 text-[12.5px] font-semibold tracking-[0.08em] text-[var(--sf-brand)] uppercase">
            What people say
          </div>
          <h2
            id="reviews-heading"
            className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.035em] md:text-[56px] lg:text-[40px]"
          >
            Guests on the food.
          </h2>
          <div className="mt-3 inline-flex items-center gap-2 text-[13px] opacity-80 lg:mt-4 lg:text-sm">
            <span aria-hidden="true" className="text-base text-[var(--sf-star)] lg:text-lg">
              ★★★★★
            </span>
            <span className="tabular-nums">4.8 / 5 · 1,247 Google reviews</span>
          </div>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar lg:mx-auto lg:grid lg:max-w-[1100px] lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {REVIEWS.map((rev, index) => (
            <article
              key={index}
              className="w-[280px] shrink-0 rounded-[var(--sf-radius)] border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 ease-out lg:w-auto lg:p-7 hover:-translate-y-1 hover:bg-white/10"
            >
              <div aria-label="5 / 5" className="mb-3 text-sm text-[var(--sf-star)]">
                ★★★★★
              </div>
              <blockquote className="m-0 mb-4 font-serif text-[16px] leading-relaxed italic text-white/95">
                „{rev.quote}“
              </blockquote>
              <div className="text-[15px] font-bold text-white">{rev.author}</div>
              <div className="mt-0.5 text-[11px] opacity-55">{rev.when}</div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. HUNGRY CTA */}
      <section className="bg-[var(--sf-surface)] px-5 py-16 text-center lg:px-16 lg:py-24">
        <h2 className="m-0 mb-4 text-[36px] leading-[1.02] font-extrabold tracking-[-0.04em] text-[var(--sf-surface-fg)] md:text-[76px] lg:text-[48px]">
          Hungry?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-normal text-[var(--sf-muted)] lg:text-lg">
          Order direct — no delivery-app commission, no middlemen. Delivery in 25–35 min.
        </p>
        <Link
          href="/menu"
          className="inline-flex h-14 items-center justify-center rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-8 text-base font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(0,0,0,0.22)] active:scale-95"
        >
          See the menu
        </Link>
      </section>

      {/* MOBILE STICKY FLOATING ORDER BAR */}
      <div
        role="region"
        aria-label="Order information"
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-[var(--sf-radius)] bg-[var(--sf-ink)] px-5 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.25)] lg:hidden"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="mb-0.5 text-[11px] font-medium text-white/70">Pickup & delivery</span>
          <span className="truncate text-sm font-bold text-white">Hermannstraße 142</span>
        </div>
        <Link
          href="/menu"
          className="ml-3 flex h-10 shrink-0 items-center rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-5 text-sm font-semibold text-white shadow transition-transform active:scale-95"
        >
          {itemCount > 0 ? `Cart (${itemCount}) →` : "Order →"}
        </Link>
      </div>

      {/* Product Customizer Modal */}
      <ProductCustomizeModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addItem}
      />
    </div>
  );
}
