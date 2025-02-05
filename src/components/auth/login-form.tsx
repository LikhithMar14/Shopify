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
import { useState, useTransition } from "react";
import { Login } from "@/actions/user/login.action";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [serverMessage, setServerMessage] = useState<string | null | undefined>(null);
  const [isPending, startTransition] = useTransition(); 

  const onSubmit = (data: LoginType) => {
    setServerMessage(null);
    
    startTransition(async () => { 
      try {
        const response = await Login(data);
        setServerMessage(response.message);

        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }

        form.reset();
      } catch (error) {
        toast.success("Login Successful");
      }
    });
  };

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="bg-white dark:bg-gray-700 text-black dark:text-white"
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
                <FormLabel className="text-gray-700 dark:text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="bg-white dark:bg-gray-700 text-black dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <SubmitButton isPending={isPending} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button
      disabled={isPending}
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center space-x-2 dark:bg-green-700 dark:hover:bg-green-800"
    >
      {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
      <span>{isPending ? "Signing in..." : "Log In"}</span>
    </Button>
  );
}

export { LoginForm };
