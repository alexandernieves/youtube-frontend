import axios from "axios";

axios.defaults.baseURL =
  "https://youtube-backend-production-fa3f.up.railway.app/api/";

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

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("⚠️ Token expirado. Cerrando sesión automáticamente...");

      localStorage.removeItem("user");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  try {
    const response = await axios.post("login/", { username, password });

    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("user");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

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

export const authenticatedUser = async () => {
  try {
    const response = await axios.get("authenticated/");
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get("todos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return null;
  }
};

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

export const getVideos = async () => {
  try {
    const response = await axios.get("videos/");
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

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
