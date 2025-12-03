import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "./context/AuthProvider"; // added

const Login = ({ prevPath, onSignupClick, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // allow updating auth context on successful login so no full reload is needed
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // no navigation hooks here — closing will only close the modal

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await api
      .post("/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Logged in Successful");
          // persist and update auth context so app shows logged-in state immediately
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          setAuthUser(res.data.user);
          handleClose();
          // If the login was opened from the signup page, close the signup route too:
          // go back one entry so user returns to the page that opened signup.
          if (location.pathname === "/signup") {
            // navigate back in history (will render the previous page; protected routes will now work)
            navigate(-1);
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };

  // Handle modal close — ONLY close the modal / inform parent, do NOT navigate
  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      const modal = document.getElementById("my_modal_3");
      if (modal) modal.close();
    }
    // intentionally no navigation here
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box dark:bg-slate-900 dark:text-white">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2 dark:hover:bg-slate-600 dark:text-white focus-visible:outline-none"
            onClick={handleClose}
          >
            ✕
          </button>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <h3 className="text-lg font-bold">Login</h3>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email </span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-1 border rounded-md outline-none w-80 dark:bg-slate-900 dark:text-white"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password </span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="px-3 py-1 border rounded-md outline-none w-80 dark:bg-slate-900 dark:text-white"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button className="px-3 py-1 text-white duration-200 bg-pink-500 rounded-md hover:bg-pink-700">
                Login
              </button>
              <p>
                Not registered?{" "}
                {onSignupClick ? (
                  <span
                    onClick={onSignupClick}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    Signup
                  </span>
                ) : (
                  <Link
                    to="/signup"
                    className="text-blue-500 underline cursor-pointer"
                  >
                    Signup
                  </Link>
                )}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
