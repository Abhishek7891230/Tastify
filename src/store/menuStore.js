import { create } from "zustand";

export const useMenuStore = create((set) => ({
  selectedCategory: "non-veg",
  setCategory: (category) => set({ selectedCategory: category }),

  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (itemName) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.name !== itemName),
    })),
}));
