import { Eye, EyeOff } from "lucide-react";
import React, { useMemo, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  Page,
  PageBody,
  PageDescription,
  PageHeader,
  PageTitle,
} from "../components/Page";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import useDebounceValue from "../hooks/useDebounceValue";
import {
  authErrorSelector,
  authIsLoadingSelector,
  loginUser,
} from "../store/authSlice";
import { isValidEmail, isValidPassword } from "../utils/validators";

type IsTouchedType = {
  emailField: boolean;
  passwordField: boolean;
};

const isTouchedInitialState: IsTouchedType = {
  emailField: false,
  passwordField: false,
};

const Login = () => {
  // Redux Auth slice states
  const userIsLoading = useAppSelector(authIsLoadingSelector);
  const userError = useAppSelector(authErrorSelector);

  const dispatch = useAppDispatch();

  // Form input fields
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [adminPrivilege, setAdminPrivilege] = useState<boolean>(false);

  // Debounce the inputs
  const { debounced: debouncedUserEmail } = useDebounceValue(userEmail);
  const { debounced: debouncedUserPassword } = useDebounceValue(userPassword);

  // Validate debounced inputs
  const { validUserEmail, validUserPassword } = useMemo(
    () => ({
      validUserEmail: isValidEmail(debouncedUserEmail),
      validUserPassword: isValidPassword(debouncedUserPassword),
    }),
    [debouncedUserEmail, debouncedUserPassword]
  );

  // Form Controls
  const [isTouched, setIsTouched] = useState<IsTouchedType>(
    isTouchedInitialState
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form handling
  const handleBlur = (field: keyof IsTouchedType) => {
    setIsTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleShowPassowrd = () => setShowPassword((prev) => !prev);

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //  Login logic ...
    if (userEmail && userPassword && validUserEmail && validUserPassword) {
      // a dummy user login
      await dispatch(
        loginUser({ email: userEmail, grantAdminPrivilege: adminPrivilege })
      );

      // reset fields
      setUserEmail("");
      setUserPassword("");
      setIsTouched(isTouchedInitialState);
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
              onBlur={() => handleBlur("emailField")}
              onChange={(e) => setUserEmail(e.target.value)}
              error={
                isTouched.emailField && !validUserEmail
                  ? "Please enter a valid user email"
                  : undefined
              }
              className="mt-2"
              placeholder="email@example.com"
            />
          </div>

          <div className="">
            <div className="flex items-end justify-between">
              <label htmlFor="user-password">Password</label>
              <Button
                type="button"
                onClick={handleShowPassowrd}
                variant={"ghost"}
              >
                {showPassword ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeOff className="size-4" />
                )}
              </Button>
            </div>

            <Input
              name="user-password"
              type={showPassword ? "text" : "password"}
              value={userPassword}
              onBlur={() => handleBlur("passwordField")}
              onChange={(e) => setUserPassword(e.target.value)}
              error={
                isTouched.passwordField && !validUserPassword
                  ? "Password must only be 6 characters long and must atleast contain 1 uppercase, lowercase, number and a special charater (!@#$...)"
                  : undefined
              }
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
