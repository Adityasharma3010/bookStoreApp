import React from "react";

const Cards = ({ item }) => {
  return (
    <>
      <div className="flex flex-col p-3 my-10 mt-4">
        <div className="duration-200 shadow-xl card w-92 bg-base-100 hover:scale-105 dark:bg-slate-900 dark:text-white dark:border grow">
          <figure>
            <img src={item.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.catagory}</div>
            </h2>
            <p>{item.title}</p>
            <div className="justify-between card-actions items-center">
              <div className="badge badge-outline cursor-default">${item.price}</div>
              <div className="px-3 py-1 duration-200 border-2 rounded-full cursor-pointer hover:bg-pink-500 hover:text-white">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
