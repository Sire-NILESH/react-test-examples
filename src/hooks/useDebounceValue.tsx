import { useEffect, useState } from "react";

const useDebounceValue = <T,>(value: T, delayMs: number = 500) => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [value, delayMs]);

  return { debounced };
};

export default useDebounceValue;
