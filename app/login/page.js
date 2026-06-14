"use client";

import { useState } from "react";
import { Button, Card, Form, Input, Label } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setIsLoading(false);
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <ToastContainer position="top-center" autoClose={2000} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-2xl border border-content2">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-default-500">Welcome back!</p>
          </div>

          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
            />
            <Label>Password</Label>
            <Input name="password" placeholder="Password" type="password" />

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full font-bold"
            >
              Sign in
            </Button>
          </Form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-divider"></div>
            <span className="text-xs text-default-400">OR</span>
            <div className="flex-1 h-px bg-divider"></div>
          </div>

          <Button
            variant="bordered"
            className="w-full"
            onPress={() =>
              authClient.signIn.social({ provider: "google", callbackUrl })
            }
            isLoading={isGoogleLoading}
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
