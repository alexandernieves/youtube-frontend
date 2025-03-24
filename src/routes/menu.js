import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import SideMenu from "../components/SideMenu";
import VideoList from "../components/VideoList";

export default function Menu() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = sidebarOpen ? 240 : 80;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0F0F0F",
      }}
    >
      <SideMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: "width 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          padding: "20px",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(3, 1fr))",
            gap: "16px",
            justifyContent: "center",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <VideoList />
        </Box>
      </Box>
    </Box>
  );
}
