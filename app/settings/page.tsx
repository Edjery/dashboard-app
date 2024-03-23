"use client";

import { Box, CssBaseline } from "@mui/material";
import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "../components/NavBar";
import Settings from "../components/Settings";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  } else if (status === "unauthenticated") {
    redirect("/");
  }
  return (
    <SessionProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
        <Settings />
      </Box>
    </SessionProvider>
  );
}
