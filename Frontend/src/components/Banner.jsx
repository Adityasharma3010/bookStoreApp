import React from "react";
import BannerImg from "../assets/Banner.png";

const Banner = () => {
  return (
    <>
      <div className="container flex flex-col items-center px-4 mx-auto my-10 max-w-screen-2xl md:px-20 md:flex-row ">
        <div className="flex flex-col order-2 w-full gap-6 md:w-1/2 md:order-1">
          <div className="flex flex-col gap-6 mt-12 md:mt-32">
            <h1 className="text-4xl font-bold">
              Hello, welcomes here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-xl font-normal">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!
            </p>
          </div>
          <div className="flex flex-col items-start gap-6">
            <label className="flex items-center w-full gap-2 border rounded-md input input-bordered focus:outline-none focus-within:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-100"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="outline-none grow"
                placeholder="Email"
              />
            </label>
            <button className="btn btn-secondary">Sumbit</button>
          </div>
        </div>
        <div className="flex justify-center order-1 w-full mt-20 md:w-1/2 md:order-2">
          <img
            src={BannerImg}
            alt="Banner Img"
            className="md:w-[550px] md:h-[460px] md:ml-12"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
