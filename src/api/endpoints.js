import axios from "axios";

axios.defaults.baseURL = "https://youtube-backend-production-fa3f.up.railway.app/api/";

// Interceptor global para inyectar el token en cada peticion
axios.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// funcion para login
export const login = async (username, password) => {
  try {
    const response = await axios.post("login/", { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

// funcion para logout
export const logout = async () => {
  try {
    const response = await axios.post("logout/");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    return null;
  }
};

// funcion para registrar un usuario
export const register = async (username, email, password) => {
  try {
    const response = await axios.post("register/", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    return null;
  }
};

// funcion para obtener el usuario autenticado
export const authenticatedUser = async () => {
  try {
    const response = await axios.get("authenticated/");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    console.error("Error fetching authenticated user:", error);
    return null;
  }
};

// funcion para obtener notas
export const getNotes = async () => {
  try {
    const response = await axios.get("todos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
};

// funcion para subir un video
export const uploadVideo = async (title, youtubeLink) => {
  try {
    const response = await axios.post("upload/", {
      title,
      youtube_link: youtubeLink,
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    return null;
  }
};

// funcion para obtener videos
export const getVideos = async () => {
  try {
    const response = await axios.get("videos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

// funcion para refrescar token
export const refreshToken = async (refreshTokenValue) => {
  try {
    const response = await axios.post("token/refresh/", {
      refresh: refreshTokenValue,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
