import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerUser(username, email, password, passwordConfirm);
  };

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0F0F0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          backgroundColor: "#121212",
          p: 4,
          borderRadius: 3,
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0px 4px 10px rgba(255, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "white",
            textAlign: "center",
          }}
        >
          Sign Up
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            variant="filled"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              "& .MuiFilledInput-root": {
                borderRadius: "8px",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                borderColor: "#FF0000",
              },
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              "& .MuiFilledInput-root": {
                borderRadius: "8px",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                borderColor: "#FF0000",
              },
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              "& .MuiFilledInput-root": {
                borderRadius: "8px",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                borderColor: "#FF0000",
              },
            }}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              "& .MuiFilledInput-root": {
                borderRadius: "8px",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                borderColor: "#FF0000",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              backgroundColor: "#3C3C3C",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "9999px",
              py: 1.5,
              mb: 2,
              "&:hover": {
                backgroundColor: "#4D4D4D",
              },
            }}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "gray", cursor: "pointer" }}
          onClick={handleNavigate}
        >
          Already have an account?{" "}
          <span style={{ color: "#FF0000", fontWeight: "bold" }}>Log in</span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
