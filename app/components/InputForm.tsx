import React, { useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
interface InputFormProps {
  id: string | undefined;
  name: string | undefined;
  title: string;
  icon: IconDefinition;
  errors?: boolean | string;
  value: string | number | readonly string[] | undefined;
  onChangeHandler: React.ChangeEventHandler;
}

const InputForm = ({
  id,
  name,
  title,
  icon,
  errors,
  value,
  onChangeHandler,
}: InputFormProps) => {
  const [visiblePass, setVisiblePass] = useState<boolean>(true);
  const [visibleCPass, setVisibleCPass] = useState<boolean>(false);

  let inputType = "text"; // Default type is text

  let inputTypePassword = "password";
  let inputTypeCPassword = "password";

  // Check conditions to set input type for password field
  if (visiblePass && icon === faLock) {
    inputTypePassword = "text";
  }

  // Check conditions to set input type for cpassword field
  if (visibleCPass && icon === faLock) {
    inputTypeCPassword = "text";
  }
  return (
    <div className="mb-3">
      <label className="form-label">{title}</label>
      <div className="input-group">
        <span className="input-group-text">
          <FontAwesomeIcon
            icon={icon}
            style={{ fontSize: 20, color: "#19a7ce" }}
          />
        </span>
        <input
          type={
            name == "password"
              ? inputTypePassword
              : name == "confirmpassword"
              ? inputTypeCPassword
              : inputType
          }
          className="form-control"
          placeholder={`Enter your ${title}`}
          onChange={onChangeHandler}
          id={id}
          name={name}
          value={value}
        />
        {name == "password" || name == "confirmpassword" ? (
          <div style={{ width: 45 }} className="eye_icon input-group-text">
            {
              <FontAwesomeIcon
                icon={
                  name == "password" && visiblePass
                    ? faEyeSlash
                    : name == "confirmpassword"
                    ? faEyeSlash
                    : faEye
                }
                onClick={() => {
                  return name == "password"
                    ? setVisiblePass(!visiblePass)
                    : setVisibleCPass(!visibleCPass);
                }}
              />
            }
          </div>
        ) : null}
      </div>
      {errors && <p className="text-danger mt-1">{errors}</p>}
    </div>
  );
};

export default InputForm;
