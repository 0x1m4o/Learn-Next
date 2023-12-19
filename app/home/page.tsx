"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { UseGetUser } from "../services/features/users/usecases/getUser";
import { toast } from "react-toastify";
import LoadingLayout from "../components/LoadingLayout";
import ProfileCard from "../components/ProfileCard";

const HomePage = () => {
  const router = useRouter();
  const queryResult = UseGetUser();

  useEffect(() => {
    let isAuthenticated = false;
    const data = localStorage.getItem("auth");

    if (data) {
      isAuthenticated = true;
    }

    if (!isAuthenticated && !queryResult.isLoading) {
      toast.error("Mohon Login Terlebih Dahulu", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      router.push("/login", { scroll: false });
    }
  }, [router, queryResult.isLoading]);

  if (queryResult.isLoading) {
    return <LoadingLayout />;
  } else if (queryResult.isError) {
    return <div>{queryResult.error.message}</div>;
  }
  return (
    <Suspense fallback={<p>Loading Data...</p>}>
      <div className="content container d-flex align-items-center justify-content-center">
        <ProfileCard user={queryResult?.data ?? null} />
      </div>
    </Suspense>
  );
};

export default HomePage;
