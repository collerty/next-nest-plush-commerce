"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {UserAccount} from "@/components/header/user-account";
import {useUser} from "@/components/header/user-context";
import {CartButton} from "@/components/cart/cart";
import {NavigationMenuShop} from "@/components/header/navigation-menu";

export function Header() {
  const {user, loading} = useUser();
  return (
      <div className="w-full py-4 border-b flex gap-8 px-10 lg:px-20 xl:px-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Logo/>
        <NavigationMenuShop/>
        <div className="w-full flex justify-end items-center gap-4">
          <CartButton user={user}/>
          <div className="rounded-xl h-10 flex items-center justify-end transition-all duration-500 ease-in-out" style={{ width: user ? "2rem" : "5rem" }}>
            {loading ? (
                <AccountSkeleton/>
            ) : user ? (
                <UserAccount user={user}/>
            ) : (
                <Link href="/auth/sign-in">
                  <Button>
                    Sign In
                  </Button>
                </Link>
            )}
          </div>
        </div>
      </div>
  )
}


export function AccountSkeleton() {
  return (
      <div className="w-20 rounded-xl h-10 bg-gray-200 animate-pulse">
      </div>
  )
}


export function Logo() {
  return (
      <Link href={"/"} className="flex gap-4 items-center">
        <div className="w-10 h-10 relative">
          <Image src={"/logo2.png"} alt={"capybara_cute"} className="object-contain object-left" fill/>
        </div>
        <span className="font-bold">Plush</span>
      </Link>
  )
}




