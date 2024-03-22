"use client";

import { Box, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import HomeContent from "./components/HomeContent";
import NavBar from "./components/NavBar";
import Register from "./components/auth/Register.1";

export default function Home() {
  return (
    <SessionProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
        <HomeContent />
      </Box>
    </SessionProvider>
  );
}
