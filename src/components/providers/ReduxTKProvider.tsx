import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../../store/store";

interface Props extends PropsWithChildren {}

const ReduxTKProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxTKProvider;
