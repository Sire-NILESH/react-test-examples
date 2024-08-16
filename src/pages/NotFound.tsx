import { Link } from "react-router-dom";
import Button from "../components/Button";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";

const NotFound = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>404 Not Found</PageTitle>
        <PageDescription>
          The Page you were looking for does not exist 😭.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <Link to={"/"}>
          <Button variant={"default"}>
            <p>Take me Home</p>
          </Button>
        </Link>
      </PageBody>
    </Page>
  );
};

export default NotFound;
