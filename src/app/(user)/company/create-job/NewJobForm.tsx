"use client";
import * as z from 'zod';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { jobTypes, locationTypes, skillList, jobCategoriesList } from "@/lib/job-types";
import { draftToMarkdown } from "markdown-draft-js";
import RichTextEditor from "@/components/RichTextEditor";
import { MultiSelect } from "@/components/MultiSelect";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function NewJobForm() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
      approved: false,
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
        // toast.success(data.success);
        setShowSuccessDialog(true);
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
                  <h3 className="font-semibold leading-7">Job Visibility</h3>
                  <p className="mt-1">{"Choose whether this job should be visible to job seekers or saved as a draft."}</p>
                </dt>
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0 md:w-2/3">
                  <FormField
                    control={form.control}
                    name="approved"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Job Status</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === 'true')}
                            value={field.value ? 'true' : 'false'}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Published (Visible to job seekers)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Draft (Not visible to job seekers)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
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
                <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
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
                        <FormDescription> Maximum 5000 characters </FormDescription>
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
                          <Input {...field} type="number" placeholder="eg. 1000" />
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
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="rounded-none">
          <DialogHeader className="space-y-5 py-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <DialogTitle className="font-clash tracking-widest text-xl text-green-500 font-semibold text-center">
              Job Posted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center text-neutrals-900 dark:text-neutrals-300">
              Your job has been successfully created.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"default"}
              onClick={() => setShowSuccessDialog(false)}
              className="w-full font-normal"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
