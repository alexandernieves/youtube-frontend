import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, register, authenticatedUser } from "../api/endpoints";
import { Snackbar, Alert } from "@mui/material";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("info");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const loginUser = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data && data.access) {
        const newUser = {
          username,
          token: data.access,
          refresh: data.refresh,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        showMessage("¡Inicio de sesión exitoso!", "success");
        navigate("/dashboard");
      } else {
        showMessage("Credenciales incorrectas. Inténtalo de nuevo.", "error");
      }
    } catch (error) {
      showMessage("Error al iniciar sesión. Inténtalo más tarde.", "error");
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      localStorage.removeItem("user");
      showMessage("Sesión cerrada correctamente.", "info");
      navigate("/login");
    } catch (error) {
      showMessage("Error al cerrar sesión.", "error");
    }
  };

  const registerUser = async (username, email, password, confirm_password) => {
    if (password !== confirm_password) {
      showMessage("Las contraseñas no coinciden.", "error");
      return;
    }
    try {
      const response = await register(username, email, password);
      if (response) {
        showMessage("¡Usuario registrado con éxito!", "success");
        navigate("/login");
      } else {
        showMessage("Error al registrar usuario.", "error");
      }
    } catch (error) {
      showMessage("Error en el registro. Inténtalo más tarde.", "error");
    }
  };

  const checkAuthenticatedUser = async () => {
    if (!user || !user.token) return null;
    const authData = await authenticatedUser();
    if (!authData) {
      setUser(null);
      localStorage.removeItem("user");
      showMessage("Sesión expirada. Inicia sesión de nuevo.", "error");
    }
    return authData;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        registerUser,
        checkAuthenticatedUser,
      }}
    >
      {children}

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
      >
        <Alert severity={messageType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
