"use server";

import { auth } from "@/auth";
import { CartItemType } from "@/types/cart.types";
import { cookies } from "next/headers";
import db from "@/db";
import { revalidatePath } from "next/cache";

const CalculatePrice = (items: CartItemType[]) => {
  const itemsPrice = (items.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)).toString();
  const shippingPrice = (Number(itemsPrice) > 100 ? 7 : 0).toString();
  const taxPrice = (Number(itemsPrice) * 0.07).toFixed();
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toString();
  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export async function addItemToCart(data: CartItemType) {
  try {
    const session = await auth();
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    let userId = session?.user?.id ?? undefined;

    if (!sessionCartId) {
      return {
        success: false,
        message: "Session cartId is missing",
      };
    }

    const cart = await getMyCart();

    const item: CartItemType = {
      cartId: sessionCartId,
      productId: data.productId,
      name: data.name,
      slug: data.slug,
      qty: data.qty,
      image: data.image,
      price: data.price,
    };

    const product = await db.product.findFirst({
      where: { slug: data.slug },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const { taxPrice, totalPrice, itemsPrice, shippingPrice } = CalculatePrice([item]);

    if (!cart) {
      // Create a new cart if it doesn't exist
      const response = await db.cart.create({
        data: {
          items: {
            create: {
              productId: data.productId,
              name: item.name,
              slug: item.slug,
              qty: item.qty,
              image: item.image,
              price: item.price,
            },
          },
          itemsPrice,
          totalPrice,
          shippingPrice,
          taxPrice,
          sessionCartId,
          userId,
        },
      });
      revalidatePath(`/product/${item.slug}`);
      console.log("CART IN CREATION: ", response);

      return {
        success: true,
        message: `${item.name} added to cart`,
      };
    } else {
      // Check if the item already exists in the cart
      const itemExists = cart.items.find((x) => x.productId === data.productId);

      if (itemExists) {
        console.log("Before: ", cart.items);

        // Check stock before updating quantity
        if (Number(itemExists.qty) + 1 > Number(product.stock)) {
          return {
            success: false,
            message: "Not enough stock",
          };
        }

        // Update the quantity of the existing item in the cart
        await db.cartItem.update({
          where: { id: itemExists.id },
          data: {
            qty: itemExists.qty + 1, // Increment quantity
          },
        });

        // Recalculate prices after quantity update
        const updatedCartItems = cart.items.map((item) =>
          item.productId === data.productId ? { ...item, qty: itemExists.qty + 1 } : item
        );

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = CalculatePrice(updatedCartItems);

        // Update the cart with new totals
        await db.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              connect: updatedCartItems.map((item) => ({ id: item.id })),
            },
            itemsPrice,
            totalPrice,
            shippingPrice,
            taxPrice,
          },
        });

        console.log("Cart after update: ", updatedCartItems);

        return {
          success: true,
          message: `${item.name} updated in cart`,
        };
      } else {
        if (product.stock <= 0) {
          throw new Error("Not enough stock");
        }

        // If the item doesn't exist, create a new CartItem
        const createdItem = await db.cartItem.create({
          data: {
            productId: product.id,
            name: product.name,
            slug: product.slug,
            qty: 1,
            image: product.images[0],
            price: product.price,
            cartId: cart.id,
          },
        });

        item.cartId = cart.id;
        cart.items.push(createdItem);
      }

      // Recalculate prices after adding the item
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = CalculatePrice(cart.items);

      // Update the cart with the new item and totals
      await db.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            connect: cart.items.map((item) => ({ id: item.id })),
          },
          itemsPrice,
          totalPrice,
          shippingPrice,
          taxPrice,
        },
      });

      console.log("Cart after adding item: ", cart.items);

      return {
        success: true,
        message: `${item.name} added to cart successfully`,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Adding item to cart failed",
    };
  }
}

export async function getMyCart() {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await db.cart.findFirst({
    where: {
      userId,
      sessionCartId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return undefined;
  return cart;
}
