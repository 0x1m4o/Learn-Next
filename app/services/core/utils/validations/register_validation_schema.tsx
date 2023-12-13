import * as Yup from "yup";
import { specialCharsRegex } from "../../constants/constants";

export const registerSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full Name is required")
    .min(4, "Full Name must be at least 4 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .test(
      "no-space",
      "Space is not allowed for username",
      (value) => !/\s/.test(value)
    ),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  job: Yup.string().required("Job is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(specialCharsRegex, "Password must contain a special character")
    .required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
