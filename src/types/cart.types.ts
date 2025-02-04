import { z } from "zod";
import { cartItemSchema, insertCartSchema } from "@/types/validators";

export type CartType = z.infer<typeof insertCartSchema>
export type CartItemType = z.infer<typeof cartItemSchema> &{
    cartId?:string
}
