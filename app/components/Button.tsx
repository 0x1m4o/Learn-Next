import React from "react";

interface ButtonProps {
  isPending: boolean;
}
const Button = ({ isPending }: ButtonProps) => {
  return (
    <button disabled={isPending} type="submit" className="btn btn-primary">
      Submit
    </button>
  );
};

export default Button;
