import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
            bg-blue-600 text-white py-1 px-2 rounded-xs
    hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none
    disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
};
