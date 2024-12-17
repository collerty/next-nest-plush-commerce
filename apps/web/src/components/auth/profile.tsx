import {getProfile} from "@/lib/actions";

export function Profile() {
  const profile = getProfile();
  console.log("profile:", profile);
  return (
      <div>
        {profile ? profile.id : "No profile"}
      </div>
  )
}