import { CircleXIcon } from "lucide-react";
import { Fragment } from "react";

interface FormErrorProps {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <Fragment>
      <div
        className="inline-flex rounded-lg bg-red-100 w-full px-[18px] py-3 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]"
      >
        <p className="flex items-center text-sm font-medium text-red-800">
          <span
            className="mr-3 flex h-6 w-6 items-center text-white justify-center rounded-lg bg-red-900"
          >
            <CircleXIcon className="w-3 h-3" />
          </span>
          {message}
        </p>
      </div>
    </Fragment>
  )
};