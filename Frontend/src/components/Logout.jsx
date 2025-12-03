import React from "react";
import { useAuth } from "./context/AuthProvider";
import toast from "react-hot-toast";

const Logout = () => {
  // only need the setter to update auth context
  const [, setAuthUser] = useAuth();

  const handleLogout = () => {
    try {
      // clear auth context and storage so app updates immediately without reload
      setAuthUser(null);
      localStorage.removeItem("Users");
      toast.success("Logout successfully");
      // intentionally no window.location.reload() — UI should react to auth change
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <>
      <button
        className="px-3 py-2 text-white bg-red-500 rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
