import React from "react";
import clsx from "clsx";

type CommonButtonProps = {
  label: string;
  hoverLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  hoverLabel,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "group px-8 py-2.5 rounded-lg text-white transition duration-300",
        "bg-[#227c85] hover:bg-[#227c85] active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        className
      )}
    >
      <p className="relative h-6 overflow-hidden">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:-translate-y-full">
          {hoverLabel ?? label}
        </span>
      </p>
    </button>
  );
};

export default CommonButton;
