import {Header} from "@/components/header/header";
import {getProfile} from "@/lib/actions";
import {Suspense} from "react";
import {HeaderSkeleton} from "@/components/header/header-skeleton";
import {UserProvider} from "@/components/header/user-context";

export default async function AuthLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  // const user = await getProfile();
  return (
      <>
        {/*<Suspense fallback={<HeaderSkeleton/>}>*/}
        <UserProvider>
          <Header/>
        </UserProvider>
        {/*</Suspense>*/}
        <main className="w-full h-full px-10 lg:px-20 xl:px-40 py-8">
          {children}
        </main>
      </>
  )
}