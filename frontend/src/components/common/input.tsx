import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", ...props }) => {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-200">
      {label && (
        <span className="pl-1 text-xs font-semibold tracking-wide text-slate-300">
          {label}
        </span>
      )}
      <input
        className={`rounded-xl bg-slate-900/90 border border-slate-700 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
        {...props}
      />
    </label>
  );
};
