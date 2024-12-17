"use client"
import {Button} from "@/components/ui/button";
import {getAuthTokens} from "@/lib/auth-tokens";
import {getProfile} from "@/lib/actions";

export default function Page() {
  return (
      <div>
        <Button onClick={() => console.log(getAuthTokens())}>Get auth tokens</Button>
        <Button onClick={() => console.log(getProfile())}>Get profile</Button>
      </div>
  )
}
