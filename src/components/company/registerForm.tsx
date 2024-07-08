"use client"
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from '@/lib/validation/auth-validation';
import { register } from "@/actions/company/auth/register";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
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

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    try {
      const data = await register(values);
      if (data?.error) {
        setError(data.error);
      } else {
        setSuccess(data?.success);
        form.reset();
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="grid gap-6">
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
                <FormLabel className="font-semibold text-base text-neutrals-800">Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    placeholder="eg. facebook, twitter"
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
          <Button className="w-full" disabled={isSubmitting}>
            {isSubmitting && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </form>
      </Form>

    </div>
  )
}