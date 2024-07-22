import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { CirclePause, CirclePlay, TimerReset } from "lucide-react";

type StopWatchState = "play" | "pause" | "reset";

const StopWatch = () => {
  const [stopWatchState, setStopWatchState] = useState<StopWatchState>("pause");

  function stopWatchStateHandler(state: StopWatchState) {
    if (state !== stopWatchState) setStopWatchState(state);
  }
  return (
    <div className="mx-auto container p-2">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">Stop Watch</h2>
        <p className="text-muted-foreground">
          A demonstration of a stop watch component
        </p>
      </header>

      <div className="max-w-md flex flex-col items-center bg-secondary p-4 rounded-md">
        <Watch stopWatchState={stopWatchState} />
        <Actions
          stopWatchState={stopWatchState}
          stopWatchStateHandler={stopWatchStateHandler}
        />
      </div>
    </div>
  );
};

export default StopWatch;

interface WatchProps {
  className?: string;
  stopWatchState: StopWatchState;
}

function Watch({ className, stopWatchState }: WatchProps) {
  const [watchTimer, setWatchTimer] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (stopWatchState === "play") {
      timerRef.current = setInterval(function () {
        setWatchTimer((prevWatchTime) => (prevWatchTime += 10));
      }, 10);
    } else if (stopWatchState === "pause") {
      if (!timerRef.current) return;

      clearInterval(timerRef.current);
    } else if (stopWatchState === "reset") {
      if (!timerRef.current) return;

      clearInterval(timerRef.current);
      setWatchTimer(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stopWatchState]);

  return (
    <div
      className={cn(
        "min-h-32 flex items-center justify-center text-5xl font-bold",
        className
      )}
    >
      <span className="">
        {("0" + Math.floor((watchTimer / 60000) % 60)).slice(-2)}:
      </span>
      <span className="">
        {("0" + Math.floor((watchTimer / 1000) % 60)).slice(-2)}:
      </span>
      <span className="">{("0" + ((watchTimer / 10) % 100)).slice(-2)}</span>
    </div>
  );
}

interface ActionsProps {
  className?: string;
  stopWatchState: StopWatchState;
  stopWatchStateHandler: (state: StopWatchState) => void;
}

function Actions({
  className,
  stopWatchState,
  stopWatchStateHandler,
}: ActionsProps) {
  return (
    <div className={cn("flex items-center space-x-5", className)}>
      <Button
        className={cn(
          "flex items-center space-x-2",
          stopWatchState === "play" ? "pointer-events-none" : ""
        )}
        disabled={stopWatchState === "play"}
        onClick={() => stopWatchStateHandler("play")}
      >
        <CirclePlay className="size-10" />
        <p className="text-xl">Play</p>
      </Button>
      <Button
        className={cn(
          "flex items-center space-x-2",
          stopWatchState === "pause" ? "pointer-events-none" : ""
        )}
        disabled={stopWatchState === "pause"}
        onClick={() => stopWatchStateHandler("pause")}
      >
        <CirclePause className="size-10" />
        <p className="text-xl">Pause</p>
      </Button>
      <Button
        className={cn(
          "flex items-center space-x-2",
          stopWatchState === "reset" ? "pointer-events-none" : ""
        )}
        disabled={stopWatchState === "reset"}
        onClick={() => stopWatchStateHandler("reset")}
      >
        <TimerReset className="size-10" />
        <p className="text-xl">Reset</p>
      </Button>
    </div>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

function Button({ className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "active:scale-95 transition-transform duration-100 ease-in-out",
        className,
        disabled ? "opacity-50" : "opacity-100"
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
