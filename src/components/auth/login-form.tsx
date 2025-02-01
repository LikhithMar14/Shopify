"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login as LoginType } from "@/types/user.types";
import { LoginSchema } from "@/types/validators";
import { useState } from "react";
import { Login } from "@/actions/user/login.action";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const onSubmit = async(data: LoginType ) => {
    setServerMessage(null);
    const response = await Login(data);
    setServerMessage(response.message);
    if(response.success){
      console.log("Toast Triggered")
      toast.success(response.message)
      form.reset()
    }else{
      console.log("Toast Triggered")

      toast.error(response.message)
      form.reset()
    } 
  };

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <SubmitButton/>
          </div>
        </form>
      </Form>
    </div>
  );
};
export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center space-x-2"
    >
      {pending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      <span>{pending ? "Signing up..." : "SignUp"}</span>
    </Button>
  );
}

export { LoginForm };
