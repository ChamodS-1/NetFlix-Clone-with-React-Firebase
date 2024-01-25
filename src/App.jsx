import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
