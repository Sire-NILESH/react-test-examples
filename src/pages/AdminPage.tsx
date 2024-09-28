import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const AdminPage = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Admin Page</PageTitle>
        <PageDescription>
          This page is a protected route which is only accessible for user with
          admin role.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <div className="mx-auto space-y-4 md:flex md:space-x-4 md:space-y-0">
          <p>This is super secret content 🤫</p>
        </div>
      </PageBody>
    </Page>
  );
};

export default AdminPage;
