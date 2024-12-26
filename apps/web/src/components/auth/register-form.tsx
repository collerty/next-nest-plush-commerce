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

export function RegisterForm({
                               className,
                               ...props
                             }: React.ComponentPropsWithoutRef<"div">) {
  const apiUrl = process.env.API_URL!;
  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create Your Account</CardTitle>
            <CardDescription>
              Use your Google or Github account to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <GithubButton text={"Login with Github"} apiUrl={apiUrl}/>
                  <GoogleButton text={"Register with Google"} apiUrl={apiUrl}/>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/sign-in" className="underline underline-offset-4">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  )
}
