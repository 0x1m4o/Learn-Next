"use client";
import { FormikErrors, useFormik } from "formik";
import { registerSchema } from "../services/core/utils/validations/register_validation_schema";
import { toast } from "react-toastify";
import {
  faAt,
  faCircleUser,
  faCity,
  faFlag,
  faBriefcase,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import InputForm from "../components/InputForm";

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      city: "",
      country: "",
      job: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const inputFormData = [
    {
      title: "Full Name",
      name: "fullname",
      icon: faAt,
      value: formik.values.fullname,
      error: formik.errors.fullname,
    },
    {
      title: "Username",
      name: "username",
      icon: faCircleUser,
      value: formik.values.username,
      error: formik.errors.username,
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
  return (
    <>
      <div className="container position-absolute top-50 start-50 translate-middle p-5 rounded-3">
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
      </div>
    </>
  );
};

export default RegisterPage;
