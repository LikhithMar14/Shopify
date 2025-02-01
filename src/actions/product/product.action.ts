"use server";

import db from "@/db/index";

export async function getLatestProducts(){
    try{
        const data = await db.product.findMany({
            take: 10,
            orderBy: {createdAt: 'desc'},
        })
        return data;

    }catch(err){
        console.error(err,"Error in getLatestProducts route");
    }
}
export async function getProductBySlug(slug:string){
    return await db.product.findFirst({
        where:{slug}
    })
}