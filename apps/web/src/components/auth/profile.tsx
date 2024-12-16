import {getProfile} from "@/lib/actions";

export function Profile() {
  const {data: profile} = getProfile();
  console.log(profile);
  return (
      <div>
        {profile ? profile.id : "No profile"}
      </div>
  )
}