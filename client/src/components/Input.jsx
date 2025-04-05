import React from "react";

function Input({ type, paceholder, value, onChange, size="md", label="" }) {

  const SIZE_CLASSES = {
    sm: "text-sm py-1 px-2 rounded-sm mb-2",
    md: "text-md py-2 px-4 rounded-md mb-5",
    lg: "text-lg py-3 px-6 rounded-lg mb-7",
  }

  return (
    <>
      {label ? <label>{label}</label> : null}
      <input
        type={type}
        placeholder={paceholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`text-md border-2 border-gray-300 w-full ${SIZE_CLASSES[size]}`}
      />
    </>
  );
}

export default Input;
