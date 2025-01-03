import {getProfile} from "@/lib/actions";

export async function Profile() {
  const profile = await getProfile();
  console.log("profile:", profile);
  return (
      <div>
        {profile ? profile.data?.id : "No profile"}
      </div>
  )
}