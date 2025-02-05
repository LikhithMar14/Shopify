import { shippingAddressSchema } from "@/types/validators";
import { z } from "zod"
export type shippingAddressType = z.infer<typeof shippingAddressSchema>
