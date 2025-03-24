import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getVideos } from "../api/endpoints";
import VideoItem from "./VideoItem";

const VideoList = ({ sidebarOpen }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      setVideos(data || []);
    };
    fetchVideos();
  }, []);

  return (
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
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoItem key={video.id} video={video} view="videoList" />
        ))
      ) : (
        <Box
          sx={{
            backgroundColor: "#181818",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
            gridColumn: "1 / -1",
          }}
        >
          <p style={{ color: "white", fontWeight: "bold" }}>
            No videos available
          </p>
          <p style={{ color: "#aaa" }}>Start uploading videos now!</p>
        </Box>
      )}
    </Box>
  );
};

export default VideoList;
