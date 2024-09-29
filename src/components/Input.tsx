import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../utils/cn";

type Props = ComponentPropsWithRef<"input"> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2 border border-border rounded-full bg-secondary",
            error && "outline outline-1 outline-red-500",
            className
          )}
          {...props}
        />

        {<span className="!text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

export default Input;
