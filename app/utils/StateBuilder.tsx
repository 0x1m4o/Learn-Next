import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

interface StateHandlerProps {
  error: React.ReactNode;
  loading: React.ReactNode;
  success: React.ReactNode;
  status: "error" | "success" | "pending";
}
const StateHandler = ({
  error,
  loading,
  success,
  status,
}: StateHandlerProps) => {
  if (status === "pending") return <>{loading}</>;
  if (status === "error") return <>{error}</>;
  if (status === "success") return <>{success}</>;
  return <div>Unknown...</div>;
};

export default StateHandler;
