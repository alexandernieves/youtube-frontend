import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import AddIcon from "@mui/icons-material/Add";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExploreOutlined from "@mui/icons-material/ExploreOutlined";
import VideoLibraryOutlined from "@mui/icons-material/VideoLibraryOutlined";
import SubscriptionsOutlined from "@mui/icons-material/SubscriptionsOutlined";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import YouTubeLogoWhite from "./YouTubeLogoWhite";
import { useAuth } from "../context/useAuth";
import { PersonOutline } from "@mui/icons-material";

const SearchBar = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  border: "2px solid #333",
  borderRadius: "20px",
  backgroundColor: "#121212",
  width: "100%",
  height: "36px",
  overflow: "hidden",
  transition: "border-color 0.3s ease-in-out",
  "&:focus-within": {
    borderColor: "#065fd4",
  },
}));

const SearchInput = styled(InputBase)(() => ({
  flex: 1,
  color: "#FFF",
  padding: "6px 12px",
  fontSize: "14px",
  outline: "none",
}));

const SearchButton = styled(IconButton)(() => ({
  backgroundColor: "#222",
  borderLeft: "2px solid #333",
  borderRadius: "0px 20px 20px 0px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#222",
  },
  "& svg": {
    color: "white",
  },
}));

function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const userName = user?.username || "User";

  const getInitials = (name) => {
    if (!name) return "U";
    const words = name.split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#0F0F0F",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              py: 2,
            }}
          >
            <Box sx={{ width: "100px" }}>
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
        </Box>

        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}
        >
          <SearchBar>
            <SearchInput placeholder="Buscar" />
            <SearchButton>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
          <IconButton
            sx={{
              bgcolor: "#222",
              borderRadius: "50%",
              width: 40,
              height: 40,
              color: "white",
            }}
          >
            <MicIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Button
                component={Link}
                to="/upload"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: "#222",
                  borderRadius: 5,
                  color: "white",
                  textTransform: "none",
                  px: 2,
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Crear
              </Button>
              <Avatar
                sx={{
                  bgcolor: "#065fd4",
                  width: 36,
                  height: 36,
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {getInitials(userName).toUpperCase()}
              </Avatar>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              startIcon={<PersonOutline />}
              sx={{
                bgcolor: "#222",
                borderRadius: 5,
                color: "white",
                textTransform: "none",
                px: 2,
                "&:hover": { bgcolor: "#333" },
              }}
            >
              Acceder
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Sidebar({ open }) {
  const location = useLocation();
  const { user, logoutUser } = useAuth();
  const sidebarWidth = open ? 240 : 80;

  const isHomeSelected = location.pathname.startsWith("/dashboard");
  const isExploreSelected = location.pathname.startsWith("/popular");
  const isShortsSelected = location.pathname.startsWith("/shorts");
  const isSubsSelected = location.pathname.startsWith("/subscription");

  const textStyle = {
    whiteSpace: "nowrap",
    opacity: open ? 1 : 0,
    transition: "opacity 0.3s ease-in-out, margin 0.3s ease-in-out",
    color: "white",
  };

  const menuItemStyle = {
    borderRadius: "10px",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": { backgroundColor: "#333" },
    "&.Mui-selected": {
      backgroundColor: "#444",
      "&:hover": { backgroundColor: "#444" },
    },
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: "56px", md: "64px" },
        left: 0,
        width: sidebarWidth,
        height: "calc(100vh - 64px)",
        transition: "width 0.3s ease-in-out",
        bgcolor: "#0F0F0F",
        p: 2,
        overflowY: "auto",
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <List>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={isHomeSelected}
            sx={menuItemStyle}
          >
            <ListItemIcon>
              <HomeOutlined sx={{ color: "white" }} />
            </ListItemIcon>
            {open && <ListItemText primary="Home" sx={textStyle} />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/popular"
            selected={isExploreSelected}
            sx={menuItemStyle}
          >
            <ListItemIcon>
              <ExploreOutlined sx={{ color: "white" }} />
            </ListItemIcon>
            {open && <ListItemText primary="Popular" sx={textStyle} />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/history"
            selected={isShortsSelected}
            sx={menuItemStyle}
          >
            <ListItemIcon>
              <VideoLibraryOutlined sx={{ color: "white" }} />
            </ListItemIcon>
            {open && <ListItemText primary="History" sx={textStyle} />}
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/subscription"
            selected={isSubsSelected}
            sx={menuItemStyle}
          >
            <ListItemIcon>
              <SubscriptionsOutlined sx={{ color: "white" }} />
            </ListItemIcon>
            {open && <ListItemText primary="Subscription" sx={textStyle} />}
          </ListItemButton>
        </List>
      </Box>

      {user && (
        <Box sx={{ mt: "auto" }}>
          <List>
            <ListItemButton sx={menuItemStyle}>
              <ListItemIcon>
                <NotificationsNone sx={{ color: "white" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Notifications" sx={textStyle} />}
            </ListItemButton>
            <ListItemButton sx={menuItemStyle}>
              <ListItemIcon>
                <SettingsOutlined sx={{ color: "white" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Settings" sx={textStyle} />}
            </ListItemButton>
            <ListItemButton onClick={logoutUser} sx={menuItemStyle}>
              <ListItemIcon>
                <LogoutOutlined sx={{ color: "white" }} />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" sx={textStyle} />}
            </ListItemButton>
          </List>
        </Box>
      )}
    </Box>
  );
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} />{" "}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? "240px" : "80px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, { sidebarOpen })
          : children}
      </Box>
    </Box>
  );
}
