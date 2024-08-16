import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const Signin = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Signin</PageTitle>
        <PageDescription className="text-muted-foreground max-w-lg">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem fuga.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <p>Signin</p>
      </PageBody>
    </Page>
  );
};

export default Signin;
