"use server"
import { auth } from "@/auth"
import db from "@/db"
import { shippingAddressType } from "@/types/shipping.types"
import { shippingAddressSchema } from "@/types/validators"
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