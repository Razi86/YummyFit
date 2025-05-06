import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";

function Navbar() {
  const { handleLogout, user } = useContext(AuthContext);
  const isLoggedIn = user && user.email;
  return (
    <div className="flex justify-between items-center px-10 z-3 relative">
      <div className="left w-full flex-1/2 flex-wrap flex items-center">
        <div className="">
          <NavLink to="/">
            <img src={logo} alt="YummyFit Logo" className="h-35 w-40" />
          </NavLink>
        </div>
        <div className="ml-10">
          <ul className="menu menu-horizontal px-1 gap-2 amatic-sc-bold text-2xl">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
              <span className="navber-icon text-lg">🏠</span>Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/food"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
              <span className="navber-icon text-lg">🍴</span> Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
               <span className="navber-icon text-lg">ℹ️</span> About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "active-link" : "menu-link"
                }
              >
               <span className="navber-icon text-lg">📞</span> Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="right flex items-center gap-5">
        <div className="welcome">
          {isLoggedIn ? (
            <p className="text-lg font-bold text-[#1A1A1A]">
              Welcome, {user.username}
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn w-15 h-15 rounded-full bg-gray-100 border border-[#E3F5ED] text-black"
          >
            Image
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-[#FFFFFF] rounded-box z-1 w-52 p-2 shadow-sm"
          >
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to={"/profile"}>Profile</NavLink>
                </li>
                <li>
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li>
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
<nav>

</nav>

export default Navbar;
