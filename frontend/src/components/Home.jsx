import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import DestinationSearch from "./DestinationSearch";
import NavBar from './NavBar'; // Ensure the path is correct


const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <div>
        {user ? (
          <>
            <p>Logged in as {user.email}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
      <NavBar />
      <DestinationSearch />
    </div>
  );
};

export default Home;
