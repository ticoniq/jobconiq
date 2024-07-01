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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { jobTypes, locationTypes, skillList, jobCategoriesList } from "@/lib/job-types";
import { draftToMarkdown } from "markdown-draft-js";
import RichTextEditor from "@/components/RichTextEditor";
import { MultiSelect } from "@/components/MultiSelect";

interface Props { }

export function NewJobForm({ }: Props) {

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      type: "",
      locationType: "",
      location: "Location 123",
      description: "",
      categories: [],
      skills: [],
      salary: undefined,
    }
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof createJobSchema>) => {
    try {
      const data = await createJobPosting(values);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Job created successfully!");
        form.reset();
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    }
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
                  <h3 className="font-semibold leading-7">Category</h3>
                  <p className="mt-1">You can select multiple job categories</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Job Categories</FormLabel>
                        <FormControl>
                          <MultiSelect
                            {...field}
                            options={jobCategoriesList}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            placeholder="Select Job Categories"
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
                  <h3 className="font-semibold leading-7">Required Skills</h3>
                  <p className="mt-1">Add required skills for the job</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Required Skills</FormLabel>
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
                  <h3 className="font-semibold leading-7">Job Descriptions</h3>
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
                    {isSubmitting && (
                      <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Job
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
