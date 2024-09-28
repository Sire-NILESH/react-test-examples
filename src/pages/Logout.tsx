import Button from "../components/Button";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  authErrorSelector,
  authIsLoadingSelector,
  logoutUser,
} from "../store/authSlice";

const Logout = () => {
  const userIsLoading = useAppSelector(authIsLoadingSelector);
  const userError = useAppSelector(authErrorSelector);

  const dispatch = useAppDispatch();

  function logoutHandler() {
    dispatch(logoutUser());
  }
  return (
    <Page>
      <PageHeader>
        <PageTitle>Logout</PageTitle>
        <PageDescription>Logout with a simple click below</PageDescription>
      </PageHeader>

      <PageBody>
        <Button
          onClick={logoutHandler}
          disabled={userIsLoading}
          className="min-w-24"
        >
          {userIsLoading ? "loading..." : "Logout"}

          <p className="mt-4 text-red-500">{userError?.message}</p>
        </Button>
      </PageBody>
    </Page>
  );
};

export default Logout;
