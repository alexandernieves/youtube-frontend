import React, { useState, useEffect } from "react";

import {
  Box,
  Toolbar,
  Typography,
  Button,
  Modal,
  TextField,
  Snackbar,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import SideMenu from "../components/SideMenu";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import VideoItem from "../components/VideoItem";


const UploadVideo = () => {
  const { user, setUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [myVideos, setMyVideos] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) return null;
    try {
      const response = await axios.post(
        `https://youtube-backend-production-fa3f.up.railway.app/api/token/refresh/`,
        { refresh: refresh_token }
      );
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      setUser((prevUser) => ({ ...prevUser, token: access }));
      return access;
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      setSnackbar({
        open: true,
        message: "No estás logueado. Inicia sesión para subir un video.",
        severity: "error",
      });
      return;
    }
    console.log(process.env)
    try {
      await axios.post(
        `https://youtube-backend-production-fa3f.up.railway.app/api/upload/`,
        { title, youtube_link: youtubeLink },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSnackbar({
        open: true,
        message: "Vídeo subido correctamente",
        severity: "success",
      });
      handleCloseModal();
      setTitle("");
      setYoutubeLink("");
      fetchMyVideos();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          try {
            await axios.post(
              `https://youtube-backend-production-fa3f.up.railway.app/api/upload/`,
              { title, youtube_link: youtubeLink },
              { headers: { Authorization: `Bearer ${newAccessToken}` } }
            );
            setSnackbar({
              open: true,
              message: "Vídeo subido correctamente",
              severity: "success",
            });
            handleCloseModal();
            setTitle("");
            setYoutubeLink("");
            fetchMyVideos();
          } catch (err) {
            console.error("Error al reintentar la subida:", err);
            setSnackbar({
              open: true,
              message: "Error al subir el video",
              severity: "error",
            });
          }
        } else {
          setSnackbar({
            open: true,
            message: "Sesión expirada, inicia sesión nuevamente.",
            severity: "error",
          });
        }
      } else {
        console.error("Error al subir el video:", error);
        setSnackbar({
          open: true,
          message: "Error al subir el video",
          severity: "error",
        });
      }
    }
  };

  const fetchMyVideos = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `https://youtube-backend-production-fa3f.up.railway.app/api/videos/`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const filtered = response.data.filter(
        (video) => video.username === user.username
      );
      setMyVideos(filtered);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchMyVideos();
  }, [user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedVideos = myVideos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#0F0F0F",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <SideMenu />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { xs: "70px" },
          p: 2,
          mt: 12,
        }}
      >
        <Toolbar />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Typography
            variant="h4"
            sx={{ color: "white", fontFamily: "Roboto, sans-serif" }}
          >
            Mis Videos
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              textTransform: "none",
              bgcolor: "#3C3C3C",
              "&:hover": { bgcolor: "#4D4D4D" },
            }}
          >
            Subir
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#1E1E1E", width: "100%" }}
        >
          <Table aria-label="tabla de videos">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Vista Previa
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Título
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Usuario
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Reacciones
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Star
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Acción
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedVideos.length > 0 ? (
                paginatedVideos.map((video) => (
                  <VideoItem key={video.id} video={video} view="upload" />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ color: "white", textAlign: "center", py: 2 }}
                  >
                    No has subido videos todavía.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          sx={{ color: "white" }}
          count={myVideos.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Videos por página"
        />

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#121212",
              p: 4,
              borderRadius: 2,
              width: { xs: "90%", sm: "400px" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "white",
                mb: 2,
                textAlign: "center",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Subir Video
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                variant="filled"
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ style: { color: "gray" } }}
                InputProps={{
                  style: {
                    color: "white",
                    backgroundColor: "#1E1E1E",
                    borderRadius: "8px",
                  },
                }}
              />
              <TextField
                variant="filled"
                label="Enlace de YouTube"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ style: { color: "gray" } }}
                InputProps={{
                  style: {
                    color: "white",
                    backgroundColor: "#1E1E1E",
                    borderRadius: "8px",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#3C3C3C",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "9999px",
                  py: 1.5,
                  "&:hover": { bgcolor: "#4D4D4D" },
                }}
              >
                Subir
              </Button>
            </Box>
          </Box>
        </Modal>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default UploadVideo;
