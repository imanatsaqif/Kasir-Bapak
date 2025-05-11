import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import App from "./App";
import Inventory from "./pages/Inventory";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/kasir" element={<App />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  </React.StrictMode>
);