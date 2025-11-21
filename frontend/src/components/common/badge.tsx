import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "red" | "yellow";
}

const colors: Record<string, string> = {
  green: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50",
  red: "bg-rose-500/20 text-rose-300 border border-rose-500/50",
  yellow: "bg-amber-500/20 text-amber-300 border border-amber-500/50"
};

export const Badge: React.FC<BadgeProps> = ({ children, color = "green" }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${colors[color]}`}>
      {children}
    </span>
  );
};
