import FileUploader from "../components/file-uploader/FileUploader";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const FileUploaderPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>File Uploader</PageTitle>
        <PageDescription>
          A simple file uploader demo, it does not actually uploads anything and
          uses a mock server.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <FileUploader
          url={"https://httpbin.org/post"}
          fileType="image/png, image/jpeg, image/jpg"
          fileSizeLimit={1 * 1024 * 1024} // 1 MB
          className="my-custom-class"
        />
      </PageBody>
    </Page>
  );
};

export default FileUploaderPage;
