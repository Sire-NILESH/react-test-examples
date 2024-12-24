import { useState, useRef } from "react";
import axios from "axios";
import { formatFileSize } from "../../../utils/helpers";

type FileUploadStatus = "idle" | "uploading" | "error" | "success";

export function useFileUploader(
  url: string,
  fileType?: string, // Comma-separated string of valid MIME types
  fileSizeLimit: number = 2 * 1024 * 1024 // Default to 2 MB
) {
  const [file, setFile] = useState<null | File>(null);
  const [fileUploadStatus, setFileUploadStatus] =
    useState<FileUploadStatus>("idle");
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const fileUploadReqRef = useRef<AbortController | null>(null);

  function resetFileUploader() {
    setFile(null);
    setFileUploadStatus("idle");
    setFileUploadProgress(0);
    setErrorMessages([]);
    fileUploadReqRef.current?.abort();
    fileUploadReqRef.current = null;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    resetFileUploader();
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const errors: string[] = [];

    if (fileType) {
      const allowedTypes = fileType.split(",").map((type) => type.trim());
      if (!allowedTypes.includes(selectedFile.type)) {
        errors.push(`File type must be one of: ${fileType}`);
      }
    }

    if (selectedFile.size > fileSizeLimit) {
      errors.push(`File size must not exceed ${formatFileSize(fileSizeLimit)}`);
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
    }

    setFile(selectedFile);
  }

  async function uploadFile() {
    if (!file) return;

    fileUploadReqRef.current = new AbortController();
    setFileUploadStatus("uploading");
    setFileUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setFileUploadProgress(progress);
        },
        signal: fileUploadReqRef.current.signal,
      });

      setFileUploadStatus("success");
      setFileUploadProgress(100);
    } catch (error) {
      if (axios.isCancel(error)) {
        setFileUploadStatus("idle");
      } else {
        setFileUploadStatus("error");
      }
      setFileUploadProgress(0);
    } finally {
      fileUploadReqRef.current = null;
    }
  }

  return {
    file,
    fileUploadStatus,
    fileUploadProgress,
    errorMessages,
    resetFileUploader,
    uploadFile,
    handleFileChange,
  };
}
