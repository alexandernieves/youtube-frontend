import React, { useContext } from "react";
import { Box } from "@mui/material";
import { LoadingContext } from "../context/LoadingContext";
import { keyframes } from "@mui/system";

const shineAnimation = keyframes`
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
`;

const GlobalLoading = () => {
  const { loading } = useContext(LoadingContext);
  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        zIndex: 9999,
        borderRadius: "9999px",
        overflow: "hidden",
        background:
          "linear-gradient(90deg, #FF0000 0%, #FF0000 98%,rgb(59, 42, 75) 100%)",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          zIndex: 9999,
          borderRadius: "9999px",
          backgroundColor: "#FF0000",
          boxShadow: "0px 0px 10px 5px rgba(255, 0, 0, 0.5)",
        }}
      />
    </Box>
  );
};

export default GlobalLoading;
