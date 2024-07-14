import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginFormUI from "./loginpage/LoginFormUI";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      await axios.post("http://localhost:5555/api/user/login", user, {
        withCredentials: true,
      });
      const profile = await axios.get(
        "http://localhost:5555/api/user/profile",
        {
          withCredentials: true,
        }
      );
      setUser(profile.data);
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <LoginFormUI formData={formData} onChange={onChange} onSubmit={onSubmit} />
  );
};

export default Login;
