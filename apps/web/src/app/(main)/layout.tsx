import {Header} from "@/components/header/header";
import {getProfile} from "@/lib/actions";

export default async function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const user = await getProfile();
  return (
      <>
        <Header user={user}/>
        <main className="w-full h-full px-10 lg:px-20 xl:px-40 py-8">
          {children}
        </main>
      </>
  )
}