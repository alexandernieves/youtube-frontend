import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import SideMenu from "../components/SideMenu";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import VideoItem from "../components/VideoItem";

export default function WatchPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [commentMenuId, setCommentMenuId] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetchVideo();
    fetchAllVideos();
    fetchComments();
    const unregister = registerView();
    return () => {
      if (unregister) unregister();
    };
  }, [id]);

  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}/`
      );
      setVideo(response.data);
    } catch (error) {
      console.error("Error al obtener video:", error);
    }
  };

  const fetchAllVideos = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/`
      );
      setAllVideos(response.data);
    } catch (error) {
      console.error("Error al obtener la lista de videos:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}/comments/`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comentar");
      return;
    }
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}/comments/create/`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setNewComment("");
      setSnackbar({
        open: true,
        message: "Comentario agregado con éxito",
        severity: "success",
      });
      fetchComments();
      fetchVideo();
    } catch (error) {
      console.error("Error al crear comentario:", error);
    }
  };

  const handleMenuOpen = (event, commentId) => {
    setAnchorEl(event.currentTarget);
    setCommentMenuId(commentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCommentMenuId(null);
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/comments/${commentId}/update/`,
        { text: editingText },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSnackbar({
        open: true,
        message: "Comentario editado con éxito",
        severity: "success",
      });
      setEditingCommentId(null);
      setEditingText("");
      fetchComments();
      fetchVideo();
    } catch (error) {
      console.error("Error al editar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/comments/${commentId}/delete/`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setSnackbar({
        open: true,
        message: "Comentario eliminado",
        severity: "success",
      });
      fetchComments();
      fetchVideo();
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
    }
  };

  const handleReact = async (reaction_type) => {
    if (!user) return alert("Debes iniciar sesión");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}/react/`,
        { reaction_type },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setVideo(res.data);
    } catch (error) {
      console.error("Error al reaccionar al video:", error);
    }
  };

  const getVideoIdFromUrl = (link) => {
    try {
      const url = new URL(link);
      return url.searchParams.get("v");
    } catch (err) {
      return null;
    }
  };

  const registerView = () => {
    if (!user || !user.token) return;
    const token = user.token;
    const registerViewAPI = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/history/register/`,
          { video_id: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Vista registrada en el historial");
      } catch (error) {
        console.error("⚠️ Error al registrar la vista en el historial:", error);
      }
    };
    const timer = setTimeout(registerViewAPI, 5000);
    return () => clearTimeout(timer);
  };

  if (!video)
    return (
      <Typography sx={{ color: "white", p: 2 }}>Cargando video...</Typography>
    );

  const mainVideoId = getVideoIdFromUrl(video.youtube_link);
  const popularity = video.popularity;
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

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
          p: 3,
          mt: 10,
        }}
      >
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 2 }}>
            <Box sx={{ width: "100%", mb: 3 }}>
              {mainVideoId ? (
                <iframe
                  width="100%"
                  height="480px"
                  src={`https://www.youtube.com/embed/${mainVideoId}`}
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                  style={{ borderRadius: "12px" }}
                />
              ) : (
                <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
              )}
            </Box>

            <Typography
              variant="h5"
              sx={{ mt: 2, fontWeight: "bold", color: "white" }}
            >
              {video.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#065fd4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  {video.username ? video.username[0].toUpperCase() : "U"}
                </Box>
                <Typography sx={{ color: "white", fontSize: "16px" }}>
                  {video.username}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <StarOutlineIcon
                    sx={{ color: "gold", mr: 0.5, fontSize: "16px" }}
                  />
                  <Typography sx={{ color: "white", fontSize: "14px" }}>
                    {popularity}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleReact("like")}
                  sx={{
                    textTransform: "none",
                    borderColor: "#3C3C3C",
                    color: "white",
                  }}
                >
                  <ThumbUpAltOutlinedIcon sx={{ mr: 1 }} /> {video.like_count}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleReact("dislike")}
                  sx={{
                    textTransform: "none",
                    borderColor: "#3C3C3C",
                    color: "white",
                  }}
                >
                  <ThumbDownAltOutlinedIcon sx={{ mr: 1 }} />{" "}
                  {video.dislike_count}
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
                Comentarios
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField
                  variant="filled"
                  label="Escribe un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  fullWidth
                  InputProps={{
                    style: {
                      color: "white",
                      backgroundColor: "#1E1E1E",
                      borderRadius: "8px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleCommentSubmit}
                  sx={{
                    bgcolor: "#3C3C3C",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Comentar
                </Button>
              </Box>

              {comments.length > 0 ? (
                comments.map((comment) => {
                  const isEditing = editingCommentId === comment.id;
                  return (
                    <Box
                      key={comment.id}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#065fd4",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {comment.username
                          ? comment.username[0].toUpperCase()
                          : "U"}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ color: "white", fontWeight: "bold" }}>
                          {comment.username}
                        </Typography>
                        {editingCommentId === comment.id ? (
                          <TextField
                            variant="filled"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            fullWidth
                            InputProps={{
                              style: {
                                color: "white",
                                backgroundColor: "#1E1E1E",
                                borderRadius: "8px",
                              },
                            }}
                          />
                        ) : (
                          <Typography sx={{ color: "white", mt: 1 }}>
                            {comment.text}
                          </Typography>
                        )}
                        {editingCommentId === comment.id ? (
                          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                            <Button
                              variant="contained"
                              onClick={() => handleSaveEdit(comment.id)}
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={handleCancelEdit}
                            >
                              Cancelar
                            </Button>
                          </Box>
                        ) : (
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, comment.id)}
                            sx={{ color: "white" }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography sx={{ color: "#aaa" }}>
                  No hay comentarios
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ flex: 1, maxHeight: "80vh", overflowY: "auto" }}>
            <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
              Más videos
            </Typography>
            {allVideos.length > 0 ? (
              allVideos.map((v) => (
                <Box key={v.id} sx={{ mb: 2 }}>
                  <VideoItem video={v} view="watchList" />
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "white" }}>No hay videos</Typography>
            )}
          </Box>
        </Box>
      </Box>

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
  );
}
