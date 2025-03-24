import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Header from "../components/Header";
import { keyframes } from "@mui/system";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0F0F0F",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Container
        maxWidth="md"
        sx={{
          minHeight: "calc(90vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#FFFFFF",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Synchronize your videos in real time
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 6,
            maxWidth: "600px",
          }}
        >
          Take your video experience to the next level and connect with your
          audience live, quickly and easily.
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/dashboard"
          sx={{
            backgroundColor: "#3C3C3C",
            color: "#FFFFFF",
            borderRadius: "9999px",
            textTransform: "none",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            animation: `${pulseAnimation} 2.5s infinite`,
            "&:hover": {
              backgroundColor: "#4D4D4D",
            },
          }}
        >
          <AddIcon />
          Create
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
