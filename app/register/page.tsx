"use client";

import {
  faAt,
  faCircleUser,
  faCity,
  faFlag,
  faBriefcase,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import InputForm from "../components/InputForm";
import { useFormik } from "formik";
import { registerSchema } from "../services/core/utils/validations/register_validation_schema";
import { ToastContainer, toast } from "react-toastify";
import { PostUserData } from "../services/features/auth/usecases/postUser";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const initialValues = {
    username: "najjrnfajfrnjarajn",
    fullname: "najjrnfajfrnjarajn",
    city: "najjrnfajfrnjarajn",
    country: "najjrnfajfrnjarajn",
    job: "najjrnfajfrnjarajn",
    password: "najjrnfajfrnjarajn",
    confirmpassword: "najjrnfajfrnjarajn",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        const { confirmpassword, ...rest } = JSON.parse(JSON.stringify(values));
        createUser(rest);
      } catch (error) {
        setError("Failed to create user");
      }
    },
  });

  const inputFormData = [
    {
      title: "Username",
      name: "username",
      icon: faCircleUser,
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
      toast.success(data, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      router.push(`/login?username=${formik.values.username}`);
    },
    onError: (data: any) => {
      console.log("error", data);
      toast.error(`${data.response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    },
  });
  return (
    <>
      <ToastContainer />
      {error ? (
        <div>Error</div>
      ) : (
        <div className="container h-100 p-5 rounded-3">
          {createUserPending && (
            <div className="spinner-container">
              <div className="spinner-overlay"></div>
              <div className="spinner">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}
          <Suspense fallback={<p>Loading Data...</p>}>
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
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
              >
                Submit
              </button>
            </form>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
