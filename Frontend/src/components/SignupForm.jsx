import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import api from "../api/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // remember page that opened signup (if any) — compute before onSubmit
  const prevPath = location.state?.from?.pathname ?? null;

  // read and update auth so app reacts immediately when user signs up
  const [authUser, setAuthUser] = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await api.post("/user/signup", userInfo);
      if (res?.data) {
        // save user first so app sees the auth state immediately
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        // update auth context so app updates without a full reload
        setAuthUser(res.data.user);

        toast.success("Signup Successful");

        // prefer returning to the recorded prevPath when present
        if (prevPath) {
          // avoid redirect loop back to protected page if still unauthenticated
          if (prevPath === "/course" && !authUser) {
            navigate("/", { replace: true });
          } else {
            navigate(prevPath);
          }
          return;
        }

        // fallback to `from` (location.state?.from?.pathname || "/")
        const target = location.state?.from?.pathname || "/";
        navigate(target);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  // Handle modal close - go back to the true origin when possible
  const handleClose = () => {
    // compute whether browser history has previous entries
    const hasHistory =
      window.history.state && typeof window.history.state.idx === "number"
        ? window.history.state.idx > 0
        : window.history.length > 1;

    // If we have a recorded previous pathname, try to go there.
    if (prevPath) {
      // If the origin was the protected /course route, avoid redirect loop:
      // - if we can step back two entries (skip the redirect to /signup), do that
      // - otherwise if user not authenticated, fall back to home
      if (prevPath === "/course") {
        const canGoBackTwo =
          window.history.state && typeof window.history.state.idx === "number"
            ? window.history.state.idx > 1
            : window.history.length > 2;

        if (canGoBackTwo) {
          navigate(-2);
          return;
        }

        if (!authUser) {
          navigate("/", { replace: true });
          return;
        }
      }

      // default: navigate directly to the recorded previous pathname
      navigate(prevPath);
      return;
    }

    // No recorded prevPath: use history back if possible, else go home
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  // control login modal with React state
  const [loginOpen, setLoginOpen] = useState(false);

  const openLoginModal = () => {
    setLoginOpen(true);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  // keep the native <dialog> (inside Login) in sync with React state
  useEffect(() => {
    const dialog = document.getElementById("my_modal_3");
    if (!dialog) return;

    const handleDialogClose = () => setLoginOpen(false);

    if (loginOpen) {
      dialog.showModal?.();
    } else {
      // close if it's open
      try {
        dialog.close?.();
      } catch (e) {}
    }

    dialog.addEventListener("close", handleDialogClose);
    return () => dialog.removeEventListener("close", handleDialogClose);
  }, [loginOpen]);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-[600px]">
          <div className="modal-box dark:bg-slate-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <button
                type="button"
                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2 dark:hover:bg-slate-600 dark:text-white focus-visible:outline-none"
                onClick={handleClose}
              >
                ✕
              </button>

              <h3 className="text-lg font-bold">Signup</h3>
              {/* Name */}
              <div className="mt-4 space-y-2">
                <span>Name </span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="px-3 py-1 border rounded-md outline-none w-80 dark:bg-slate-900 dark:text-white"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
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
                  Signup
                </button>
                <div className="text-xl">
                  Have Account?{" "}
                  <span
                    className="text-blue-500 underline cursor-pointer"
                    onClick={openLoginModal}
                  >
                    Login
                  </span>
                </div>
              </div>
            </form>

            {/* pass prevPath AND closeLoginModal into Login */}
            <Login
              prevPath={prevPath}
              onSignupClick={closeLoginModal}
              onClose={closeLoginModal}
              open={loginOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
