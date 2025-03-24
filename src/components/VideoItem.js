import React from "react";
import {
  Box,
  Typography,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const VideoItem = ({ video, view = "dashboard" }) => {
  const getVideoId = (link) => {
    try {
      const url = new URL(link);
      return url.searchParams.get("v");
    } catch (error) {
      console.error("Error extrayendo el video ID:", error);
      return null;
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  const videoId = getVideoId(video.youtube_link);
  const popularity = video.popularity;

  if (view === "upload") {
    return (
      <TableRow>
        <TableCell>
          {videoId ? (
            <iframe
              width="200"
              height="150"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: "8px" }}
            />
          ) : (
            <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
          )}
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          <Typography variant="body1" fontWeight="bold">
            {video.title}
          </Typography>
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Box
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#065fd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {getInitials(video.username).toUpperCase()}
            </Box>
            <Typography variant="body2">{video.username}</Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ThumbUpAltOutlinedIcon sx={{ fontSize: "14px" }} />
            <Typography variant="body2">{video.like_count}</Typography>
            <ThumbDownAltOutlinedIcon sx={{ fontSize: "14px", ml: 1 }} />
            <Typography variant="body2">{video.dislike_count}</Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <StarOutlineIcon
              sx={{ color: "gold", mr: 0.5, fontSize: "16px" }}
            />
            <Typography variant="body2">{popularity}</Typography>
          </Box>
        </TableCell>

        <TableCell align="center">
          <IconButton component={Link} to={`/watch/${video.id}`}>
            <PlayArrowIcon sx={{ color: "white" }} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else if (view === "dashboard") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mb: 2,
        }}
      >
        <Box
          component={Link}
          to={`/watch/${video.id}`}
          sx={{
            position: "relative",
            display: "block",
            textDecoration: "none",
            width: "464px",
            height: "261px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#202020",
              borderRadius: "12px",
              overflow: "hidden",
              padding: "8px",
              textAlign: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
            ) : (
              <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              p: 1,
            }}
          >
            <PlayArrowIcon sx={{ color: "white", fontSize: "40px" }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "464px",
            px: 1,
            mt: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontSize: "18px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              m: 0,
              p: 0,
            }}
          >
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
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
                mr: 1,
              }}
            >
              {getInitials(video.username).toUpperCase()}
            </Box>
            <Typography sx={{ color: "white", fontSize: "16px", mr: 2 }}>
              {video.username}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarOutlineIcon
                sx={{ color: "gold", mr: 0.5, fontSize: "16px" }}
              />
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                {popularity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (view === "watchList") {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          component={Link}
          to={`/watch/${video.id}`}
          sx={{
            width: "160px",
            height: "90px",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#202020",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          {videoId ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              mb: 0.5,
            }}
          >
            {video.title}
          </Typography>
          <Typography sx={{ color: "#aaa", fontSize: "12px" }}>
            {video.username}
          </Typography>
        </Box>
      </Box>
    );
  } else if (view === "popular") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          component={Link}
          to={`/watch/${video.id}`}
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            mb: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#202020",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
            ) : (
              <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              p: 1,
            }}
          >
            <PlayArrowIcon sx={{ color: "white", fontSize: "40px" }} />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#065fd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                mr: 1,
              }}
            >
              {getInitials(video.username).toUpperCase()}
            </Box>
            <Typography sx={{ color: "white", fontSize: "14px", mr: 2 }}>
              {video.username}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarOutlineIcon
                sx={{ color: "gold", mr: 0.5, fontSize: "16px" }}
              />
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                {popularity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (view === "videoList") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          component={Link}
          to={`/watch/${video.id}`}
          sx={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            mb: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#202020",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
            ) : (
              <Typography sx={{ color: "red" }}>Enlace no válido</Typography>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "50%",
              p: 1,
            }}
          >
            <PlayArrowIcon sx={{ color: "white", fontSize: "40px" }} />
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#065fd4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                mr: 1,
              }}
            >
              {getInitials(video.username).toUpperCase()}
            </Box>
            <Typography sx={{ color: "white", fontSize: "14px", mr: 2 }}>
              {video.username}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StarOutlineIcon
                sx={{ color: "gold", mr: 0.5, fontSize: "16px" }}
              />
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                {popularity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          mb: 2,
        }}
      >
        <Typography sx={{ color: "white" }}>Vista no definida</Typography>
      </Box>
    );
  }
};

export default VideoItem;
