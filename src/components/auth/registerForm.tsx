"use client"
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from '@/lib/validation/auth-validation';
import { register } from "@/actions/developer-auth/register";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
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
    <div className="grid gap-6">
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
            Or sign up with email
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-neutrals-800">Full name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="John doe"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-neutrals-800">Email Address</FormLabel>
                <FormControl>
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
                  <FormLabel className="font-semibold text-base text-neutrals-800">Password</FormLabel>
                </div>
                <FormControl>
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            {isPending && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </form>
      </Form>

    </div>
  )
}