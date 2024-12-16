"use client"
import {Button} from "@/components/ui/button";
import {getAuthTokens} from "@/lib/fetcher";

export default function Page() {
  return (
      <div><Button onClick={() => console.log(getAuthTokens())}>Get profile</Button></div>
  )
}