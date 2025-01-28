'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import FormInput from "@/components/forms/InputFields";
import { Eye, EyeOff, Loader } from "lucide-react";
import Cookies from 'js-cookie'
import { APP_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { decorAccessToken } from "@/helpers/token.helper";

export default function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const [showPassword , setShowPassword] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    setIsLoading(true);

    try {
      const response = await fetch(`${APP_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      Cookies.set('DECOR_ACCESS_TOKEN' , data?.token)
      router.replace(routes.ADMIN_DASHBOARD)
      toast({
        title: "Login Successful",
        description: data.message,
        variant: "success",
      });

      // Redirect or perform additional actions on successful login
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(decorAccessToken()) router.replace(routes.ADMIN_DASHBOARD)
  },[])

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-primary">Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FormInput
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <FormInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant={'ghost'} onClick={() => setShowPassword((prev) => !prev)} type="button"
                className="absolute top-[50%] right-2 translate-y-[-50%]"
                >
                {
                  showPassword ? <EyeOff /> : <Eye />
                }
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <><Loader className="animate-spin"/>Logging in...</> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}