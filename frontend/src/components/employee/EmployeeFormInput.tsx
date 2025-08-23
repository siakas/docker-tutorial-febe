import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = {
  type?: string;
  placeholder?: string;
} & InputHTMLAttributes<HTMLInputElement>; // HTML 標準の input 属性をすべて継承

export const EmployeeFormInput = ({
  type = "text",
  placeholder,
  className,
  ...props // React Hook Form の register やその他の HTML 属性を展開
}: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100",
        className,
      )}
      {...props}
    />
  );
};
