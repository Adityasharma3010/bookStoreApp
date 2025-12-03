import React from "react";
import Home from "./pages/Home";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Courses from "./pages/Courses";
import SignupPage from "./pages/Signup";
import Contact from "./pages/Contact";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./components/context/AuthProvider";
const App = () => {
  const [authUser, setAuthUser] = useAuth();
  const location = useLocation();

  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={
              authUser ? (
                <Courses />
              ) : (
                <Navigate to="/signup" state={{ from: location }} />
              )
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
