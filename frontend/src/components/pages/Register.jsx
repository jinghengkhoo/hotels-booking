import { useState } from "react";
import axios from "axios";
import RegisterFormUI from "../registerpage/RegisterFormUI";
import { validateEmail, validatePassword } from "../../utils/validationMethods";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a number and a special character"
      );
      return;
    }
    if (password !== confirmPassword) {
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
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error(err.response.data);
      setError("An error occurred during registration");
    }
  };

  return (
    <RegisterFormUI
      error={error}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default Register;
