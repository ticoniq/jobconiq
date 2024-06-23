"use client"
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from 'react';
import { NewPasswordSchema } from '@/lib/validation/auth-validation';
import { newPassword } from '@/actions/developer/auth/newPassword';
import { ImSpinner8 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useSearchParams } from 'next/navigation';

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data?.success);
            form.reset();
          }
        })
        .catch(() => {
          setError("An error occurred. Please try again.");
        });
    });
  };

  return (
    <div className="flex flex-col gap-6 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-neutrals-800">Password</FormLabel>
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base text-neutrals-800">Confirm Password</FormLabel>
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            {isPending && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset Password
          </Button>
        </form>
      </Form>

    </div>
  )
}