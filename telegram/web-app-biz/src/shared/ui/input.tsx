import * as React from "react";

import { cn } from "shared/libs/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  postfix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffix, postfix, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          { "opacity-50": props.disabled },
          className
        )}
      >
        {suffix && <div className="flex items-center justify-center py-2 pl-3">{suffix}</div>}
        <input
          type={type}
          className={cn(
            "flex h-full py-2 w-full bg-background px-3 rounded-md focus-visible:outline-none",
            className
          )}
          ref={ref}
          {...props}
        />
        {postfix && <div className="flex items-center justify-center py-2 pr-3">{postfix}</div>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
