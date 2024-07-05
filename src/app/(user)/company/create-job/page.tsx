import { Metadata } from "next";
import { NewJobForm } from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
};

interface Props { }

function CreateJobPage({ }: Props) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold font-clash tracking-wider md:text-2xl">Post a Job</h1>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col gap-1">
          <NewJobForm />
        </div>
      </div>
    </main>
  )
}

export default CreateJobPage