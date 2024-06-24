import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputFrontProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputFront = React.forwardRef<HTMLInputElement, InputFrontProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-14 border-b-2 border-b-neutrals-500 bg-transparent px-3 text-sm ring-offset-background file:border-b-0 file:bg-transparent file:text-base file:font-medium placeholder:text-base placeholder:text-neutrals-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
InputFront.displayName = "InputFront";

export { InputFront };
