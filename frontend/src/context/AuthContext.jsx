import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get("http://localhost:5555/api/user/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  const logout = async () => {
    await axios.post(
      "http://localhost:5555/api/user/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
