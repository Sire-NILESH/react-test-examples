import { PropsWithChildren } from "react";
import ReduxTKProvider from "./ReduxTKProvider";
import TanStackQueryProvider from "./TanStackQueryProvider";

interface Props extends PropsWithChildren {}

const Providers = ({ children }: Props) => {
  return (
    <ReduxTKProvider>
      <TanStackQueryProvider>{children}</TanStackQueryProvider>
    </ReduxTKProvider>
  );
};

export default Providers;
