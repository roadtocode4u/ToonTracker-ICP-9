import React from "react";

// variants: default, primary, secondary, tertiary
// sizes: sm, md, lg
// iconPosition: left, right
// icon: lucide-react icon element

function Button({
  title,
  onClick,
  variant = "default",
  size = "md",
  icon,
  iconPosition,
}) {
  const VARIANT_CLASSES = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary:
      "bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-100",
  };

  const SIZE_CLASSES = {
    sm: "text-sm py-1 px-2 rounded-sm my-2",
    md: "text-md py-2 px-4 rounded-md my-3",
    lg: "text-lg py-3 px-6 rounded-lg my-4",
  };

  return (
    <button
      className={`cursor-pointer ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]}`}
      onClick={onClick}
    >
      {iconPosition === "left" && icon ? <>{icon} </> : null}
      {title}
      {iconPosition === "right" && icon ? <> {icon}</> : null}
    </button>
  );
}

export default Button;
