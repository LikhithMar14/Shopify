"use server";

import { auth } from "@/auth";
import { CartItemType, CartType } from "@/types/cart.types";
import { cookies } from "next/headers";
import db from "@/db";
import { revalidatePath } from "next/cache";

const CalculatePrice = (items: CartItemType[]) => {
  const itemsPrice = items
    .reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
    .toString();
  const shippingPrice = (Number(itemsPrice) > 100 ? 7 : 0).toString();
  const taxPrice = (Number(itemsPrice) * 0.07).toFixed();
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toString();
  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export async function addItemToCart(data: CartItemType) {
  console.log("Triggered")
  try {
    const session = await auth();
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    let userId = session?.user?.id ?? undefined;

    if (!sessionCartId) {
      return {
        success: false,
        message: "Session cartId is missing",
      };
    }

    const cart = await getMyCart();

    const item = {
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

    const { taxPrice, totalPrice, itemsPrice, shippingPrice } = CalculatePrice([
      item,
    ]);

    if (!cart) {
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


      return {
        success: true,
        message: `${item.name} added to cart`,
      };
    } else {
      const itemExists = cart.items.find((x) => x.productId === data.productId);

      if (itemExists) {


        if (Number(itemExists.qty) + 1 > Number(product.stock)) {
          return {
            success: false,
            message: "Not enough stock",
          };
        }

        await db.cartItem.update({
          where: { id: itemExists.id },
          data: {
            qty: itemExists.qty + 1,
          },
        });

        const updatedCartItems = cart.items.map((item) =>
          item.productId === data.productId
            ? { ...item, qty: itemExists.qty + 1 }
            : item
        );

        const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
          CalculatePrice(updatedCartItems);

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
        revalidatePath(`/product/${product.slug}`);




        return {
          success: true,
          message: `${item.name} updated in cart`,
        };
      } else {
        if (product.stock <= 0) {
          throw new Error("Not enough stock");
        }

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

        cart.items.push(createdItem);
      }

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
        CalculatePrice(cart.items);

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


      revalidatePath(`/product/${product.slug}`);

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
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await db.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return undefined;
  return cart;
}
export async function removeItemFromCart(productId: string) {
  try {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const product = await db.product.findFirst({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const exist = cart.items.find((x) => x.productId === productId);
    if (!exist) throw new Error("Item not found in cart");

    let updatedCartItems = cart.items;

    if (exist.qty === 1) {
      await db.cartItem.delete({ where: { id: exist.id } });
      updatedCartItems = cart.items.filter((x) => x.productId !== productId);
    } else {
      await db.cartItem.update({
        where: { id: exist.id },
        data: { qty: exist.qty - 1 },
      });

      updatedCartItems = cart.items.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty - 1 } : item
      );
    }

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      CalculatePrice(updatedCartItems);

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

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Failed to remove item from cart",
    };
  }
}
export async function deleteCartByUserId() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    await db.cart.deleteMany({
      where: { userId: session.user.id },
    });

    return { success: true, message: "Cart deleted successfully" };
  } catch (err) {
    console.error("Error deleting cart:", err);
    return { success: false, message: "Failed to delete cart" };
  }
}


export async function createCart(info: CartType) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = CalculatePrice(info.items);

    const cart = await db.cart.create({
      data: {
        userId: session.user.id,
        items: {
          create: info.items.map(item => ({
            productId: item.productId,
            name: item.name,
            slug: item.slug,
            qty: item.qty,
            image: item.image,
            price: item.price,
          })),
        },
        itemsPrice,
        totalPrice,
        shippingPrice,
        taxPrice,
        sessionCartId: info.sessionCartId,
      },
      include: { items: true },
    });

    revalidatePath("/cart");

    return { success: true, message: "Cart created successfully", cart };
  } catch (err) {
    console.error("Error creating cart:", err);
    return { success: false, message: "Failed to create cart" };
  }
}