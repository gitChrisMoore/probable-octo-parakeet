export enum ButtonVariant {
  Filled = "filled",
  FilledTonal = "filledTonal",
  Outlined = "outlined",
  Text = "text",
  Elevated = "elevated",
}
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void; // you can also use React.MouseEventHandler<HTMLButtonElement> for more specific type
  className?: string; // in case you want to allow custom classes
}

const StoryButton: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.Filled,
  onClick,
  className = "",
  ...props // spread
}) => {
  // Common base styles
  let baseStyles =
    "text-sm font-medium rounded-full px-4 py-2 focus:outline-none";

  // Variant-specific styles
  const variantStyles: { [key in ButtonVariant]: string } = {
    [ButtonVariant.Filled]: "bg-blue-500 text-white hover:bg-blue-700",
    [ButtonVariant.FilledTonal]: "bg-blue-200 text-blue-700 hover:bg-blue-300",
    [ButtonVariant.Outlined]:
      "bg-transparent hover:bg-blue-100 text-blue-700 border border-blue-500",
    [ButtonVariant.Text]: "bg-transparent text-grey-700 hover:bg-blue-100",
    [ButtonVariant.Elevated]:
      "bg-white text-blue-700 hover:bg-blue-100 shadow-md",
  };

  // Combine base styles with variant-specific styles and custom className
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default StoryButton;
