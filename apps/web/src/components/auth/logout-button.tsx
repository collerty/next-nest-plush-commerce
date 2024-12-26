"use client";

import { logout } from "@/lib/actions";

export function LogoutButton() {


  return (
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
  );
}