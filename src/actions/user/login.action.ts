"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { LoginSchema } from "@/types/validators";
import { Login as LoginType } from "@/types/user.types";
import { AuthError } from "next-auth";

export const Login = async (values: LoginType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      message: "Invalid Fields! ",
      success: false,
    };
  }
  const { email, password } = validatedFields.data;

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
        message:"LoggedIn Successfully",
        success:true
    }
  }catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { 
            message:"Invalid Credentials",
            success:false
           };
        case "CredentialsSignin":
          throw error;
        default:
          return {message:"Login Successful", success: true };
      }
    }
    return {
      message:"Login failed",
      success:false
    }
    throw error;
  }
};

export async function signOutUser() {
  await signOut();
}
