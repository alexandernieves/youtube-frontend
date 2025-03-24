import React, { useEffect, useState } from "react";
import { Box, Typography, Pagination } from "@mui/material";
import axios from "axios";
import VideoItem from "./VideoItem";
import SideMenu from "./SideMenu";

const History = ({ sidebarOpen }) => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchHistory = async (pageNumber) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `https://youtube-backend-production-fa3f.up.railway.app/api/history/`,
        {
          params: { page: pageNumber },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Historial recibido:", response.data);
      setHistory(response.data.results);
      setTotalCount(response.data.count);
    } catch (error) {
      console.error("Error al obtener el historial:", error);
    }
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  useEffect(() => {
    console.log("Historial recibido:", history);
  }, [history]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#0F0F0F",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <SideMenu sidebarOpen={sidebarOpen} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ color: "white", mb: 3 }}>
          Historial de Vídeos
        </Typography>

        {history.length > 0 ? (
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
            {history.map((item) => (
              <VideoItem key={item.id} video={item.video} view="popular" />
            ))}
          </Box>
        ) : (
          <Typography sx={{ color: "white" }}>
            No has visto ningún vídeo.
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(totalCount / 10)}
            page={page}
            onChange={handlePageChange}
            sx={{ bgcolor: "background.paper", borderRadius: "4px" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default History;
