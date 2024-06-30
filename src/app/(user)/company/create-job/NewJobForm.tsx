"use client";
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createJobSchema } from "@/lib/validation/Job-validation";
import { createJobPosting } from "./action";
import { ImSpinner8 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { jobTypes, locationTypes } from "@/lib/job-types";
import { draftToMarkdown } from "markdown-draft-js";
import RichTextEditor from "@/components/RichTextEditor";

interface Props { }

export function NewJobForm({ }: Props) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      type: "",
      locationType: "",
      location: "Location 123",
      description: "",
      salary: undefined,
      companyName: "Company Name",
    }
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = (values: z.infer<typeof createJobSchema>) => {
    setError("");
    setSuccess("");

    createJobPosting(values)
      // .then((response) => {
      //   if (response.error) {
      //     setError(response.error);
      //   } else {
      //     setSuccess("Job created successfully");
      //   }
      // })
      // .catch((error) => {
      //   setError("Something went wrong, please try again");
      // });
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-semibold leading-7">Basic Information</h3>
        <p className="mt-1 text-base font-normal leading-6">This information will be displayed publicly</p>
      </div>
      <div className="mt-6 w-full border-t border-gray-100 font-normal text-base">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Job Title</h3>
                  <p className="mt-1">Job titles must be describe one position</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Software Engineer" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Type of Employment</h3>
                  <p className="mt-1">You can select type of employment</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          {...field}
                          defaultValue=""
                          onValueChange={field.onChange}
                        >
                          <FormLabel>Select Employment Type</FormLabel>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Employment Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {jobTypes.map((jobType) => (
                                <SelectItem key={jobType} value={jobType}>
                                  {jobType}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Company Name</h3>
                  <p className="mt-1">Job titles must be describe one position</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Location Type</h3>
                  <p className="mt-1">You can select type of Location</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          {...field}
                          defaultValue=""
                          onValueChange={field.onChange}
                        >
                          <FormLabel>Select Location Type</FormLabel>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Employment Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {locationTypes.map((locationType) => (
                                <SelectItem key={locationType} value={locationType}>
                                  {locationType}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Salary</h3>
                  <p className="mt-1">Please specify the estimated salary range for the role. *You can leave this blank</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                  {/* <FormField
                    control={form.control}
                    name="companyLogoUrl"
                    render={({ field: { value, ...fieldValues } }) => (
                      <FormItem>
                        <FormLabel>Company logo</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldValues}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              fieldValues.onChange(file);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <FormField
                    control={form.control}
                    name="companyLogoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Company" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Job Title</h3>
                  <p className="mt-1">Job titles must be describe one position</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="description"
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
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6">
                  <h3 className="font-semibold leading-7">Salary</h3>
                  <p className="mt-1">
                    Please specify the estimated salary range for the role. *You can leave this blank
                  </p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-20 sm:px-0">
                <dt className="leading-6" />
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 sm:w-2/3">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <ImSpinner8 className="animate-spin" />
                    ) : (
                      "Create Job"
                    )}
                  </Button>
                </dd>
              </div>
            </dl>
          </form>
        </Form>
      </div>
    </div>
  )
}