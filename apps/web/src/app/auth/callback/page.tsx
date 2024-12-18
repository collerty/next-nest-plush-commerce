"use client"
import {Button} from "@/components/ui/button";
import {getAuthTokens} from "@/lib/auth-tokens";
import {getProfile} from "@/lib/actions";

export default function Page() {
  async function handleGetProfile() {
    const profile = await getProfile();
    console.log(profile);
  }
  async function handleGetTokens() {
    const tokens = await getAuthTokens();
    console.log(tokens);
  }
  return (
      <div>
        <Button onClick={handleGetTokens}>Get auth tokens</Button>
        <Button onClick={handleGetProfile}>Get profile</Button>
      </div>
  )
}
