"use server"
import { auth } from "@/auth"
import db from "@/db"
import { z } from "zod"
import { shippingAddressType } from "@/types/shipping.types"
import { paymentMethodSchema, shippingAddressSchema } from "@/types/validators"
export async function getUserById(userId:string){
    const user = await db.user.findFirst({
        where:{id:userId}
    })
    if(!user)throw new Error("User not found")
    return user
}

export async function updateUserAddress(data:shippingAddressType){
    try{


        const session = await auth();
        const currentUser = await db.user.findFirst({
            where:{id:session?.user.id}
        });

        if(!currentUser){
            return{
                success:false,
                message:"user is not authenticated"
            }
        }
        const address = shippingAddressSchema.safeParse(data);

        if(!address.success)return{
            success:false,
            message:"Invalid data format"
        }

        await db.user.update({
            where:{id:session?.user.id},
            data:{address}
        })

        return {
            success:true,
            message:"Address updated successfully"
        }


    }catch(err){
        console.log(err);
        return {
            success:false,
            message:"Failed to update the address"
        }
    }
}
export async function updateUserPaymentMethod(data:z.infer<typeof paymentMethodSchema>){
    try{

        const session = await auth();
        const currentUser = await db.user.findFirst({
            where:{id:session?.user.id}
        });
        if(!currentUser)throw new Error("User not found")
        
        const validatedResponse = paymentMethodSchema.safeParse(data);
        
        if(!validatedResponse.success){
            return {
                success:false,
                message:"Invalid payment method details"
            }
        }

        const paymentMethod = validatedResponse.data;

        await db.user.updateManyAndReturn({
            where:{id:currentUser.id},
            data:{
                paymentMethod:paymentMethod.type
            }
        })
        return {
            success:true,
            message:"User updated successfully"
        }
    }catch(err){
        return {success: false, message: "Error in updating user"}
    }
}