"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CartItemType, CartType } from "@/types/cart.types";
import { addItemToCart, removeItemFromCart } from "@/actions/cart/cart.action";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: CartType; item: CartItemType }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const response = await addItemToCart(item);

      if (response.success) {
        toast.success(response.message, {
          action: {
            label: "Go to Cart",
            onClick: () => router.push("/cart"),
          },
        });
      } else {
        toast.error(response.message, {
          action: {
            label: "Go to Cart",
            onClick: () => router.push("/cart"),
          },
        });
      }
    });
  };

  const handleRemoveCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (res.success) {
        toast.success(res.message);
      } else toast.error(res.message);
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <Plus />} Add
      To Cart
    </Button>
  );
};
export default AddToCart;
