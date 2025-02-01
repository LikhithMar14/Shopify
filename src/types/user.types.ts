import { LoginSchema, SignupSchema } from "@/types/validators";
import { z } from "zod";
export type Login = z.infer<typeof LoginSchema> 
export type Signup = z.infer<typeof SignupSchema>
