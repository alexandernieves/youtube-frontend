import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "@fontsource/roboto";
import YouTubeLogoWhite from "./YouTubeLogoWhite";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 100,
          py: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box sx={{ width: "120px" }}>
            <YouTubeLogoWhite />
          </Box>
          <Typography
            variant="body2"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontFamily: '"Roboto", sans-serif',
              color: "white",
            }}
          >
            Synchronization
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              borderColor: "#FF0000",
              color: "#FF0000",
              "&:hover": {
                backgroundColor: "#FF0000",
                color: "white",
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              backgroundColor: "#FF0000",
              color: "white",
              boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "#cc0000",
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
