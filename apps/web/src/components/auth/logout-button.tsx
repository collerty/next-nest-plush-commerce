"use client"
import { logout } from "@/lib/actions";
import { forwardRef } from "react";

export const LogoutButton = forwardRef<HTMLButtonElement, { children: React.ReactNode }>(
    ({ children, ...props }, ref) => {
      return (
          <button ref={ref} onClick={()=> console.log("log out")} {...props}>
            {children}
          </button>
      );
    }
);

LogoutButton.displayName = "LogoutButton";
