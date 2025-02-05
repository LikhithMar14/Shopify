"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { shippingAddressType } from "@/types/shipping.types";
import { shippingAddressSchema } from "@/types/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, LoaderPinwheel } from "lucide-react";
import { toast } from "sonner";
import { updateUserAddress } from "@/actions/user/user.action";

const ShippingAddress = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<shippingAddressType>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      pinCode: "",
      country: "",
    },
  });

  const onSubmit: SubmitHandler<shippingAddressType> = async (data) => {
    startTransition(async () => {
      try {

        const response = await updateUserAddress(data);
        if(!response.success){
            toast.error(response.message)
        }else {
            toast.success(response.message)
        }

      } catch (error) {
        toast.error("Failed to save address. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-2xl border border-gray-200 shadow-md bg-white dark:bg-gray-900 dark:border-gray-800">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Shipping Address
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Please enter your shipping details
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {["fullName", "address", "city", "pinCode", "country"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof shippingAddressType}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Enter your ${field.name}`}
                      {...field}
                      disabled={isPending}
                      className="rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
            >
              {isPending ? (
            <LoaderPinwheel className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddress;
