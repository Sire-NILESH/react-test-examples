import React from "react";

const Counter = () => {
  const [counter, setCounter] = React.useState(0);
  // solving the unnecessary re-rendering by memoising the function that will be passed to the child component
  const fn = React.useCallback(() => {}, []);
  return (
    <div className="space-y-4 mt-10 sm:mt-0">
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
      <DemoChildComponent demoFn={fn} />
    </div>
  );
};

export default Counter;

interface DemoChildComponentProps {
  demoFn: () => void;
}

// To optimize performance, memoize the child component and also the 'demoFn' function prop that it receives.
const DemoChildComponent = React.memo(({ demoFn }: DemoChildComponentProps) => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return (
    <div className="bg-secondary p-4 rounded-md w-80 space-y-2">
      <p className="font-bold">Will I re-render? Optimise me</p>
      <p>I re-rendered {counter} times</p>
      <p className="text-muted-foreground">PS: Strict mode is on</p>
    </div>
  );
});
