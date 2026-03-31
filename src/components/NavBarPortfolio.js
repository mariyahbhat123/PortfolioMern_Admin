import React from "react";

export default function NavBarPortfolio() {
  return (
    <div
      className="flex justify-between  items-center bg-gradient-to-r from-[#C4AAF3] to-[#695aa6] text-white
  py-4 px-8"
    >
      <div className=" text-lg font-semibold">
        <p>Admin Portfolio</p>
      </div>
      <div>
        <img
          src=""
          alt=""
          className="rounded-full border border-[#C4AAF3] w-12 h-12"
        />
      </div>
    </div>
  );
}
