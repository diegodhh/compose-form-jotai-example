/** @format */

import React from "react";

interface FormInputProps {
  id?: string;
  name: string | number;
  value?: string | Record<string, unknown>;
  type?: string;
  label?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    arg: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => void;
  error: boolean;
  helperText?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  value = "",
  type = "text",
  label,
  onChange,
  onBlur,
  error,
  helperText,
  className,
  ...rest
}) => {
  return (
    <div className={`form-input-wrapper ${className || ""}`}>
      {label && <label htmlFor={id || String(name)}>{label}</label>}
      <input
        id={id || String(name)}
        name={String(name)}
        value={typeof value === "string" ? value : ""}
        type={type}
        onChange={onChange}
        onBlur={(e) => onBlur(e)}
        className={error ? "input-error" : ""}
        {...rest}
      />
      {error && helperText && <div className="error-message">{helperText}</div>}
    </div>
  );
};

export default FormInput;
