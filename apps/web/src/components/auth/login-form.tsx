import {cn} from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import {GoogleButton} from "@/components/auth/google-button";
import {GithubButton} from "@/components/auth/github-button";

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentPropsWithoutRef<"div">) {
  const apiUrl = process.env.API_URL!;
  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Google or Github account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <GithubButton text={"Login with Github"} apiUrl={apiUrl}/>
                  {/*<GoogleButton text={"Login with Google"} apiUrl={apiUrl}/>*/}
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
