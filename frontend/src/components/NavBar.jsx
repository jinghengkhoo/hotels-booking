import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <div className="navbar bg-base-300 text-blue py-4">
      <div className="flex justify-left items-center w-1/4 pl-16">
        <button className="btn btn-ghost">
          <FontAwesomeIcon icon={faBars} className="mr-2" />
          <span className="font-semibold">MENU</span>
        </button>
      </div>
      <div className="container mx-auto flex justify-center w-1/2">
        <div className="text-center font-bold text-xl">travelust</div>
      </div>
      <div className="flex justify-end items-center space-x-4 pr-4 w-1/4">
        <div className="dropdown dropdown-end justify-end">
          <div tabIndex="0" role="button" className="btn btn-ghost rounded-btn">
            {currency}
          </div>
          <ul
            tabIndex="0"
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => handleCurrencyChange("USD")}>USD</a>
            </li>
            <li>
              <a onClick={() => handleCurrencyChange("SGD")}>SGD</a>
            </li>
            <li>
              <a onClick={() => handleCurrencyChange("EUR")}>EUR</a>
            </li>
            <li>
              <a onClick={() => handleCurrencyChange("GBP")}>GBP</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          <span>
            {user ? (
              <>
                <p>{user.email}</p>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-ghost">Login/Register</button>
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
