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
