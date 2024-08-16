import { ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "../utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

type SlideDirection = "left" | "right";

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSlider = (slideDirection: SlideDirection) => {
    if (!sliderRef || !sliderRef.current) return;

    const { clientWidth, scrollLeft } = sliderRef.current;
    const scrollAmount =
      slideDirection === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    sliderRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <Page>
      <PageHeader>
        <PageTitle>Slider component</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          A demonstration of a slider component.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <div className="relative">
          <div
            ref={sliderRef}
            className="mx-10 h-56 flex items-center space-x-4 overflow-x-auto bg-secondary p-4 rounded-md"
          >
            <ChevronButton
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => handleSlider("left")}
            >
              <ChevronLeft className="size-8" />
            </ChevronButton>

            {Array.from({ length: 30 }).map((_item, i) => (
              <figure
                key={i}
                className="min-w-36 h-full bg-white flex items-center justify-center rounded-lg text-black"
              >
                {i + 1}
              </figure>
            ))}

            <ChevronButton
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => handleSlider("right")}
            >
              <ChevronRight className="size-8" />
            </ChevronButton>
          </div>
        </div>
      </PageBody>
    </Page>
  );
};

export default Slider;

interface ChevronButtonProps extends ComponentPropsWithoutRef<"button"> {}

function ChevronButton({ className, children, ...props }: ChevronButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full bg-white hover:bg-gray-100 text-black min-w-12 h-12 flex items-center justify-center shadow active:scale-95 transition-transform duration-100 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
