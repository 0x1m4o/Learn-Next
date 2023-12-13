import React from "react";

interface StateHandlerProps {
  errorLayout: React.ReactNode;
  loadingLayout: React.ReactNode;
  successLayout: React.ReactNode;
  status: "error" | "success" | "pending";
}
const StateHandler = ({
  errorLayout,
  loadingLayout,
  successLayout,
  status,
}: StateHandlerProps) => {
  if (status === "pending") return <>{loadingLayout}</>;
  if (status === "error") return <>{errorLayout}</>;
  if (status === "success") return <>{successLayout}</>;
  return <div>Unknown...</div>;
};

export default StateHandler;
