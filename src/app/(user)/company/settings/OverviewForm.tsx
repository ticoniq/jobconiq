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
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MultiSelect } from "@/components/MultiSelect";
import { companySchema } from "@/lib/validation/company-validation";
import { ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { UpdateCompanyDetails } from "./action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { industries, skillList } from "@/lib/job-types";

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
      size: companyDetails.size || "",
      industry: companyDetails.industry || "",
      location: companyDetails.location || "",
      techstack: companyDetails.techStack || [],
      date: companyDetails.dateFounded ? new Date(companyDetails.dateFounded) : undefined,
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
      if (value !== undefined && value !== null) {
        if (key === 'techstack') {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    try {
      const data = await UpdateCompanyDetails(formData);
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
                  <div className="flex w-full space-y-5 md:gap-4 md:space-y-0">
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem className="w-full md:1/2">
                          <Select
                            {...field}
                            defaultValue=""
                            onValueChange={field.onChange}
                          >
                            <FormLabel>Employee</FormLabel>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Company Size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value={"1+"}>1-10</SelectItem>
                                <SelectItem value={"10+"}>11-50</SelectItem>
                                <SelectItem value={"150+"}>51-200</SelectItem>
                                <SelectItem value={"350+"}>201-500</SelectItem>
                                <SelectItem value={"500+"}>501-1000</SelectItem>
                                <SelectItem value={"2500+"}>1001-5000</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem className="w-full md:1/2">
                          <Select
                            {...field}
                            defaultValue=""
                            onValueChange={field.onChange}
                          >
                            <FormLabel>Industry</FormLabel>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Industry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {industries.map((industry) => (
                                  <SelectItem key={industry.value} value={industry.value}>
                                    {industry.value}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date Founded</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              const date = new Date(e.target.value);
                              field.onChange(isNaN(date.getTime()) ? undefined : date);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="techstack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Tech Stacks</FormLabel>
                        <FormControl>
                          <MultiSelect
                            {...field}
                            options={skillList}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select Required Skills"
                            variant="inverted"
                            animation={2}
                            maxCount={10}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                          <textarea
                            className="w-full bg-transparent border-2 border-brand-secondary text-base p-4 focus:ring-brand-primary focus:border-brand-primary"
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription> Maximum 5000 characters </FormDescription>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
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