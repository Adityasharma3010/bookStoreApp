import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <div className="flex items-center justify-center h-screen px-4">
        <div className="w-[500px]">
          <div className="dark:bg-slate-900 dark:text-white">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              {/* Name */}
              <div className="mt-4 space-y-1.5">
                <span>Name </span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                  {...register("name", { required: true })}
                />
                <br />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-1.5">
                <span>Email </span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Message */}
              <div className="mt-4 space-y-1.5">
                <span>Message </span>
                <br />
                <textarea
                  rows="3"
                  placeholder="Type your messgae"
                  className="w-full px-3 py-1 border border-[#e5e7eb] rounded-md outline-none textarea-bordered textarea dark:bg-slate-900 dark:text-white"
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
              <div className="flex mt-4">
                <button className="px-3 py-2 text-white duration-200 bg-blue-500 rounded-md hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
