import React, { useContext } from "react";
import { memo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const Header = () => {
  // Context
  const { appData, dispatch } = useContext(AppContext);
  const { isLoggedIn } = appData;

  // useNavigate
  const navigate = useNavigate();

  // Styles
  const activeStyles = ({ isActive }) =>
    isActive ? { color: "blue", fontWeight: "bold" } : { color: "black" };
  return (
    <div>
      <div className="flex border-b border-slate-800 flex-col flex-wrap items-center justify-center gap-5 px-14 py-3 text-center sm:flex-row sm:flex-nowrap sm:items-baseline sm:justify-between sm:text-start">
        <div className="flex-grow basis-full">
          <NavLink to="/">
            <h1 className="cursor-pointer  text-3xl font-bold">Chartify</h1>
          </NavLink>
        </div>

        <div className="flex-grow">
          <div className="flex  flex-wrap justify-center  gap-20 font-semibold sm:flex-nowrap sm:justify-between">
            <NavLink style={activeStyles} to={"/"}>
              Home
            </NavLink>

            {!isLoggedIn && (
              <NavLink style={activeStyles} to={"/login"}>
                Login
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink style={activeStyles} to={"/signup"}>
                Signup
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink style={activeStyles} to={"/line-chart/C"}>
                LineChart
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink onClick={() => dispatch({ type: "LOGOUT_USER" })}>
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
