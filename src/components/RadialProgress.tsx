import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../utils/cn";

type RadialProgressProps = ComponentPropsWithRef<"div"> & {
  progress: number;
  direction?: "clockwise" | "anticloclwise";
  /**
   *to change color of track, use this props and set the text color
   */
  trackClassName?: string | undefined;
  /**
   *to change color of progress, use this props and set the text color
   */
  progressClassName?: string | undefined;
};

const RadialProgress = forwardRef<HTMLDivElement, RadialProgressProps>(
  (
    {
      className,
      progress,
      direction,
      trackClassName,
      progressClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative size-20", className)} ref={ref} {...props}>
        <svg
          className={cn(
            "size-full",
            direction === "clockwise" || direction === undefined
              ? "-rotate-90"
              : "rotate-180"
          )}
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*  Background Track Circle  */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={cn(
              "stroke-current text-gray-200 dark:text-neutral-700",
              trackClassName
            )}
            strokeWidth="4"
          ></circle>
          {/*  Progress Circle  */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={cn("stroke-current text-primary", progressClassName)}
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset={`${
              progress < 101 ? Math.abs(100 - progress) : 0
            }`}
            strokeLinecap="round"
          ></circle>
        </svg>
      </div>
    );
  }
);

export default RadialProgress;
