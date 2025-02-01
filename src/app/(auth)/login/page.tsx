import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import Link from "next/link";
  import Image from "next/image";
  import { APP_NAME } from "@/lib/constants";
  import { LoginForm } from "@/components/auth/login-form";
  
  export const metadata = {
    title: "Login",
  };
  
  const SignUpPage = () => {
    return (
      <div className="w-full max-w-md mx-auto">
        <Card className="border-none">
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center">
              <Image
                src="/images/logoShopify.svg"
                alt={`${APP_NAME} logo`}
                width={100}
                height={100}
                priority={true}
              />
            </Link>
            <CardTitle className="text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Sign up to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default SignUpPage;
  