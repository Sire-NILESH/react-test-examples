import { useState, useRef } from "react";
import axios from "axios";

export type FileUploadStatus = "idle" | "uploading" | "error" | "success";

export function useFileUploader(url: string) {
  const [file, setFile] = useState<null | File>(null);
  const [fileUploadStatus, setFileUploadStatus] =
    useState<FileUploadStatus>("idle");
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const fileUploadReqRef = useRef<AbortController | null>(null);

  function resetFileUploader() {
    setFile(null);
    setFileUploadStatus("idle");
    setFileUploadProgress(0);
    fileUploadReqRef.current?.abort();
    fileUploadReqRef.current = null;
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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    resetFileUploader();
    if (e.target.files && e.target.files?.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  return {
    file,
    fileUploadStatus,
    fileUploadProgress,
    resetFileUploader,
    uploadFile,
    handleFileChange,
  };
}
