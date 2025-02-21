import {
  NavigationMenu, NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import {cn} from "@/lib/utils";

export function NavigationMenuShop() {
  return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
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
                </li>
                <ListItem href="/categories" title="Categories">
                  See all categories
                </ListItem>
                <ListItem href="/products" title="Products">
                  See all available products
                </ListItem>
                <ListItem href="/dashboard" title="Create Product">
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
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/products" passHref>
                Products
              </Link>
            </NavigationMenuLink>
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
        <Link
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
        </Link>
      </li>
  )
})
ListItem.displayName = "ListItem"


// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Teddy Bears",
//     href: "/categories/teddy-bears",
//     description: "Classic and adorable teddy bears for all ages.",
//   },
//   {
//     title: "Unicorns",
//     href: "/categories/unicorns",
//     description: "Magical unicorn plushies in various sizes and colors.",
//   },
//   {
//     title: "Dinosaurs",
//     href: "/categories/dinosaurs",
//     description: "Roaringly fun dinosaur plush toys for young adventurers.",
//   },
//   {
//     title: "Fantasy Creatures",
//     href: "/categories/fantasy-creatures",
//     description: "Explore dragons, phoenixes, and other mythical creatures.",
//   },
//   {
//     title: "Marine Animals",
//     href: "/categories/marine-animals",
//     description: "Dive into the world of whales, dolphins, and more.",
//   },
//   {
//     title: "Kawaii Plush",
//     href: "/categories/kawaii-plush",
//     description: "Cute and squishy plushies inspired by Japanese culture.",
//   },
//   {
//     title: "Holiday Specials",
//     href: "/categories/holiday-specials",
//     description: "Seasonal plush toys perfect for gifts and decorations.",
//   },
//   {
//     title: "Giant Plushies",
//     href: "/categories/giant-plushies",
//     description: "Oversized plush toys for hugs and comfort.",
//   },
// ];
