"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  if (username) {
    return <div>{username}</div>;
  }
  return <div>LoginPage</div>;
};

export default LoginPage;
