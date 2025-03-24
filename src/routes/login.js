import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      await loginUser(username, password);
      setSuccess("¡Inicio de sesión exitoso!");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
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
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            variant="filled"
            label="Username"
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "gray" },
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              "& .MuiFilledInput-root": { borderRadius: "8px" },
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
              "& .MuiFilledInput-root": { borderRadius: "8px" },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            startIcon={!loading && <PersonAddIcon />}
            type="submit"
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "gray", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account?{" "}
          <span style={{ color: "#FF0000", fontWeight: "bold" }}>Sign up</span>
        </Typography>
      </Paper>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
