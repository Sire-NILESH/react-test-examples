import React from "react";

interface NeumorphicComponentProps extends React.CSSProperties {}

// incomplete
function withNeumorphicStyle<T>(
  WrappedComponent: React.ComponentType<T & NeumorphicComponentProps>
) {
  const ComponentWithNeumorphicStyle = (props: T) => {
    return <WrappedComponent {...props} style={{}}></WrappedComponent>;
  };

  return ComponentWithNeumorphicStyle;
}

export default withNeumorphicStyle;
