import React from "react";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyles = ({ isActive }) =>
    isActive ? { color: "blue", fontWeight: "bold" } : { color: "black" };
  return (
    <div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-5 px-14 py-3 text-center sm:flex-row sm:flex-nowrap sm:items-baseline sm:justify-between sm:text-start">
        <div className="flex-grow basis-full">
          <NavLink to={"/"}>
            <h1 className="cursor-pointer  text-3xl font-bold">Chartify</h1>
          </NavLink>
        </div>

        <div className="flex-grow">
          <div className="flex  flex-wrap justify-center  gap-20 font-semibold sm:flex-nowrap sm:justify-between">
            <NavLink style={activeStyles} to={"/"}>
              Home
            </NavLink>
            <NavLink style={activeStyles} to={"/login"}>
              Login
            </NavLink>
            <NavLink style={activeStyles} to={"/signup"}>
              Signup
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
