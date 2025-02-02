"use server";

import { auth } from "@/auth";
import { CartItemType } from "@/types/cart.types"
import { cookies } from "next/headers";
import db from "@/db"

export async function addItemToCart(data:CartItemType){
    try{
        const session = await auth()

        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        console.log(session)
        console.log({
            "sessionCartId": sessionCartId,
            "UserId" : session?.user.id

        })

        return {
            success:true,
            message:`${data.name} added to cart successfully`
        };
    }catch(err){
        return {
            success:false,
            message:`Failed to add ${data.name} to cart`
        }
    }


}

export async function getMyCart(){
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if(!sessionCartId)throw new Error("Cart session not found")
    
    const session = await auth()
    const userId = session?.user?.id

    if(!userId){
        return {
            sucess:false,
            message:"UserId not foudn"
        }
    }

    const cart = await db.cart.findFirst({
        where:{
            userId,
            sessionCartId
        },
    })

    if(!cart){
        
    }
}