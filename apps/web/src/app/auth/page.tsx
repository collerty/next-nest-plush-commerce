import {AuthForm} from "@/components/auth/auth-form";


export default function Page() {
  return (
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center p-10 shadow gap-8">
          <h1 className="text-xl">Log In</h1>
          {/*<div className="flex flex-col items-center justify-center gap-4 min-w-80">*/}
          {/*  <Input placeholder="Username"/>*/}
          {/*  <Input placeholder="Password"/>*/}
          {/*</div>*/}
          {/*<Button className="min-w-80">Submit</Button>*/}
          <AuthForm/>
        </div>
      </div>
  )
}