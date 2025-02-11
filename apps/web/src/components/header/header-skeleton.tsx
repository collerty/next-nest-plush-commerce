import * as React from "react";
import {AccountSkeleton, Logo, NavigationMenuDemo} from "@/components/header/header";

export function HeaderSkeleton() {
  return (
      <div className="w-full py-4 border-b flex gap-8 px-10 lg:px-20 xl:px-40">
        <Logo/>
        <NavigationMenuDemo/>
        <div className="w-full flex justify-end items-center">
          <AccountSkeleton />
        </div>
      </div>
  )
}