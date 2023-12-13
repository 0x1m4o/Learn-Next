"use client";

import StateHandler from "@/app/services/core/utils/state_handler";
import ErrorLayout from "@/app/components/ErrorLayout";
import LoadingLayout from "@/app/components/LoadingLayout";
import { UseGetSingleUser } from "@/app/services/features/users/usecases/getUser";

export default function UserDetail({ params }: { params: { slug: string } }) {
  const queryResult = UseGetSingleUser(params.slug);
  const errorLayout = ErrorLayout();
  const loadingLayout = LoadingLayout();
  const successLayout = <div>Success {queryResult.data?.name}</div>;
  return (
    <>
      <h1>{params.slug}</h1>
      <StateHandler
        status={queryResult.status}
        successLayout={successLayout}
        errorLayout={errorLayout}
        loadingLayout={loadingLayout}
      ></StateHandler>
    </>
  );
}
