"use client";

import {
  faAt,
  faCity,
  faFlag,
  faBriefcase,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import InputForm from "../components/InputForm";
import { useFormik } from "formik";
import { registerSchema } from "../services/core/utils/validations/register_validation_schema";
import { toast } from "react-toastify";
import { PostUserData } from "../services/features/auth/usecases/postUser";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
const RegisterPage = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const router = useRouter();

  const initialValues = {
    username: "",
    fullname: "",
    city: "",
    country: "",
    job: "",
    password: "",
    confirmpassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { confirmpassword, ...rest } = JSON.parse(JSON.stringify(values));
      createUser(rest);
    },
  });

  const inputFormData = [
    {
      title: "Username",
      name: "username",
      icon: faAt,
      value: formik.values.username,
      error: formik.errors.username,
    },
    {
      title: "Full Name",
      name: "fullname",
      icon: faAt,
      value: formik.values.fullname,
      error: formik.errors.fullname,
    },
    {
      title: "City",
      name: "city",
      icon: faCity,
      value: formik.values.city,
      error: formik.errors.city,
    },
    {
      title: "Country",
      name: "country",
      icon: faFlag,
      value: formik.values.country,
      error: formik.errors.country,
    },
    {
      title: "Job",
      name: "job",
      icon: faBriefcase,
      value: formik.values.job,
      error: formik.errors.job,
    },
    {
      title: "Password",
      name: "password",
      icon: faLock,
      value: formik.values.password,
      error: formik.errors.password,
    },
    {
      title: "Confirm Password",
      name: "confirmpassword",
      icon: faLock,
      value: formik.values.confirmpassword,
      error: formik.errors.confirmpassword,
    },
  ];

  const { mutate: createUser, isPending: createUserPending } = PostUserData({
    onSuccess: (data: any) => {
      toast.success(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      router.push(`/login?username=${formik.values.username}`, {
        scroll: false,
      });
    },
    onError: (data: any) => {
      console.log("error", data.response.data.error);
      toast.error(`${data.response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    },
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      setisAuthenticated(true);
    }
    if (isAuthenticated) {
      router.push("/home", { scroll: false });
    }
  }, [isAuthenticated]);
  return (
    <>
      <Suspense fallback={<p>Loading Data...</p>}>
        <div className="container h-100 p-5 rounded-3">
          <h1 className="display-4 fw-bold">Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            {inputFormData.map((data) => (
              <InputForm
                onChangeHandler={formik.handleChange}
                title={data["title"]}
                icon={data["icon"]}
                value={data["value"]}
                id={data["name"]}
                name={data["name"]}
                errors={data["error"]}
                key={data["name"]}
              />
            ))}
            <Button isPending={createUserPending}></Button>
          </form>
        </div>
      </Suspense>
    </>
  );
};

export default RegisterPage;
