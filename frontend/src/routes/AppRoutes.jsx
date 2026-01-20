import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import MySkills from "../pages/skills/MySkills";
import UserLayout from "../layouts/UserLayout";
import Requests from "../pages/requests/Requests";
import MessagesPage from "../pages/messages/MessagesPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-skills" element={<MySkills />} />
        <Route path="/requests" element={<Requests/>} />
        <Route path="/messages" element={< MessagesPage/>} />
        
      </Route>

      <Route path="/admin" element={<div>Admin Layout Loading...</div>}>
      </Route>
    </Routes>
  );
}

export default AppRoutes;