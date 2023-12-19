"use client";
import { faAt, faLock } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { loginSchema } from "../services/core/utils/validations/login_validation_schema";
import { toast } from "react-toastify";
import { LoginUserData } from "../services/features/auth/usecases/loginUser";
import { useRouter } from "next/navigation";
import InputForm from "../components/InputForm";
import Button from "../components/Button";

const LoginPage = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const usernameParams = searchParams.get("username");
  const initialValues = {
    username: usernameParams,
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUser(JSON.parse(JSON.stringify(values)));
    },
  });

  const inputFormData = [
    {
      title: "Username",
      name: "username",
      icon: faAt,
      value: formik.values.username !== null ? formik.values.username : "",
      error: formik.errors.username,
    },
    {
      title: "Password",
      name: "password",
      icon: faLock,
      value: formik.values.password,
      error: formik.errors.password,
    },
  ];

  const { mutate: loginUser, isPending: loginUserPending } = LoginUserData({
    onSuccess: (data: any) => {
      toast.success(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      const { msg, ...rest } = JSON.parse(JSON.stringify(data));

      localStorage.setItem("auth", JSON.stringify(rest));
      router.push("/home", { scroll: false });
    },
    onError: (data: any) => {
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
    <Suspense fallback={<p>Loading Data...</p>}>
      <div className="container h-100 p-5 rounded-3">
        <h1 className="display-4 fw-bold">Sign In</h1>
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
          <Button isPending={loginUserPending}></Button>
        </form>
      </div>
    </Suspense>
  );
};

export default LoginPage;
