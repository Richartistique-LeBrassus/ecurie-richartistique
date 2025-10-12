import { ProductType } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
  product: ProductType;
  quantity: number;
  number: string; // default empty string if not specified
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: ProductType, number?: string) => void;
  removeItem: (productId: string) => void;
  removeItemCompletely: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
  setItemQuantity: (product: ProductType, quantity: number, number?: string) => void;
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

addItem: (product, number = "") =>
  set((state) => {
    const existingItem = state.items.find(
      (item) =>
        item.product._id === product._id &&
        item.number === number
    );

    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.product._id === product._id &&
          item.number === number
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    } else {
      return {
        items: [...state.items, { product, quantity: 1, number }],
      };
    }
  }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product._id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Decrease quantity only if greater than 1
              : item
          ),
        })),

      removeItemCompletely: (productId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId), // Completely remove the item
        })),
 

      clearBasket: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        ),

      getItemCount: (productId) => {
        const item = get().items.find(
          (item) => item.product._id === productId
        );
        return item ? item.quantity : 0;
      },

      getGroupedItems: () => get().items,

      setItemQuantity: (product, quantity, number = "") =>
  set((state) => {
    if (quantity <= 0) {
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.product._id === product._id &&
              item.number === number
            )
        ),
      };
    }

    const existingItem = state.items.find(
      (item) =>
        item.product._id === product._id &&
        item.number === number
    );

    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.product._id === product._id &&
          item.number === number
            ? { ...item, quantity }
            : item
        ),
      };
    } else {
      return {
        items: [...state.items, { product, quantity, number }],
      };
    }
  }),
    }),
    {
      name: "basket-store",
    }
  )
);

export default useBasketStore;
