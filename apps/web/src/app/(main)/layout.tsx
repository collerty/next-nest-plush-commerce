import {Header} from "@/components/header/header";
import {UserProvider} from "@/components/header/user-context";
import {Footer} from "@/components/footer/footer";

export default async function AuthLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    // const user = await getProfile();
    return (
        <div className="flex flex-col">
            {/*<Suspense fallback={<HeaderSkeleton/>}>*/}
            <div className="min-h-screen">

                <UserProvider>
                    <Header/>
                </UserProvider>
                {/*</Suspense>*/}
                <main className="w-full h-full px-10 lg:px-20 xl:px-40 py-8">
                    {children}
                </main>
            </div>

            {/*<section>*/}
            {/*    <div>*/}
            {/*        <footer>*/}
            {/*            footer*/}
            {/*        </footer>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <Footer/>
        </div>
    )
}