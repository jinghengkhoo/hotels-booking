import React from "react";
import GoogleIcon from "../../assets/icons/google.svg?react";
import AppleIcon from "../../assets/icons/apple.svg?react";
import FacebookIcon from "../../assets/icons/facebook.svg?react";

const RegisterFormUI = ({ formData, onChange, onSubmit }) => {
const { email, password } = formData;
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 rounded-lg shadow-xl flex max-w-4xl w-full">
        <div className="flex flex-col items-center justify-center w-1/2 rounded-l-lg">
          <img src="../../src/assets/register.jpg" alt="Illustration" className="h-full object-cover rounded-l-lg shadow-xl"/>
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Ready for your next adventure?</h2>
          <p className="mb-4">Create an account with your email</p>
          <form onSubmit={onSubmit}>
          <div className="mb-2">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="full Name"
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 btn btn-primary text-lg font-semibold rounded-lg shadow-md"
            >
              Continue
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-base-200"></div>
            <span className="flex-shrink text-gray-500 mx-4">or continue with</span>
            <div className="flex-grow h-px bg-base-200"></div>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="btn btn-base-200 font-semibold py-2 px-4 rounded-lg shadow-md">
              <GoogleIcon className="w-5 h-5 inline mr-2" /> Google
            </button>
            <button className="btn btn-base-200 font-semibold py-2 px-4 rounded-lg shadow-md">
            <AppleIcon className="w-5 h-5 inline mr-2" /> Apple
            </button>
            <button className="btn btn-base-200 font-semibold py-2 px-4 rounded-lg shadow-md">
              <FacebookIcon className="w-5 h-5 inline mr-2" /> Facebook
            </button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-500">
            By creating an account, you agree to our <a href="#" className="text-blue-600">Privacy Policy</a> and <a href="#" className="text-blue-600">Terms of Service</a>.
          </p>
          <p className="mt-4 text-sm text-center text-gray-500">
               Already have an account?{" "}
               <a href="#" className="text-primary">
                Sign in
              </a>
            </p>
        </div>
        
      </div>
    </div>

  );
};

export default RegisterFormUI;
