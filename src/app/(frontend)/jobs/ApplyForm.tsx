"use client";
import * as z from 'zod';
import { JobApplicationSchema } from "@/lib/validation/Job-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomLink from "@/components/ui/custom-link";
import { Job as PrismaJob } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"
import { ImSpinner8 } from "react-icons/im";
import { jobApplication } from "./action";
import { useForm } from "react-hook-form";
import { Paperclip } from "lucide-react";
import { toast } from "sonner";
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface JobWithUser extends PrismaJob {
  user?: {
    name: string | null;
    image: string | null;
  };
}

interface ApplyFormProps {
  job: JobWithUser;
}

function ApplyForm({ job }: ApplyFormProps) {
  
  const form = useForm<z.infer<typeof JobApplicationSchema>>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      currentJobTitle: "",
      linkedInURL: "",
      portfolioURL: "",
      additionalInfo: "",
      resumeAttachmentUrl: undefined,
      jobId: job.id,
      status: "In Review",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof JobApplicationSchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });
    try {
      const data = await jobApplication(formData);
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
    <section className="container py-10 flex items-center justify-center lg:py-20">
      <div className="sm:max-w-[41rem]">
        <div className="divide-y divide-neutrals-500">
          <p className="space-y-2 pt-6">
            <span className="text-xl font-bold block">Submit your application</span>
            <span className="block">The following is required and will only be shared with {job.user?.name}</span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 divide-y divide-neutrals-500">
            <div className="pt-6 space-y-6">
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your fullname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="currentJobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Current of previous job title</FormLabel>
                    <FormControl>
                      <Input placeholder="What’s your current or previous job title?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-6 space-y-6">
              <h3 className="text-xl font-bold">LINKS</h3>
              <FormField
                control={control}
                name="linkedInURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="Link to your LinkedIn URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="portfolioURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Portfolio URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="Link to your portfolio URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-6 space-y-6">
              <FormField
                control={control}
                name="additionalInfo"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full bg-transparent border-2 border-brand-secondary text-base p-4 focus:ring-brand-primary focus:border-brand-primary"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription> Maximum 500 characters </FormDescription>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="resumeAttachmentUrl"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem>
                    <div className="flex flex-col justify-between items-start space-y-2 sm:items-center sm:flex-row">
                      <FormLabel className="w-full text-base sm:w-3/5">Attach your resume</FormLabel>
                      <FormControl >
                        <Label className="w-full flex flex-col items-center justify-center h-16 border-2 border-brand-primary border-dashed rounded-lg cursor-pointer bg-neutrals-300 hover:neutrals-700 sm:w-2/5">
                          <div className="flex flex-row items-center justify-center space-x-4">
                            <Paperclip className="h-6 w-6 text-brand-primary" />
                            <p className="text-lg font-semibold text-neutrals-900">Attach Resume/CV</p>
                          </div>
                          <Input
                            id="dropzone-file"
                            {...fieldValues}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              fieldValues.onChange(file);
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
            </div>
            <div className="pt-6 w-full grid grid-cols-1 space-y-6">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit Application
              </Button>
              <p className="text-sm text-muted-foreground p-0">
                {"By sending the request you can confirm that you accept our"}{" "}
                <CustomLink
                  href="/terms"
                  className="text-brand-primary font-base"
                  textarea={'Terms of Service'}
                  divClassName="border-brand-primary border-b-2"
                />{" "}
                and{" "}
                <CustomLink
                  href="/privacy"
                  className="text-brand-primary font-base"
                  textarea={'Privacy Policy'}
                  divClassName="border-brand-primary border-b-2"
                />
                .
              </p>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default ApplyForm;
