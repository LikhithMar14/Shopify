"use server";

import { Signup } from "@/types/user.types";
import bcrypt from "bcryptjs";
import db from "@/db";
import { SignupSchema } from "@/types/validators";

export const signup = async (values: Signup) => {
  const validatedFields = SignupSchema.parse(values);
  if (!validatedFields) {
    return {
      message: "Invalid fields",
      success: false,
    };
  }
  const { name, email, password, confirmPassword } = validatedFields;
  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match",
      success: false,
    };
  }
  const userExists = await db.user.findFirst({
    where: { email },
  });

  if (userExists)
    return {
      message: "User already exists",
      success: false,
    };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      message: "Signup successful",
      success: true,
    };
  } catch (err) {
    console.error(err, "Error while creating new user");
    return {
      message: "Error while creating new User",
      success: false,
    };
  }
};
