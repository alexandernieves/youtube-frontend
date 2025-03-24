import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import VideoItem from "./VideoItem";
import SideMenu from "./SideMenu";

const PopularVideos = ({ sidebarOpen }) => {
  const [popularVideos, setPopularVideos] = useState([]);

  useEffect(() => {
    const fetchPopularVideos = async () => {
      try {
        const response = await axios.get(
          `https://youtube-backend-production-fa3f.up.railway.app/api/popular/`
        );
        setPopularVideos(response.data);
      } catch (error) {
        console.error("Error al obtener vídeos populares:", error);
      }
    };

    fetchPopularVideos();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#0F0F0F",
      }}
    >
      <SideMenu />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
          Top 5 Vídeos Populares
        </Typography>
        {popularVideos.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: sidebarOpen ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
              },
              gap: "16px",
              p: 2,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {popularVideos.map((video) => (
              <VideoItem key={video.id} video={video} view="popular" />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "white" }}>
            No hay vídeos populares para mostrar.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PopularVideos;
