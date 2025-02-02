import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/types/validators"
import db from "./db";
import bcrypt from "bcryptjs"
 
export default {
  providers: [
    Credentials({
        credentials: {
        email: {},
        password: {},
      },
        async authorize(credentials){

            const validatedFields = LoginSchema.safeParse(credentials);
            if(validatedFields.success){
                const {email,password} = validatedFields.data;

                const existingUser = await db.user.findUnique({
                    where:{email}
                })
                if(!existingUser || !existingUser.password)return null
                const PasswordMatch =  await bcrypt.compare(password,existingUser.password)


                if(PasswordMatch){
                  return existingUser
                }
            }
            return null
        }
    })
  ],
}