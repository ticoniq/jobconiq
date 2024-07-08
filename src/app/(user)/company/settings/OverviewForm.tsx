"use client";
import * as z from 'zod';
import Image from "next/image";
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
  FormDescription
} from "@/components/ui/form";
import { toast } from "sonner";
import { draftToMarkdown } from "markdown-draft-js";
import RichTextEditor from "@/components/RichTextEditor";
import { MultiSelect } from "@/components/MultiSelect";
import { companySchema } from "@/lib/validation/company-validation";
import { ImageIcon, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";
import { UpdateCompanyDetails } from "./action";
import companyLogoPlaceholder from "@/assets/images/avatar_placeholder.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface OverviewFormProps {
  companyDetails: any;
}

export default function OverviewForm({ companyDetails }: OverviewFormProps) {

  const [fileName, setFileName] = useState('');

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      imageurl: undefined,
      name: companyDetails.user.name || "",
      website: companyDetails.website || "",
      location: companyDetails.location || "",

      bio: companyDetails.bio || "",
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof companySchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const data = await UpdateCompanyDetails(formData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        form.reset();
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="px-4 py-8 sm:px-0">
        <h3 className="text-lg font-semibold leading-7">Basic Information</h3>
        <p className="mt-1 text-base font-normal leading-6">This information will be displayed publicly</p>
      </div>
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
                  <h3 className="font-medium leading-7">Company Logo</h3>
                  <p className="mt-1">This image will be shown publicly as company logo.</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={control}
                    name="imageurl"
                    render={({ field: { value, ...fieldValues } }) => (
                      <FormItem>
                        <div className="flex flex-col justify-between items-start gap-x-4 space-y-2 sm:items-center md:flex-row">
                          <Avatar className="h-24 w-24 sm:flex rounded-none bg-transparent">
                            <AvatarImage
                              src={companyDetails.user?.image || ""}
                              className="rounded-none bg-transparent"
                              alt="Avatar"
                            />
                            <AvatarFallback className="rounded-none uppercase bg-transparent">
                              {"JC"}
                            </AvatarFallback>
                          </Avatar>
                          <FormControl >
                            <Label className="w-full flex flex-col items-center justify-center h- border-2 border-brand-primary border-dashed rounded-lg cursor-pointer bg-neutrals-300 hover:neutrals-700 sm:w-3/5">
                              <div className="py-4 flex flex-col items-center justify-center space-y-2">
                                <ImageIcon className="h-6 w-6 text-brand-primary" />
                                <p className="text-md font-semibold text-neutrals-900">
                                  <span className="text-brand-primary">Click to replace</span> or drag and drop
                                </p>
                                <p className="text-neutrals-900">SVG, PNG, JPG or GIF (max. 400 x 400px)</p>
                                {fileName && (
                                  <p className="text-neutrals-900">
                                    Selected file: {fileName}
                                  </p>
                                )}
                              </div>
                              <Input
                                id="dropzone-file"
                                {...fieldValues}
                                type="file"
                                accept="image/gif, image/jpeg, image/png, image/svg+xml, image/svg"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setFileName(file.name);
                                    fieldValues.onChange(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </Label>
                          </FormControl>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-medium leading-7">Company Details</h3>
                  <p className="mt-1">Introduce your company core info quickly to users by fill up company details</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 space-y-6 md:w-2/3">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Company Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="url" {...field} placeholder="eg. https://jobconiq.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full">
                    <FormField
                      control={control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} placeholder="eg. Accra ghanna" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} placeholder="eg. Accra ghanna" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">About Company</h3>
                  <p className="mt-1">Brief description for your company. URLs are hyperlinked.</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            {...field}
                            onChange={(draft) =>
                              field.onChange(draftToMarkdown(draft))
                            }
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormDescription> Maximum 5000 characters </FormDescription>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
            </dl>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
              <dt className="leading-6" />
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 sm:w-2/3">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && (
                    <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Changes
                </Button>
              </dd>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}