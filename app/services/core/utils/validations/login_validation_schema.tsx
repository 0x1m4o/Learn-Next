import * as Yup from "yup";
import { specialCharsRegex } from "../../constants/constants";

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .test(
      "no-space",
      "Space is not allowed for username",
      (value) => !/\s/.test(value)
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(specialCharsRegex, "Password must contain a special character"),
});
