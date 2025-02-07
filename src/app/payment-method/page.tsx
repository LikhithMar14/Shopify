import { Metadata } from "next";
import { auth } from "@/auth"
import { getUserById } from "@/actions/user/user.action";
import CheckoutSteps from "@/components/checkout-step";
import PaymentMethodForm from "@/components/payment-method-form";


export const metadata:Metadata = {
    title: "Select Payment Method",
};

const PaymentMehod:React.FC = async() => {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (!userId) throw new Error('User not found');
  
    const user = await getUserById(userId);
    console.log(user)
  
    return (  
        <div>
            <CheckoutSteps current={2}/>
            <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
        </div>
      );
}
 
export default PaymentMehod;    