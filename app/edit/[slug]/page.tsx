"use client";

import LoadingLayout from "@/app/components/LoadingLayout";
import { EditUserData } from "../../services/features/users/usecases/editUser";
import useForm from "../../services/core/utils/use_form";
import { Suspense } from "react";
import {
  Users,
  defaultUserValues,
} from "@/app/services/features/users/types/UsersInterface";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import {
  faAt,
  faBriefcase,
  faCity,
  faFlag,
  faImage,
  faPersonRifle,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import InputForm from "@/app/components/InputForm";
import { UseGetUser } from "../../services/features/users/usecases/getUser";
import { useRouter } from "next/navigation";

export default function UserDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const getUserData = UseGetUser();
  const queryResult = EditUserData(params.slug);
  function mergeWithDefaults(target: Users | undefined, defaults: Users) {
    return Object.keys(defaults).reduce((merged: any, key) => {
      merged[key] =
        target?.[key as keyof Users] || defaults[key as keyof Users];
      return merged;
    }, {});
  }

  const initialValues = mergeWithDefaults(getUserData.data, defaultUserValues);

  const onSubmit = (values: any) => {
    editUser(JSON.parse(JSON.stringify(values)));
  };

  const formik = useForm(initialValues, onSubmit, { enableReinitialize: true });
  const { mutate: editUser, isPending: editUserPending } = EditUserData({
    username: params.slug,
    onSuccess: (data: any) => {
      toast.success(data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      router.push("/home", { scroll: false });
    },
    onError: (data: any) => {
      toast.error(`${data.response.data.error}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
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
      title: "About",
      name: "about",
      icon: faPersonRifle,
      value: formik.values.about,
      error: formik.errors.about,
    },
    {
      title: "Avatar",
      name: "avatar",
      icon: faImage,
      value: formik.values.avatar,
      error: formik.errors.avatar,
    },
    {
      title: "Instagram",
      name: "instagram",
      icon: faPhotoFilm,
      value: formik.values?.instagram,
      error: formik.errors.instagram,
    },
    {
      title: "Facebook",
      name: "facebook",
      icon: faPhotoFilm,
      value: formik.values?.facebook,
      error: formik.errors.facebook,
    },
    {
      title: "Twitter",
      name: "twitter",
      icon: faPhotoFilm,
      value: formik.values?.twitter,
      error: formik.errors.twitter,
    },
  ];

  if (getUserData.isLoading || queryResult.isPending) {
    return <LoadingLayout />;
  } else if (getUserData.isError || queryResult.isError) {
    return (
      <div>{getUserData.error?.message && queryResult.error?.message}</div>
    );
  } else {
    return (
      <Suspense fallback={<p>Loading Data...</p>}>
        <div className="container h-100 p-5 rounded-3">
          <h1 className="display-4 fw-bold">Edit</h1>
          <form onSubmit={formik.handleSubmit}>
            {inputFormData.map((data) => (
              <InputForm
                onChangeHandler={formik.handleChange}
                title={data["title"]}
                icon={data["icon"]}
                value={data["value"]}
                id={data["name"]}
                name={data["name"]}
                errors={data["error"] && ""}
                key={data["name"]}
              />
            ))}
            <Button isPending={editUserPending}></Button>
          </form>
        </div>
      </Suspense>
    );
  }
}
