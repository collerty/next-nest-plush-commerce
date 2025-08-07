import type {Metadata} from "next";
import "./globals.css";
import {clsx} from "clsx";
import {GeistSans} from 'geist/font/sans';
import {Toaster} from "sonner";
import {Header} from "@/components/header/header";
import {AuthProvider} from "@/components/auth/auth-context";


export const metadata: Metadata = {
  title: "Plushies E-commerce",
  description: "Plushies E-commerce written with Nextjs and Nestjs",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="h-full">
      <body className={clsx(GeistSans.className, "flex flex-col w-full h-full")}>
      {/*<div>*/}
        {children}
      {/*</div>*/}
      <Toaster position={'bottom-left'}/>
      </body>
      </html>
  );
}
