import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useAuth } from "./context/AuthProvider";

const Navbar = () => {
  const [authUser, setAuthUser] = useAuth();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link
          to="/"
          className="focus:dark:text-white hover:dark:bg-[#ffffff1a]"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/course"
          className="focus:dark:text-white hover:dark:bg-[#ffffff1a]"
        >
          Course
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="focus:dark:text-white hover:dark:bg-[#ffffff1a]"
        >
          Contact
        </Link>
      </li>
      <li>
        <Link to="" className="focus:dark:text-white hover:dark:bg-[#ffffff1a]">
          About
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0  z-50 dark:bg-slate-900 dark:text-white ${
          sticky
            ? "sticky-navbar shadow-md bg-base-200 dark:bg-slate-600 dark:text-white duration-300 transition-all ease-in-out"
            : ""
        }`}
      >
        <div className="container px-4 mx-auto md:px-20 max-w-screen-2xl">
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-slate-600 dark:text-white"
                >
                  {navItems}
                </ul>
              </div>
              <a href="/" className="text-2xl font-bold cursor-pointer">
                bookStore
              </a>
            </div>
            <div className="space-x-3 navbar-end">
              <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">{navItems}</ul>
              </div>
              <div className="hidden bg-white rounded-md dark:bg-slate-900 dark:text-white md:block">
                <label className="flex items-center gap-2 px-3 py-2 border rounded-md">
                  <input
                    type="text"
                    className="outline-none dark:bg-slate-900 dark:text-white grow"
                    placeholder="Search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                  checked={theme === "dark"}
                  onChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                />

                {/* sun icon */}
                <svg
                  className="w-8 h-8 fill-current swap-off"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="w-8 h-8 fill-current swap-on"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              {authUser ? (
                <Logout />
              ) : (
                <div className="">
                  <a
                    className="px-3 py-2 text-white duration-300 bg-black rounded-md cursor-pointer hover:bg-slate-800 dark:bg-white dark:text-black hover:dark:bg-slate-200"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </a>
                  <Login />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
