"use client";

import React, { useState } from "react";
import { MenuItem, ModifierGroup, ModifierOption } from "@/data/restaurant";
import { formatPrice, SelectedModifier } from "@/context/CartContext";
import { X, Plus, Check } from "lucide-react";

interface ProductCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedModifiers: SelectedModifier[], instructions: string) => void;
}

export function ProductCustomizeModal({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: ProductCustomizeModalProps) {
  if (!isOpen || !item) return null;

  // Initialize defaults
  const [selectedSpice, setSelectedSpice] = useState<ModifierOption>(() => {
    const spiceGroup = item.modifierGroups?.find((g) => g.id === "spice");
    return spiceGroup?.options.find((o) => o.isDefault) || spiceGroup?.options[0] || {
      id: "medium",
      name: "Medium",
      priceDeltaCents: 0,
    };
  });

  const [selectedExtras, setSelectedExtras] = useState<ModifierOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>("");

  const spiceGroup = item.modifierGroups?.find((g) => g.id === "spice");
  const extrasGroup = item.modifierGroups?.find((g) => g.id === "extras");

  const toggleExtra = (option: ModifierOption) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((o) => o.id === option.id);
      if (exists) {
        return prev.filter((o) => o.id !== option.id);
      } else {
        if (extrasGroup?.maxSelect && prev.length >= extrasGroup.maxSelect) {
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const extraTotalCents = selectedExtras.reduce((acc, o) => acc + o.priceDeltaCents, 0);
  const totalPriceCents = item.priceCents + extraTotalCents;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modifiers: SelectedModifier[] = [];
    if (spiceGroup && selectedSpice) {
      modifiers.push({
        groupId: spiceGroup.id,
        groupName: spiceGroup.name,
        option: selectedSpice,
      });
    }
    if (extrasGroup) {
      selectedExtras.forEach((extra) => {
        modifiers.push({
          groupId: extrasGroup.id,
          groupName: extrasGroup.name,
          option: extra,
        });
      });
    }

    onAddToCart(item, modifiers, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[var(--sf-radius)] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Image banner */}
        <div className="relative h-48 w-full bg-[var(--sf-brand-tint)]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="size-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-[var(--sf-surface-fg)] shadow-md transition-transform hover:scale-105"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--sf-surface-fg)] sm:text-2xl">
                {item.name}
              </h2>
              <p className="mt-1 text-xs text-[var(--sf-muted)] sm:text-sm">
                {item.description}
              </p>
            </div>
            <span className="shrink-0 text-base font-bold text-[var(--sf-surface-fg)] sm:text-lg">
              {formatPrice(item.priceCents)}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
            {/* Spice group */}
            {spiceGroup && (
              <div className="rounded-[var(--sf-radius)] border border-[var(--sf-border)] p-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[var(--sf-surface-fg)]">
                    {spiceGroup.name}
                  </label>
                  <span className="rounded-full bg-[var(--sf-brand-tint)] px-2 py-0.5 text-[10px] font-semibold text-[var(--sf-brand)]">
                    Required
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {spiceGroup.options.map((option) => {
                    const isSelected = selectedSpice?.id === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-xs transition-colors sm:text-sm ${
                          isSelected
                            ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/40 font-semibold"
                            : "border-[var(--sf-border)] hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="spice"
                            checked={isSelected}
                            onChange={() => setSelectedSpice(option)}
                            className="size-4 accent-[var(--sf-brand)]"
                          />
                          <span>{option.name}</span>
                        </div>
                        <span className="text-[var(--sf-muted)]">
                          {option.priceDeltaCents > 0
                            ? `+${formatPrice(option.priceDeltaCents)}`
                            : "Free"}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extras group */}
            {extrasGroup && (
              <div className="rounded-[var(--sf-radius)] border border-[var(--sf-border)] p-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[var(--sf-surface-fg)]">
                    {extrasGroup.name}
                  </label>
                  <span className="text-xs text-[var(--sf-muted)]">
                    Optional (up to {extrasGroup.maxSelect})
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {extrasGroup.options.map((option) => {
                    const isSelected = selectedExtras.some((o) => o.id === option.id);
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-xs transition-colors sm:text-sm ${
                          isSelected
                            ? "border-[var(--sf-brand)] bg-[var(--sf-brand-tint)]/40 font-semibold"
                            : "border-[var(--sf-border)] hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleExtra(option)}
                            className="size-4 rounded accent-[var(--sf-brand)]"
                          />
                          <span>{option.name}</span>
                        </div>
                        <span className="font-medium text-[var(--sf-brand)]">
                          +{formatPrice(option.priceDeltaCents)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special request note */}
            <div>
              <label className="block text-xs font-semibold text-[var(--sf-surface-fg)]">
                Special instructions (optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra napkins, no onions, etc."
                rows={2}
                className="mt-1.5 w-full rounded-lg border border-[var(--sf-border)] p-2.5 text-xs text-[var(--sf-surface-fg)] outline-none focus:border-[var(--sf-brand)]"
              />
            </div>

            {/* Submit button */}
            <div className="border-t border-[var(--sf-border)] pt-4">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--sf-radius-control)] bg-[var(--sf-brand)] px-6 text-sm font-bold text-white shadow-md transition-all hover:brightness-95 active:scale-98"
              >
                <span>Add to order</span>
                <span>·</span>
                <span className="tabular-nums">{formatPrice(totalPriceCents)}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
