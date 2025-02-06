import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemType, CartType } from "@/types/cart.types";
import { addItemToCart, createCart, deleteCartByUserId, removeItemFromCart } from "@/actions/cart/cart.action";


interface CartStoreType {
  cartFromStore: CartType;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (productId: string) => void;
  syncCartWithDB: (userId: string) => Promise<void>; // Syncing on login
}

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
        cartFromStore: { items: [], itemsPrice: "0", totalPrice: "0", shippingPrice: "0", taxPrice: "0", sessionCartId: "", userId: null },

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartFromStore.items.find((i) => i.productId === item.productId);

          if (existingItem) {
            return {
                cartFromStore: {
                ...state.cartFromStore,
                items: state.cartFromStore.items.map((i) =>
                  i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i
                ),
              },
            };
          }

          return {
            cartFromStore: {
              ...state.cartFromStore,
              items: [...state.cartFromStore.items, { ...item, qty: 1 }],
            },
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
            cartFromStore: {
            ...state.cartFromStore,
            items: state.cartFromStore.items
              .map((i) => (i.productId === productId ? { ...i, qty: i.qty - 1 } : i))
              .filter((i) => i.qty > 0),
          },
        }));
      },


      syncCartWithDB: async (userId) => {
        const state = get();
        const cart = state.cartFromStore
        if (!cart.items.length) return;

        try {
          await deleteCartByUserId();
          await createCart(cart)
        } catch (error) {
          console.error("Error syncing cart:", error);
        }
      },
    }),
    { name: "cart-storage" }
  )
);
