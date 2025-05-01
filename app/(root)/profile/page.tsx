import { getUserProfile } from "@/lib/actions";
import ProfilePage from "./profile-page";

export default async function Home() {
  // In a real app, you would get the user ID from the session
  const userId = "user123";
  const userData = await getUserProfile(userId);

  return <ProfilePage userData={userData} />;
}
