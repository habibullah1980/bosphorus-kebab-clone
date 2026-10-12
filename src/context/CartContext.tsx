"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem, ModifierOption, RESTAURANT_DATA, VOUCHER_CODES } from "@/data/restaurant";

export interface SelectedModifier {
  groupId: string;
  groupName: string;
  option: ModifierOption;
}

export interface CartItem {
  cartItemId: string; // unique identifier including options
  item: MenuItem;
  quantity: number;
  selectedModifiers: SelectedModifier[];
  unitPriceCents: number;
  specialInstructions?: string;
}

export type OrderType = "delivery" | "pickup";

interface CartContextType {
  items: CartItem[];
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  voucherCode: string;
  appliedVoucher: { code: string; discountPercent?: number; discountCents?: number; description: string } | null;
  voucherError: string | null;
  applyVoucher: (code: string) => boolean;
  removeVoucher: () => void;
  addItem: (item: MenuItem, selectedModifiers?: SelectedModifier[], specialInstructions?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalCents: number;
  discountCents: number;
  deliveryFeeCents: number;
  totalCents: number;
  minOrderReached: boolean;
  minOrderDeficitCents: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("Hermannstraße 142, 12051 Berlin");
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    discountPercent?: number;
    discountCents?: number;
    description: string;
  } | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bosphorus_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.orderType) setOrderType(parsed.orderType);
        if (parsed.deliveryAddress) setDeliveryAddress(parsed.deliveryAddress);
        if (parsed.appliedVoucher) setAppliedVoucher(parsed.appliedVoucher);
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        "bosphorus_cart",
        JSON.stringify({
          items,
          orderType,
          deliveryAddress,
          appliedVoucher,
        })
      );
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [items, orderType, deliveryAddress, appliedVoucher, isInitialized]);

  const calculateItemUnitPrice = (item: MenuItem, modifiers: SelectedModifier[]) => {
    const extraPrice = modifiers.reduce((acc, m) => acc + m.option.priceDeltaCents, 0);
    return item.priceCents + extraPrice;
  };

  const addItem = (item: MenuItem, selectedModifiers: SelectedModifier[] = [], specialInstructions = "") => {
    // Generate a unique key for item + modifiers combinations
    const sortedModifierIds = [...selectedModifiers]
      .map((m) => m.option.id)
      .sort()
      .join("-");
    const cartItemId = `${item.id}-${sortedModifierIds}-${specialInstructions.trim()}`;

    const unitPriceCents = calculateItemUnitPrice(item, selectedModifiers);

    setItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          item,
          quantity: 1,
          selectedModifiers,
          unitPriceCents,
          specialInstructions,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedVoucher(null);
    setVoucherCode("");
  };

  const applyVoucher = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    setVoucherError(null);
    if (!cleanCode) return false;

    const matched = VOUCHER_CODES[cleanCode];
    if (matched) {
      setAppliedVoucher({ code: cleanCode, ...matched });
      setVoucherCode(cleanCode);
      return true;
    } else {
      setVoucherError("Invalid voucher code. Try WELCOME10 or NEUKOELLN5");
      return false;
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode("");
    setVoucherError(null);
  };

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotalCents = items.reduce((acc, i) => acc + i.unitPriceCents * i.quantity, 0);

  let discountCents = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountPercent) {
      discountCents = Math.round((subtotalCents * appliedVoucher.discountPercent) / 100);
    } else if (appliedVoucher.discountCents) {
      discountCents = Math.min(subtotalCents, appliedVoucher.discountCents);
    }
  }

  const deliveryFeeCents = orderType === "delivery" && subtotalCents > 0 ? RESTAURANT_DATA.deliveryFeeCents : 0;
  const totalCents = Math.max(0, subtotalCents - discountCents) + deliveryFeeCents;

  const minOrderReached = orderType === "pickup" || subtotalCents >= RESTAURANT_DATA.minOrderCents;
  const minOrderDeficitCents = Math.max(0, RESTAURANT_DATA.minOrderCents - subtotalCents);

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        setOrderType,
        deliveryAddress,
        setDeliveryAddress,
        voucherCode,
        appliedVoucher,
        voucherError,
        applyVoucher,
        removeVoucher,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        itemCount,
        subtotalCents,
        discountCents,
        deliveryFeeCents,
        totalCents,
        minOrderReached,
        minOrderDeficitCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}
