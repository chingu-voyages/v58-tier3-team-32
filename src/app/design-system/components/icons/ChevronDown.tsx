import React from "react";
import { ChevronDown as LucideChevronDown } from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const ChevronDown = ({ size = 20, className = "text-link", ...props }: IconProps) => {
  return <LucideChevronDown size={size} className={`text-[var(--text-link)] ${className}`} {...props} />;
};

export default ChevronDown;
