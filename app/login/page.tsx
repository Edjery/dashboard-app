import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/authOptions";
import Login from "../components/auth/Login";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/");
  }

  return <Login />;
}
