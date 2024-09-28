import React, { useState } from "react";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  authErrorSelector,
  authIsLoadingSelector,
  loginUser,
} from "../store/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Login = () => {
  const userIsLoading = useAppSelector(authIsLoadingSelector);
  const userError = useAppSelector(authErrorSelector);
  const dispatch = useAppDispatch();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [adminPrivilege, setAdminPrivilege] = useState<boolean>(false);

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //  Login logic ...
    if (userEmail && userPassword) {
      // a dummy user login
      await dispatch(
        loginUser({ email: userEmail, grantAdminPrivilege: adminPrivilege })
      );

      // reset fields
      setUserEmail("");
      setUserPassword("");
    }
  }

  return (
    <Page>
      <PageHeader>
        <PageTitle>Login</PageTitle>
        <PageDescription>
          Login in with any email address and password and it will be accepted,
          it's only a dummy login.
        </PageDescription>
      </PageHeader>

      <PageBody>
        <form className="max-w-md space-y-5" onSubmit={onSubmitHandler}>
          <div className="">
            <label htmlFor="user-email">Email</label>

            <Input
              name="user-email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-2"
              placeholder="email@example.com"
            />
          </div>

          <div className="">
            <label htmlFor="user-password">Password</label>

            <Input
              name="user-password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="mt-2"
              placeholder="******"
            />
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <Input
              name="user-admin-privilege"
              type="checkbox"
              checked={adminPrivilege}
              onChange={() => setAdminPrivilege((prev) => !prev)}
              className="size-4"
              placeholder="******"
            />

            <label className="inline-block" htmlFor="user-admin-privilege">
              Grant Admin privilege (Just for demo)
            </label>
          </div>

          <Button type="submit" disabled={userIsLoading} className="min-w-24">
            {userIsLoading ? "loading..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-red-500">{userError?.message}</p>
      </PageBody>
    </Page>
  );
};

export default Login;
