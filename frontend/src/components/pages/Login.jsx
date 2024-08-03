import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginFormUI from "../loginpage/LoginFormUI";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError("Invalid Account Details");
      console.error(err.response.data);
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div>
      <Link to="/">
        <button className="btn btn-ghost text-center font-bold text-xl">
          Travelust
        </button>
      </Link>
      <LoginFormUI
        error={error}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        register={onSignUp}
      />
    </div>
  );
};

export default Login;
