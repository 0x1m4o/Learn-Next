import React, { useEffect } from "react";
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

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data: Users[] = await res.json();
  return data;
}

const UsersPage = async () => {
  const data = await getUsers();
  return (
    <>
      <h1>Users Page</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <h1>Error</h1>
      )}
    </>
  );
};

export default UsersPage;
