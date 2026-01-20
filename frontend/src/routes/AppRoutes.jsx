import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import MessagesPage from "../pages/messages/MessagesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messages" element={<MessagesPage />} />
    </Routes>
  );
}

export default AppRoutes;
