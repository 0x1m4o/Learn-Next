import { useState } from "react";
import { useFormik } from "formik";
import { Users } from "../../features/users/types/UsersInterface";

const useForm = (
  initialValues: any,
  onSubmit: any,
  { enableReinitialize = false, validationSchema }: any
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize,
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      }
      setIsSubmitting(false);
    },
  });

  return {
    ...formik,
    isSubmitting,
  };
};

export default useForm;
