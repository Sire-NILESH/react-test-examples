export const throttleFn = (func: Function, limit: number) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  return (...args: any[]) => {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export function formatFileSize(bytes: number) {
  if (typeof bytes !== "number" || bytes < 0) {
    throw new Error("Input must be a non-negative number.");
  }

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  let index = 0;

  while (bytes >= 1024 && index < sizes.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${sizes[index]}`;
}
