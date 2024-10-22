const LoginFormUI = ({ error, formData, onChange, onSubmit, register }) => {
  const { email, password } = formData;
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 rounded-lg shadow-xl flex max-w-4xl w-full">
        <div className="flex flex-col items-center justify-center w-1/2 rounded-l-lg">
          <img
            src="../../src/assets/login.jpg"
            alt="Illustration"
            className="h-full object-cover rounded-l-lg shadow-xl"
          />
        </div>
        <div className="p-8 w-1/2">
          <h2 className="text-2xl font-bold mb-4">Continue your adventure</h2>
          <p id="loginPage" className="mb-4">
            Login with your email
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <label htmlFor="email-field" className="block text-gray-700">
                Email
              </label>
              <input
                id="email-field"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password-field" className="block text-gray-700">
                Password
              </label>
              <input
                id="password-field"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-base-100 border border-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            {error && (
              <div id="errorMessage" className="mb-4 text-red-600">
                {error}
              </div>
            )}
            <button
              id="loginButton"
              type="submit"
              className="w-full py-2 px-4 btn btn-primary text-lg font-semibold rounded-lg shadow-md"
            >
              Continue
            </button>
          </form>
          <div>
            <p className="mt-8 text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <button
                onClick={register}
                id="signUpButton"
                className="text-primary"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormUI;
