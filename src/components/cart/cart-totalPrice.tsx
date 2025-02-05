"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { CartType } from "@/types/cart.types";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import {   useRouter } from "next/navigation";
import { ArrowRight, Loader } from "lucide-react";



const CartTotalPrice = ({cart}:{cart?:CartType}) => {
    const router = useRouter()

    const [isPending,startTransition] = useTransition()
    return ( 
        <>
            <Card>
                <CardContent className="gap-5 p-4">
                    <div className="pb-3 text-lg">
                        SubTotal ({cart?.items.reduce((x, y) => x+y.qty,0)})
                        <span className="font-bold ml-4">₹{cart?.itemsPrice}</span>
                    </div>
                    <Button className="w-full" disabled = {isPending} onClick={() => startTransition(()=>router.push('/shipping-address'))}>
                        {
                            isPending ? (
                                <Loader className="w-4 h-4 animate-spin"/>
                            ):(
                                <ArrowRight className="w-4 h-4"/>
                            )
                        }{' '}
                        Proceed to Checkout
                    </Button>
                </CardContent>
            </Card>
        </>
     );
}
 
export default CartTotalPrice;