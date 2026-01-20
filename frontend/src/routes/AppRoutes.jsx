import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "../pages/public/Auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default AppRoutes;
