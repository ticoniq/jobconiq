"use client";
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { developerSchema } from "@/lib/validation/developer-validation";
import { UpdateDeveloperDetails } from "./profileAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImSpinner8 } from "react-icons/im";
import { useForm } from "react-hook-form";
import { FileIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfessionProps {
  userDetails: any;
}

export function Profession({ userDetails }: ProfessionProps) {
  const [fileName, setFileName] = useState("");

  const form = useForm<z.infer<typeof developerSchema>>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      imageurl: undefined,
      name: userDetails.user?.name || "",
      title: userDetails.title || "",
      number: userDetails.phone || "",
      gender: userDetails.gender || "",
      date: userDetails.dob ? new Date(userDetails.dob) : undefined,
      website: userDetails.website || "",
      linkedin: userDetails.linkedin || "",
      github: userDetails.github || "",
      bio: userDetails.bio || "",
    }
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof developerSchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    try {
      const data = await UpdateDeveloperDetails(formData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        setFileName("");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="rounded-none bg-transparent border-none shadow-none">
      <CardHeader className="py-2 px-0">
        <CardTitle className="text-lg font-semibold">Basic Information</CardTitle>
        <p className="mt-1 text-base font-normal leading-6">This is your personal information that you can update anytime.</p>
      </CardHeader>
      <CardContent className="px-0 py-4 w-full border-t border-gray-100 font-normal text-base">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <dl className="divide-y divide-gray-100">
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-20">
                <dt className="leading-6">
                  <h3 className="font-medium leading-7">Resume</h3>
                  <p className="mt-1">This file will be sent to the company for your reference.</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={control}
                    name="imageurl"
                    render={({ field: { value, ...fieldValues } }) => (
                      <FormItem>
                        <div className="flex flex-col items-start space-y-2">
                          <FormControl>
                            <Label className="w-full flex flex-col items-center justify-center border-2 border-brand-primary border-dashed rounded-lg cursor-pointer bg-neutrals-300 hover:bg-neutrals-700">
                              <div className="py-4 flex flex-col items-center justify-center space-y-2">
                                <FileIcon className="h-6 w-6 text-brand-primary" />
                                <p className="text-md font-semibold text-neutrals-900">
                                  <span className="text-brand-primary">Click to replace</span> or drag and drop PDF file here
                                </p>
                                {fileName && (
                                  <p className="text-neutrals-900 text-center">
                                    Selected file: {fileName}
                                  </p>
                                )}
                              </div>
                              <Input
                                id="dropzone-file"
                                {...fieldValues}
                                type="file"
                                accept="application/pdf"
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
              <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-20">
                <dt className="leading-6">
                  <h3 className="font-medium leading-7">Personal Details</h3>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3 space-y-6">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Full Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Job title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="Phone number" />
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
                  Save Profile
                </Button>
              </div>
            </dl>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}