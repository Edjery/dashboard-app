"use client";

import { Box, CssBaseline } from "@mui/material";
import HomeContent from "./components/HomeContent";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <HomeContent />
    </Box>
  );
}
