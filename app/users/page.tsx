"use client";

import Link from "next/link";
import { useFormik } from "formik";
import StateHandler from "../services/core/utils/state_handler";
import ErrorLayout from "../components/ErrorLayout";
import LoadingLayout from "../components/LoadingLayout";
import { getAllUsers } from "../services/features/users/usecases/getAllUsers";

const UsersPage = () => {
  const queryResult = getAllUsers();

  const formik = useFormik({
    initialValues: {
      id: 0,
      price: 0,
      name: "",
      image: "",
      description: "",
    },
    onSubmit: async () => {},
  });

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
