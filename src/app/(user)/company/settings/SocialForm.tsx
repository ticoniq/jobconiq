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
import { companySocialSchema } from "@/lib/validation/company-validation";
import { UpdateCompanySocials } from "./companySocialAction";

interface OverviewFormProps {
  companyDetails: any;
}

export default function OverviewForm({ companyDetails }: OverviewFormProps) {
  const form = useForm<z.infer<typeof companySocialSchema>>({
    resolver: zodResolver(companySocialSchema),
    defaultValues: {
      instagram: companyDetails?.instagram || "",
      twitter: companyDetails?.twitter || "",
      facebook: companyDetails?.facebook || "",
      linkedin: companyDetails?.linkedin || "",
      youtube: companyDetails?.youtube || "",
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof companySocialSchema>) => {
    try {
      const data = await UpdateCompanySocials(values);
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
    <div>
      <div className="w-full border-t border-gray-100 font-normal text-base">
        <Form
          {...form}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="text-lg font-semibold leading-7">Basic Information</h3>
                  <p className="mt-1">Add elsewhere links to your company profile. You can add only username without full https links.</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 space-y-6 md:w-2/3">
                  <FormField
                    control={control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://instagram.com/companyname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://twitter.com/companyname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://facebook.com/companyname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://linkedin.com/companyname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="youtube"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Youtube</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://youtube.com/companyname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="flex justify-end items-center px-4 py-6 sm:px-0">
                <Button type="submit" className="px-10" disabled={isSubmitting}>
                  {isSubmitting && (
                    <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </div>
            </dl>
          </form>
        </Form>
      </div>
    </div>
  )
}