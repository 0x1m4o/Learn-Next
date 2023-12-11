"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StateHandler from "../utils/StateBuilder";

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

const UsersPage = () => {
  const getUser = async () =>
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data);

  const queryResult = useQuery<Users[]>({
    queryKey: ["users"],
    queryFn: getUser,
  });

  const successLayout = (
    <ul>
      {queryResult.data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );

  const loadingLayout = <div>Loading...</div>;

  const errorLayout = <div>Request Failed</div>;

  return (
    <>
      <h1>Users Page</h1>
      <StateHandler
        status={queryResult.status}
        success={successLayout}
        error={errorLayout}
        loading={loadingLayout}
      ></StateHandler>
    </>
  );
};

export default UsersPage;
