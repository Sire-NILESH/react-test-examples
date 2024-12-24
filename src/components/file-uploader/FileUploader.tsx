import { ComponentPropsWithRef, forwardRef } from "react";
import { cn } from "../../utils/cn";
import Button from "../Button";
import { Upload } from "lucide-react";
import RadialProgress from "../RadialProgress";
import { useFileUploader } from "./hooks/useFileUploader";
import { formatFileSize } from "../../utils/helpers";

type FileUploaderProps = ComponentPropsWithRef<"div"> & {
  url: string;
  className?: string;
  fileType?: string; // Optional file type restriction (e.g., "image/png")
  fileSizeLimit?: number; // Optional file size limit in bytes
};

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ url, className, fileType, fileSizeLimit, ...props }, ref) => {
    const {
      file,
      fileUploadStatus,
      fileUploadProgress,
      errorMessages,
      // resetFileUploader,
      uploadFile,
      handleFileChange,
    } = useFileUploader(url, fileType, fileSizeLimit);

    return (
      <>
        <div
          className={cn(
            "flex gap-2 max-w-2xl rounded-md border-2 border-input border-dashed bg-background px-3 py-4",
            className
          )}
          ref={ref}
          {...props}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept={fileType}
            className="w-full text-sm transition-colors p-1 file:inline-block file:w-24 file:my-1 file:mr-2 file:p-1 file:border-0 file:ring-1 active:file:scale-95 file:text-primary file:bg-transparent hover:file:bg-primary hover:file:text-primary-foreground file:text-sm file:font-medium file:rounded-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />

          <Button
            type={"button"}
            variant={"outline"}
            disabled={
              fileUploadStatus === "uploading" || errorMessages.length > 0
            }
            onClick={uploadFile}
          >
            {fileUploadStatus === "uploading" ? (
              <RadialProgress
                className={"size-4"}
                progress={fileUploadProgress}
              />
            ) : (
              <Upload className={"size-4"} />
            )}
          </Button>
        </div>

        <div className="mt-2 max-w-2xl px-3">
          {file && (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">Type : </span>
                  {file.type}
                </p>

                <p className="text-sm text-muted-foreground">
                  <span className="font-bold">Size : </span>
                  {formatFileSize(file.size)}
                </p>
              </>

              <div className="flex-col">
                {errorMessages.map((message, index) => (
                  <p key={index} className="text-sm text-red-500 font-bold">
                    {message}
                  </p>
                ))}
              </div>

              {fileUploadStatus === "error" && (
                <p className="text-sm text-red-500 font-bold">
                  Error uploading file
                </p>
              )}

              {fileUploadStatus === "success" && (
                <p className="text-sm text-green-600 font-bold">
                  Uploaded successfully
                </p>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
);

export default FileUploader;
