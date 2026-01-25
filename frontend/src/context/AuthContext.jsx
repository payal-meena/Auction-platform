import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ use inside provider

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // ✅ inside component
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    const userData = data.user ? { ...data.user, token: data.token } : data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // ✅ works because useNavigate is here
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} {/* ✅ wait until user is loaded */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
