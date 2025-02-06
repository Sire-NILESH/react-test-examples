type Props = {
  message?: string;
};

const ErrorComponent = ({ message }: Props) => {
  return <div>{message ? message : "Error! something went wrong 😭"}</div>;
};

export default ErrorComponent;
