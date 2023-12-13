import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

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
          type="text"
          className="form-control"
          placeholder={`Enter your ${title}`}
          onChange={onChangeHandler}
          id={id}
          name={name}
          value={value}
        />
      </div>
      {errors && <p className="text-danger mt-1">{errors}</p>}
    </div>
  );
};

export default InputForm;
