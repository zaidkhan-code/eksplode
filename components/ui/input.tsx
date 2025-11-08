import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

function Input({ className, type, value, onChange, ...props }) {
  if (type === "tel") {
    const safeValue =
      typeof value === "string" && value.startsWith("+") ? value : "";

    return (
      <div className="relative">
        <PhoneInput
          placeholder="(555) 123-4567"
          defaultCountry="US"
          international={false} // Disable country selection
          value={safeValue}
          onChange={onChange}
          countryCallingCodeEditable={false}
          className={cn(
            "no-flag-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-black border-red-500/20 text-white",
            className
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-black border-red-500/20 text-white",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export { Input };
