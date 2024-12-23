import { Upload } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import Button from "../Button";
import RadialProgress from "../RadialProgress";
import { useFileUploader } from "./hooks/useFileUploader";

type FileUploaderProps = {
  url: string;
  className?: string;
};

const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ url, className }, ref) => {
    const {
      file,
      fileUploadStatus,
      fileUploadProgress,
      uploadFile,
      handleFileChange,
    } = useFileUploader(url);

    return (
      <>
        <div
          className={cn(
            "flex gap-2 max-w-2xl rounded-md border-2 border-input border-dashed bg-background px-3 py-4",
            className
          )}
          ref={ref}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm transition-colors p-1 file:inline-block file:w-24 file:my-1 file:mr-2 file:p-1 file:border-0 file:ring-1 active:file:scale-95 file:text-primary file:bg-transparent hover:file:bg-primary hover:file:text-primary-foreground file:text-sm file:font-medium file:rounded-full  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />

          <Button
            type={"button"}
            variant={"outline"}
            disabled={fileUploadStatus === "uploading"}
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

        {file && (
          <div className="mt-2 ml-3 flex flex-wrap gap-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold">Type : </span>
              {file.type}
            </p>

            <p className="text-sm text-muted-foreground">
              <span className="font-bold">Size : </span>
              {(file.size / 1024).toFixed(2)} KB
            </p>

            {fileUploadStatus === "error" ? (
              <p className="text-sm text-red-500 font-bold">Error uploading</p>
            ) : fileUploadStatus === "success" ? (
              <p className="text-sm text-green-600 font-bold">
                Uploaded successfully
              </p>
            ) : null}
          </div>
        )}
      </>
    );
  }
);

export default FileUploader;
