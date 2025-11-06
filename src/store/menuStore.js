import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchProducts } from "../api/client";

export const useMenuStore = create(
  persist(
    (set, get) => ({
      selectedCategory: "non-veg",
      setCategory: (category) => set({ selectedCategory: category }),

      cart: [],
      orders: [],
      currentOrder: null,

      getAllMenuItems: async () => {
        return await fetchProducts();
      },

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

      canPlaceOrder: () => {
        const state = get();
        if (!state.currentOrder) return true;

        const orderTime = new Date(state.currentOrder.orderDate).getTime();
        const currentTime = Date.now();
        const fiveMinutes = 5 * 60 * 1000;

        return currentTime - orderTime >= fiveMinutes;
      },

      placeOrder: (orderDetails) => {
        const state = get();

        if (!state.canPlaceOrder()) {
          return null;
        }

        const newOrder = {
          id: `ORD${Date.now()}`,
          items: [...state.cart],
          total: orderDetails.total,
          deliveryFee: orderDetails.deliveryFee,
          finalTotal: orderDetails.finalTotal,
          status: "preparing",
          orderDate: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
        };

        set({
          orders: [...state.orders, newOrder],
          currentOrder: newOrder,
          cart: [],
        });

        setTimeout(() => {
          const currentState = get();
          if (currentState.currentOrder?.id === newOrder.id) {
            set({ currentOrder: null });
          }
        }, 1 * 60 * 1000);

        return newOrder;
      },

      updateOrderStatus: (orderId, newStatus) =>
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          );

          const updatedCurrentOrder =
            state.currentOrder?.id === orderId
              ? { ...state.currentOrder, status: newStatus }
              : state.currentOrder;

          return {
            orders: updatedOrders,
            currentOrder: updatedCurrentOrder,
          };
        }),

      clearCurrentOrder: () => set({ currentOrder: null }),
    }),
    {
      name: "menu-cart-storage",
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        currentOrder: state.currentOrder,
      }),
    }
  )
);
