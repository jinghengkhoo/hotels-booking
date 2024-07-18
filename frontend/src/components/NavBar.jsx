import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = ({ textColor, currency, setCurrency }) => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsDropdownOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Determine the text color class
  const textColorClass = textColor === "white" ? "text-white" : "text-black";

  return (
    <div className={`navbar bg-transparent z-20 py-4 ${textColorClass}`}>
      <div className="flex justify-left items-center w-1/4 pl-16 relative">
        <button className="btn btn-ghost" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="mr-2" />
          <span className="font-normal">MENU</span>
        </button>
        {isOpen && user != null && (
          <div className="absolute top-full mt-1 ml-5">
            <Link to="/profile" onClick={toggleMenu}>
              Profile
            </Link>
          </div>
        )}
      </div>
      <div className="container mx-auto flex justify-center w-1/2">
        <Link to="/">
          <button className="btn btn-ghost text-center font-bold text-xl">
            Travelust
          </button>
        </Link>
      </div>
      <div className="flex justify-end items-center space-x-4 pr-4 w-1/4">
        <div
          className="dropdown dropdown-end justify-end"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost rounded-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {currency}
          </div>
          {isDropdownOpen && (
            <ul
              tabIndex="0"
              className="menu text-black dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => handleCurrencyChange("SGD")}>SGD</a>
              </li>
              <li>
                <a onClick={() => handleCurrencyChange("USD")}>USD</a>
              </li>
              <li>
                <a onClick={() => handleCurrencyChange("EUR")}>EUR</a>
              </li>
              <li>
                <a onClick={() => handleCurrencyChange("GBP")}>GBP</a>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <span>
            {user ? (
              <div>
                <p>{user.email}</p>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="btn btn-ghost">
                    <span className="font-normal">Login/Register</span>
                  </button>
                </Link>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  textColor: PropTypes.oneOf(["white", "black"]).isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func,
};

export default NavBar;
