import React, { ComponentProps } from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { cn } from "../utils/cn";

const CounterPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Counter and performance</PageTitle>
        <PageDescription>
          The card is a child component of the counter component takes takes a
          function as a prop. <br />
          Make sure that it does not re render on every counter change.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <Counter />
      </PageBody>
    </Page>
  );
};

export default CounterPage;

const Counter = () => {
  const [counter, setCounter] = React.useState(0);
  // solving the unnecessary re-rendering by memoising the function that will be passed to the child component
  const fn = React.useCallback(() => {}, []);
  return (
    <>
      <div className="flex items-center space-x-4">
        <p className="border-b border-border px-2 py-1">Counter {counter}</p>
        <button
          className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded-sm"
          onClick={() => setCounter((prev) => prev + 1)}
        >
          Counter +
        </button>
      </div>

      {/* this child compo takes a function as prop that will cause it to re render even if the component is memoised */}
      <DemoChildComponent className="mt-10" noUsedemoFn={fn} />
    </>
  );
};

interface DemoChildComponentProps extends ComponentProps<"div"> {
  noUsedemoFn: () => void;
}

// To optimize performance, memoize the child component and also the 'demoFn' function prop that it receives.
const DemoChildComponent = React.memo(
  ({ noUsedemoFn, className, ...props }: DemoChildComponentProps) => {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
      setCounter((prev) => prev + 1);
    }, []);

    return (
      <div
        className={cn("bg-secondary p-4 rounded-md w-80 space-y-2", className)}
        {...props}
      >
        <p className="font-bold">Will I re-render? Optimise me</p>
        <p>I re-rendered {counter} times</p>
        <p className="text-muted-foreground">PS: Strict mode is on</p>
      </div>
    );
  }
);
