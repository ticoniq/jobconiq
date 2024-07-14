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
import { ChangePasswordSchema, updateEmailSchema } from "@/lib/validation/developer-validation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateEmail, updatePassword } from "./loginDetailsAction";
import { CheckCircle2 } from "lucide-react";
import { Email } from "./Email";

interface LoginDetailsProps {
  userDetails: any;
}

export function LoginDetails({ userDetails }: LoginDetailsProps) {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    console.log(values);
    try {
      const data = await updatePassword(values);
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
    <Card className="rounded-none bg-transparent border-none shadow-none">
      <CardHeader className="py-4 px-0">
        <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
        <p className="mt-1 text-base font-normal leading-6">This is your personal information that you can update anytime.</p>
      </CardHeader>
      <CardContent className="px-0 py-4 w-full border-t border-gray-100 font-normal text-base divide-y divide-gray-100">
        <Email userDetails={userDetails} />
        <Form
          {...form}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <dl className="divide-y divide-gray-100">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-20">
                <dt className="leading-6">
                  <h3 className="text-lg font-semibold leading-7">New Password</h3>
                  <p className="mt-1">Manage your password to make sure it is safe</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 space-y-6 md:w-2/3">
                  <FormField
                    control={control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Enter your old password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Enter your new password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Confirm your new password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-start items-center sm:px-0">
                    <Button type="submit" className="px-10" disabled={isSubmitting}>
                      {isSubmitting && (
                        <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Change Password
                    </Button>
                  </div>
                </dd>
              </div>
            </dl>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}