"use client";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner8 } from "react-icons/im";
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
import { toast } from "sonner";
import { updateEmailSchema } from "@/lib/validation/developer-validation";
import { updateEmail } from "./loginDetailsAction";
import { CheckCircle2 } from "lucide-react";

interface LoginDetailsProps {
  userDetails: any;
}

export function Email({ userDetails }: LoginDetailsProps) {
  const form = useForm<z.infer<typeof updateEmailSchema>>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: "",
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onEmailSubmit = async (values: z.infer<typeof updateEmailSchema>) => {
    try {
      const data = await updateEmail(values);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onEmailSubmit)} noValidate>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
            <dt className="leading-6">
              <h3 className="text-lg font-semibold leading-7">Update Email</h3>
              <p className="mt-1">Update your email address to make sure it is safe</p>
            </dt>
            <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 space-y-6 md:w-2/3">
              <span>
                <p className="text-sm font-semibold space-x-2">
                  <span>{userDetails.user.email}</span>
                  <span><CheckCircle2 className="inline-block h-5 w-5 text-green-500" /></span>
                </p>
                <p className="mt-2 text-sm font-normal text-gray-500">Your email address is used to log in to your account</p>
              </span>
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter your new email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-start items-center px-4 sm:px-0">
                <Button type="submit" className="px-10" disabled={isSubmitting}>
                  {isSubmitting && (
                    <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Email
                </Button>
              </div>
            </dd>
          </div>
        </dl>
      </form>
    </Form>
  )
}