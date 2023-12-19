import React, { useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faEye,
  faEyeSlash,
  faLock,
  faRotateRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
interface InputFormProps {
  id: string | undefined;
  name: string | undefined;
  title: string;
  icon: IconDefinition;
  errors?: string;
  value?: string;
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
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [visibleCPass, setVisibleCPass] = useState<boolean>(false);

  let inputType = "search";

  let inputTypePassword = "password";
  let inputTypeCPassword = "password";

  const isPassword = name == "password";
  const isConfirmPassword = name == "confirmpassword";

  if (icon === faLock) {
    if (visiblePass) {
      inputTypePassword = "search";
    }
    if (visibleCPass) {
      inputTypeCPassword = "search";
    }
  }

  return (
    <div className="mb-3 position-relative">
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
            isPassword
              ? inputTypePassword
              : isConfirmPassword
              ? inputTypeCPassword
              : inputType
          }
          className="form-control"
          placeholder={`Enter your ${title}`}
          onChange={onChangeHandler}
          id={id}
          name={name}
          value={value!}
        />
        {isPassword || isConfirmPassword ? (
          <div
            className="input-group-text"
            style={{ width: 45 }}
            onClick={() => {
              return isPassword
                ? setVisiblePass(!visiblePass)
                : setVisibleCPass(!visibleCPass);
            }}
          >
            <FontAwesomeIcon
              icon={
                isPassword && visiblePass
                  ? faEye
                  : isConfirmPassword && visibleCPass
                  ? faEye
                  : faEyeSlash
              }
            />
          </div>
        ) : null}
      </div>
      {errors && <p className="text-danger mt-1">{errors}</p>}
    </div>
  );
};

export default InputForm;
