import React from "react";
import { CaretDownIcon } from "@radix-ui/react-icons";
import style from "./Select.module.css";

type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  options,
  className,
  ...rest
}: {
  options: SelectOption[];
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={style["select"]}>
      <select
        className={`rt-reset rt-reset rt-SelectTrigger rt-r-size-2 rt-variant-surface ${className || ""}`}
        {...rest}
      >
        <option value=""></option>
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <CaretDownIcon className={style["select-icon"]} />
    </div>
  );
}
