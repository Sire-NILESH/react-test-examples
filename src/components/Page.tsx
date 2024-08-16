import { ComponentProps, forwardRef } from "react";
import { cn } from "../utils/cn";

interface PageProps extends ComponentProps<"div"> {}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto container p-2", className)}
      {...props}
    />
  )
);
Page.displayName = "Page";

interface PageHeaderProps extends ComponentProps<"div"> {}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("mt-10 sm:mt-0 mb-10", className)}
      {...props}
    />
  )
);
PageHeader.displayName = "PageHeader";

interface PageTitleProps extends ComponentProps<"h2"> {}

const PageTitle = forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2 ref={ref} className={cn("font-semibold text-lg", className)} {...props}>
      {children}
    </h2>
  )
);
PageTitle.displayName = "PageTitle";

interface PageDescriptionProps extends ComponentProps<"p"> {}

const PageDescription = forwardRef<HTMLParagraphElement, PageDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-muted-foreground max-w-lg", className)}
      {...props}
    />
  )
);
PageDescription.displayName = "PageDescription";

interface PageBodyProps extends ComponentProps<"div"> {}

const PageBody = forwardRef<HTMLDivElement, PageBodyProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
PageBody.displayName = "PageBody";

interface PageFooterProps extends ComponentProps<"div"> {}

const PageFooter = forwardRef<HTMLDivElement, PageFooterProps>(
  ({ className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn("mt-10 sm:mt-0 mb-10", className)}
      {...props}
    />
  )
);
PageFooter.displayName = "PageFooter";

export { Page, PageBody, PageDescription, PageFooter, PageHeader, PageTitle };
