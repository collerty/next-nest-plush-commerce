"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {toast} from "sonner";
import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";
import {login} from "@/lib/actions";
import {getAuthTokens} from "@/lib/fetcher";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {message: "Password must be at least 6 characters."})
})

export function AuthForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await login({
        email: "test123@gmail.com",
        password: "test123"
      });
      const data = res.data;
      console.log({data});
      toast.success("Logged in", {
        description: (
            <div>
              <span>{data?.accessToken}</span>
              <span> {data?.refreshToken}</span>
            </div>
        )
      })
      // router.push("/");
    } catch (e) {
      toast.error(`${e}`);
    }
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-8 min-w-80">
          <div className="w-full">
            <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
  )
}
