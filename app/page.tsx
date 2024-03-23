"use client";

import { Box, CssBaseline } from "@mui/material";
import { useSession } from "next-auth/react";
import HomeContent from "./components/HomeContent";
import NavBar from "./components/NavBar";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <HomeContent />
    </Box>
  );
}
