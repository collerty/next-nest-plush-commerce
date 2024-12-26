"use client"

import * as React from "react"
import Link from "next/link"

import {cn} from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image";

export function Header() {
  return (
      <div className="w-full py-4 border-b flex gap-8 px-40">
        <Logo/>
        <NavigationMenuDemo />
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


const components: { title: string; href: string; description: string }[] = [
  {
    title: "Teddy Bears",
    href: "/categories/teddy-bears",
    description: "Classic and adorable teddy bears for all ages.",
  },
  {
    title: "Unicorns",
    href: "/categories/unicorns",
    description: "Magical unicorn plushies in various sizes and colors.",
  },
  {
    title: "Dinosaurs",
    href: "/categories/dinosaurs",
    description: "Roaringly fun dinosaur plush toys for young adventurers.",
  },
  {
    title: "Fantasy Creatures",
    href: "/categories/fantasy-creatures",
    description: "Explore dragons, phoenixes, and other mythical creatures.",
  },
  {
    title: "Marine Animals",
    href: "/categories/marine-animals",
    description: "Dive into the world of whales, dolphins, and more.",
  },
  {
    title: "Kawaii Plush",
    href: "/categories/kawaii-plush",
    description: "Cute and squishy plushies inspired by Japanese culture.",
  },
  {
    title: "Holiday Specials",
    href: "/categories/holiday-specials",
    description: "Seasonal plush toys perfect for gifts and decorations.",
  },
  {
    title: "Giant Plushies",
    href: "/categories/giant-plushies",
    description: "Oversized plush toys for hugs and comfort.",
  },
];


export function NavigationMenuDemo() {
  return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                        className="flex h-full w-full select-none flex-col  rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                    >
                      <div className="w-16 h-16 relative">
                        <Image src={"/logo2.png"} alt={"capybara_cute"} className="object-contain object-left" fill/>
                      </div>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Plush
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Open source plush e-commerce built with Next.js and Nest.js
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/categories" title="Categories">
                  See all categories
                </ListItem>
                <ListItem href="/products" title="Products">
                  See all available products
                </ListItem>
                <ListItem href="/dashboard" title="Create Store">
                  Create and publish your own plush
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/*<NavigationMenuItem>*/}
          {/*  <NavigationMenuTrigger>Components</NavigationMenuTrigger>*/}
          {/*  <NavigationMenuContent>*/}
          {/*    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">*/}
          {/*      {components.map((component) => (*/}
          {/*          <ListItem*/}
          {/*              key={component.title}*/}
          {/*              title={component.title}*/}
          {/*              href={component.href}*/}
          {/*          >*/}
          {/*            {component.description}*/}
          {/*          </ListItem>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </NavigationMenuContent>*/}
          {/*</NavigationMenuItem>*/}
          <NavigationMenuItem>
            <Link href="/products" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                All Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
  return (
      <li>
        <NavigationMenuLink asChild>
          <a
              ref={ref}
              className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  className
              )}
              {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
  )
})
ListItem.displayName = "ListItem"
