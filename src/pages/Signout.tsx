import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const Signout = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Signout</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem fuga.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <p>Signout</p>
      </PageBody>
    </Page>
  );
};

export default Signout;
