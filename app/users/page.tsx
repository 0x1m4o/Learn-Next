"use client";

import StateHandler from "../utils/state_handler";
import Link from "next/link";
import { getAllUsers } from "../usecases/features/users/getAllUsers";
import LoadingLayout from "../components/LoadingLayout";
import ErrorLayout from "../components/ErrorLayout";

const UsersPage = () => {
  const queryResult = getAllUsers();

  const successLayout = (
    <ul>
      {queryResult.data?.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
  const loadingLayout = LoadingLayout();
  const errorLayout = ErrorLayout();

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
