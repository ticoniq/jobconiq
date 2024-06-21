"use client"
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from '@/lib/validation/auth-validation';
import { ImSpinner8 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import CustomLink from '../ui/custom-link';

export function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log("hello")
      // login(values, callbackUrl)
      // .then((data) => {
      //   if (data?.error) {
      //     setError(data.error);
      //   }
      //   if (data?.success) {
      //     setSuccess(data?.success);
      //     form.reset();
      //   }

      //   if (data?.twoFactor) {
      //     setShowTwoFactor(true);
      //   }
      // })
      // .catch(() => {
      //   setError("An error occurred. Please try again.");
      // });
    });
  };

  return (
    <div className="flex flex-col gap-6 ">
      <Button variant="outline" type="button" disabled={isPending}>
        {isPending && (
          <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isPending && (
          <FcGoogle className="mr-2 h-5 w-5" />
        )}
        Login with Google
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-2 border-neutrals-400" />
        </div>
        <div className="relative flex justify-center text-md text-muted">
          <span className="bg-background px-4 text-muted-foreground">
            Or login with email
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="font-semibold text-base text-neutrals-800">
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="johndoe@example.com"
                    type="email"
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
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  <CustomLink
                    href="/forgot-password"
                    className="text-brand-primary font-semibold"
                    textarea={'Forgot your password?'}
                    divClassName="border-brand-primary border-b-2"
                  />
                </div>
                <FormControl className="font-semibold text-base text-neutrals-800">
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="********"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending}>
            {isPending && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
        </form>
      </Form>

    </div>
  )
}