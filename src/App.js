import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { AuthProvider } from "./context/useAuth";
import { LoadingProvider } from "./context/LoadingContext";

import Home from "./routes/home";
import Login from "./routes/login";
import Register from "./routes/register";
import Menu from "./routes/menu";
import UploadVideo from "./components/UploadVideo";
import PopularVideos from "./components/PopularVideos";
import History from "./components/History";
import PrivateRoute from "./components/private_route";
import Layout from "./components/layout";
import GlobalLoading from "./components/GlobalLoading";
import RouteChangeTracker from "./components/RouteChangeTracker";

import WatchPage from "./components/WatchPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <LoadingProvider>
          <GlobalLoading />
          <RouteChangeTracker />

          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Menu />
                  </Layout>
                }
              />

              <Route
                path="/upload"
                element={
                  <PrivateRoute>
                    <Layout>
                      <UploadVideo />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/watch/:id"
                element={
                  <PrivateRoute>
                    <Layout>
                      <WatchPage />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route
                path="/history"
                element={
                  <PrivateRoute>
                    <Layout>
                      <History />
                    </Layout>
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/popular" element={<PopularVideos />} />
            </Routes>
          </AuthProvider>
        </LoadingProvider>
      </Router>
    </>
  );
}

export default App;
