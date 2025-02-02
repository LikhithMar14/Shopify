import { formatNumberWithDecimalPlaces } from "@/lib/utils";
import { z } from "zod";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimalPlaces(Number(value))),
    'Price must have exactly two decimal places'
  );

export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    category: z.string().min(3, 'Category must be at least 3 characters'),
    brand: z.string().min(3, 'Brand must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});

export const LoginSchema = z.object({
  email:z.string().email("Invalid email address"),
  password:z.string().min(6,"Password must be at least 6 characters")
})

export const SignupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });
  
export const cartItemSchema = z.object({
  productId:z.string().min(1,"ProductId is required"),
  name:z.string().min(1,"Name is required"),
  slug:z.string().min(1,"Slug is required"),
  qty:z.number().int().nonnegative("Quantity must be a positive number"),
  image:z.string().min(1,"Image is required"),
  price:currency

})

export const insertCartSchema = z.object({
  items:z.array(cartItemSchema),
  itemsPrice:currency,
  totalPrice:currency,
  shippingPrice:currency,
  taxPrice:currency,
  sessionCartId:z.string().min(1,"Session cartId is required"),
  userId:z.string().optional().nullable()
})