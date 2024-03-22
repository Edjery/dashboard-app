import { getServerSession } from "next-auth";
import Login from "../components/auth/Login";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    redirect("/");
  }

  return <Login />;
};

export default page;
