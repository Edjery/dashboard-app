import { redirect } from "next/navigation";
import Register from "../components/auth/Register";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/");
  }

  return <Register />;
}
