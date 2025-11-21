import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
}

const base =
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary-500";

const variants: Record<string, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/30",
  ghost:
    "bg-slate-900/70 text-slate-100 hover:bg-slate-800 border border-slate-700",
  outline:
    "border border-slate-600 text-slate-200 bg-transparent hover:bg-slate-900/60"
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
};
