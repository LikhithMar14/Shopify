"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/types/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Loader, CreditCard, Banknote, Shield } from "lucide-react";
import { updateUserPaymentMethod } from "@/actions/user/user.action";
import { Card } from "@/components/ui/card";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || "PayPal",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.push("/place-order");
    });
  };

  const paymentMethods = [
    {
      id: "PayPal",
      label: "PayPal",
      description: "Fast and secure online payments",
      icon: CreditCard,
      color: "text-blue-500",
    },
    {
      id: "Stripe",
      label: "Credit Card",
      description: "Pay with your credit or debit card",
      icon: Shield,
      color: "text-purple-500",
    },
    {
      id: "CashOnDelivery",
      label: "Cash On Delivery",
      description: "Pay when you receive your order",
      icon: Banknote,
      color: "text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8 shadow-lg">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Payment Method
            </h1>
            <p className="text-muted-foreground">
              Choose your preferred payment option
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Secure Payment
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid gap-4"
                      >
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <label
                              key={method.id}
                              htmlFor={method.id}
                              className={`relative flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                                field.value === method.id
                                  ? "border-primary bg-muted/30"
                                  : ""
                              }`}
                            >
                              <RadioGroupItem
                                value={method.id}
                                id={method.id}
                                checked={field.value === method.id}
                                onChange={() => field.onChange(method.id)}
                                className="absolute right-4"
                              />
                              <Icon className={`h-6 w-6 ${method.color}`} />
                              <div className="flex-1">
                                <div className="text-base font-medium">
                                  {method.label}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {method.description}
                                </p>
                              </div>
                            </label>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full py-6 text-lg transition-all"
              >
                {isPending ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Payments are secure and encrypted</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentMethodForm;
