import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const Pointer = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Pointer</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem fuga.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <p>Pointer</p>
      </PageBody>
    </Page>
  );
};

export default Pointer;
