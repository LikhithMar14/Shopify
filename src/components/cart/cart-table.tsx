"use client";

import { CartType } from "@/types/cart.types";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { addItemToCart, removeItemFromCart } from "@/actions/cart/cart.action";
import { Minus, Plus, Loader, ArrowRight, PlusIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import CartTotalPrice from "./cart-totalPrice";

const CartTable = ({ cart }: { cart?: CartType }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="w-40 text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.productId}>
                    {/* Item Details */}
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>

                    {/* Quantity Controls */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(item.productId);
                              res.success
                                ? toast.success(res.message)
                                : toast.error(res.message);
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>

                        <span className="font-semibold">{item.qty}</span>

                        <Button
                          disabled={isPending}
                          variant="outline"
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item);
                              res.success
                                ? toast.success(res.message)
                                : toast.error(res.message);
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <PlusIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="text-right">
                      <span className="pl-5 font-semibold">₹{item.price}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <CartTotalPrice cart={cart}/>
        </div>
      )}
    </div>
    
  );
};

export default CartTable;
