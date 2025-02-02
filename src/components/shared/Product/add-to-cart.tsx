"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { CartItemType,CartType } from "@/types/cart.types"
import { useTransition } from "react";
import { addItemToCart } from "@/actions/cart/cart.action";

const AddToCart = ({ item }: { item: CartItemType }) => {   
    
    const router = useRouter()
    const handleAddToCart = async () =>{
        const response = await addItemToCart(item);
        if(response.success){
            toast.success(response.message, {
                action: {
                  label: "Go to Cart",
                  onClick: () => router.push("/cart"),
                },
              });
        }else{
            toast.error(response.message,{
                action:{
                    label:"Go to Cart",
                    onClick: () => router.push("/cart")
                }
            })
        }
    }
    return (
        <div>
            <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
    )
}
export default AddToCart