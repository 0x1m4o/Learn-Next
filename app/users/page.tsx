"use client";

import Link from "next/link";
import StateHandler from "../services/core/utils/state_handler";
import ErrorLayout from "../components/ErrorLayout";
import LoadingLayout from "../components/LoadingLayout";
import { GetAllUsers } from "../services/features/users/usecases/getAllUsers";

const UsersPage = () => {
  const queryResult = GetAllUsers();

  const loadingLayout = LoadingLayout();
  const errorLayout = ErrorLayout();
  const successLayout = (
    <ul>
      {queryResult.data?.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <h1>Users Page</h1>
      <StateHandler
        status={queryResult.status}
        successLayout={successLayout}
        errorLayout={errorLayout}
        loadingLayout={loadingLayout}
      ></StateHandler>
    </>
  );
};

export default UsersPage;
