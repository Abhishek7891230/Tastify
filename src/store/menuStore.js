import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMenuStore = create(
  persist(
    (set) => ({
      selectedCategory: "non-veg",
      setCategory: (category) => set({ selectedCategory: category }),

      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.name === item.name);
          if (existingItem) {
            const updatedCart = state.cart.map((i) =>
              i.name === item.name
                ? { ...i, quantity: (i.quantity || 1) + 1 }
                : i
            );
            return { cart: [...updatedCart] };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),

      updateQuantity: (name, delta) =>
        set((state) => {
          const updatedCart = state.cart
            .map((item) =>
              item.name === name
                ? {
                    ...item,
                    quantity: Math.max(1, (item.quantity || 1) + delta),
                  }
                : item
            )
            .filter((item) => item.quantity > 0);
          return { cart: updatedCart };
        }),

      removeFromCart: (itemName) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.name !== itemName),
        })),
    }),
    {
      name: "menu-cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
