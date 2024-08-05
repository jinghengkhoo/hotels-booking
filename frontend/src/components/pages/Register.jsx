import { useState, useContext } from "react";
import axios from "axios";
import RegisterFormUI from "../registerpage/RegisterFormUI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validationMethods";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a number and a special character"
      );
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5555/api/user/register",
        newUser,
        { withCredentials: true }
      );

      console.log(res.data);

      await axios.post("http://localhost:5555/api/user/login", newUser, {
        withCredentials: true,
      });
      const profile = await axios.get(
        "http://localhost:5555/api/user/profile",
        {
          withCredentials: true,
        }
      );
      setUser(profile.data);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response.data);
      setError("An error occurred during registration");
    }
  };

  const onSignIn = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div>
      <Link to="/">
        <button className="btn btn-ghost text-center font-bold text-xl">
          Travelust
        </button>
      </Link>
      <RegisterFormUI
        error={error}
        formData={formData}
        onChange={onChange}
        onSubmit={onSubmit}
        login={onSignIn}
      />
    </div>
  );
};

export default Register;
