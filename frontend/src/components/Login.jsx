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

    // <div className="flex h-screen items-center justify-center bg-gray-100">
    //   <div className="bg-white rounded-xl shadow-lg flex max-w-4xl w-full">
    //     <div className="bg-purple-600 text-white rounded-l-xl flex flex-col items-center justify-center p-8 w-1/2">
    //       <h1 className="text-4xl font-bold mb-4">travelust</h1>
    //       <p className="text-lg mb-4">Ready for your next adventure?</p>
    //       <p className="text-2xl font-bold mb-4">
    //         Learn From World&apos;s Best Instructors Around The World.
    //       </p>
    //       <img src="path_to_your_image" alt="Illustration" className="mt-4" />
    //     </div>
    //     <div className="p-8 w-1/2">
    //       <h2 className="text-2xl font-bold mb-6">Create Account</h2>
    //       <form className="space-y-4" onSubmit={onSubmit}>
    //         <div>
    //           <label
    //             className="block text-gray-700 text-sm font-bold mb-2"
    //             htmlFor="fullName"
    //           >
    //             Full Name
    //           </label>
    //           <input
    //             type="text"
    //             id="fullName"
    //             placeholder="Full Name"
    //             onChange={onChange}
    //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           />
    //         </div>
    //         <div>
    //           <label
    //             className="block text-gray-700 text-sm font-bold mb-2"
    //             htmlFor="email"
    //           >
    //             Email Address
    //           </label>
    //           <input
    //             type="email"
    //             id="email"
    //             placeholder="Email Address"
    //             onChange={onChange}
    //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           />
    //         </div>
    //         <div>
    //           <label
    //             className="block text-gray-700 text-sm font-bold mb-2"
    //             htmlFor="password"
    //           >
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             id="password"
    //             placeholder="Password"
    //             onChange={onChange}
    //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //           />
    //         </div>
    //         <div className="flex items-center">
    //           <input
    //             type="checkbox"
    //             className="form-checkbox text-purple-600"
    //           />
    //           <label className="ml-2 text-gray-700 text-sm">
    //             I agree to the{" "}
    //             <a href="#" className="text-purple-600">
    //               terms of service
    //             </a>{" "}
    //             and{" "}
    //             <a href="#" className="text-purple-600">
    //               privacy policy
    //             </a>
    //           </label>
    //         </div>
    //         <button
    //           type="submit"
    //           className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    //         >
    //           Sign Up
    //         </button>
    //       </form>
    //       <div className="mt-6 text-center">
    //         <p className="text-gray-500">Or Sign Up With</p>
    //         <div className="flex justify-center space-x-4 mt-2">
    //           <a href="#" className="text-gray-500">
    //             <i className="fab fa-google"></i>
    //           </a>
    //           <a href="#" className="text-gray-500">
    //             <i className="fab fa-facebook"></i>
    //           </a>
    //           <a href="#" className="text-gray-500">
    //             <i className="fab fa-instagram"></i>
    //           </a>
    //           <a href="#" className="text-gray-500">
    //             <i className="fab fa-twitter"></i>
    //           </a>
    //           <a href="#" className="text-gray-500">
    //             <i className="fab fa-linkedin"></i>
    //           </a>
    //         </div>
    //       </div>
    //       <div className="mt-4 text-center">
    //         <p className="text-gray-500">
    //           Already have an account?{" "}
    //           <a href="#" className="text-purple-600">
    //             Sign in
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
