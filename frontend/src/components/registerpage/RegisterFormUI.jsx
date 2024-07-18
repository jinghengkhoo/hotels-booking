import PropTypes from "prop-types";

const RegisterFormUI = ({ error, formData, onChange, onSubmit, login }) => {
  const { email, password, confirmPassword } = formData;
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 rounded-lg shadow-xl flex max-w-5xl justify-center items-center">
        <div className="flex flex-col items-center justify-center w-1/2 rounded-l-lg h-1/2">
          <img
            src="../../src/assets/register.jpg"
            alt="Illustration"
            className="h-100 object-cover rounded-l-lg shadow-xl"
          />
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Ready for your next adventure?
          </h2>
          <p className="mb-4">Create an account with your email</p>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
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
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              {error && <div className="mb-4 text-red-600">{error}</div>}
              <button
                type="submit"
                className="w-full py-2 px-4 btn btn-primary text-lg font-semibold rounded-lg shadow-md"
              >
                Continue
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="" className="text-blue-600">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="" className="text-blue-600">
              Terms of Service
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <button onClick={login} className="text-primary">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

RegisterFormUI.propTypes = {
  error: PropTypes.string,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterFormUI;
