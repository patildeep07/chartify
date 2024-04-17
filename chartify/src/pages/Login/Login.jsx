import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

const Login = () => {
  const { loginUser, dispatch } = useContext(AppContext);
  // Logic
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  // History
  useEffect(() => {
    const path = window.location.href.replace("http://localhost:3000", "");
    dispatch({ type: "STORE_PATH", payload: path });
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    const loginMail = userDetails.email.replace(/\s/g, "");
    const loginPassword = userDetails.password.replace(/\s/g, "");
    const loginDetails = { email: loginMail, password: loginPassword };

    if (loginMail.length && loginPassword.length > 0) {
      loginUser(loginDetails);
    }
  };

  // UI
  return (
    <div>
      <form
        onSubmit={loginHandler}
        className="mx-auto my-10 flex min-h-fit max-w-[90%] flex-col items-start justify-start gap-5 rounded-lg border border-gray-400 px-10 py-7 sm:max-w-fit"
      >
        <h1 className="self-center text-2xl font-bold">Login</h1>

        <div className="flex flex-col  self-center ">
          <h2 className=" self-center text-xl font-semibold ">
            Welcome to Chartify
          </h2>
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter"
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails({ ...userDetails, email: e.target.value });
            }}
            className="my-1 w-full  sm:w-[35vw] sm:min-w-[25vw] sm:max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter"
            value={userDetails.password}
            onChange={(e) => {
              setUserDetails({
                ...userDetails,
                password: e.target.value,
              });
            }}
            className="my-1 w-full sm:w-[35vw] sm:min-w-[25vw] sm:max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
          />
        </div>

        <button
          value="submit"
          type="submit"
          className="w-full self-center rounded-md bg-black px-5 py-2 tracking-wider text-white"
        >
          LOGIN
        </button>

        <div className="border-gray-500-900 w-full border"></div>

        <p className="self-center text-gray-600">
          Dont have an account?{" "}
          <span className="mx-1 cursor-pointer font-semibold text-black">
            <Link to={"/signup"}>SIGNUP</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default memo(Login);
