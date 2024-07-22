import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

type LightState = "red" | "green" | "yellow" | "orange";

interface TrafficState {
  light: LightState;
  colorHex: string;
  time: number;
}

const trafficStates: TrafficState[] = [
  {
    light: "red",
    colorHex: "#dc2626",
    time: 4000,
  },
  {
    light: "yellow",
    colorHex: "#ca8a04",
    time: 500,
  },
  // {
  //   light: "orange",
  //   colorHex: "#ea580c",
  //   time: 500,
  // },
  {
    light: "green",
    colorHex: "#16a34a",
    time: 3000,
  },
];

const TrafficLight = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrent((prev) => (prev < trafficStates.length - 1 ? prev + 1 : 0));
    }, trafficStates[current].time);

    return () => {
      clearTimeout(timerId);
    };
  }, [current]);

  return (
    <div className="mx-auto container p-2">
      <header className="mt-10 sm:mt-0 mb-10">
        <h2 className="font-semibold text-lg">Traffic light</h2>
        <p className="text-muted-foreground max-w-lg">
          A demonstration of a traffic light component that changes light
          signals as{" "}
          {trafficStates
            .map((state) => `${state.light} for ${state.time} ms`)
            .join(", ")}
        </p>
      </header>

      <figure className="mt-24 w-36 p-4 bg-black text-white border border-1 border-border rounded-lg space-y-4 text-center">
        <h4 className="text-sm uppercase">Traffic Light</h4>

        <div className="flex flex-col items-center space-y-4">
          {trafficStates.map((trafficState, i) => (
            <TrafficLightBulb
              key={i}
              style={{
                backgroundColor:
                  trafficStates[current].light === trafficState.light
                    ? trafficState.colorHex
                    : "transparent",
                borderColor:
                  trafficStates[current].light === trafficState.light
                    ? trafficState.colorHex
                    : undefined,
              }}
            />
          ))}
        </div>
      </figure>
    </div>
  );
};

export default TrafficLight;

interface TrafficLightBulbProps extends React.HTMLAttributes<HTMLDivElement> {}

function TrafficLightBulb({ className, ...props }: TrafficLightBulbProps) {
  return (
    <div
      className={cn("border border-gray-600 rounded-full size-20", className)}
      {...props}
    />
  );
}
