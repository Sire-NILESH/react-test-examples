import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../utils/cn";

type Props = ComponentPropsWithRef<"input"> & {};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2 border border-border rounded-full bg-secondary",
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
