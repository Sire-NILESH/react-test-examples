import React, { Suspense } from "react";
import Loading from "./Loading";

function withSuspense<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
): React.FC<T> {
  const ComponentWithSuspense: React.FC<T> = (props) => {
    return (
      <Suspense fallback={<Loading />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };

  return ComponentWithSuspense;
}
export default withSuspense;
