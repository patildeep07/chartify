import { createContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
  userDetails: {},
};

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const reducerFunction = (state, action) => {
    console.log({ state, action });
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          isLoggedIn: true,
          userDetails: action.payload.user,
        };

      case "LOGOUT_USER":
        return {
          ...state,
          isLoggedIn: false,
          userDetails: {},
        };

      default:
        return state;
    }
  };

  const [appData, dispatch] = useReducer(reducerFunction, initialState);

  // Create new user
  const createNewUser = async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        userDetails
      );

      const { data, status } = response;

      console.log(response.data);

      if (status === 201) {
        console.log(data.message, data.newUser);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  // Login user
  const loginUser = async (userDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        userDetails
      );

      const { data, status } = response;

      if (status === 200) {
        dispatch({ type: "SET_USER", payload: { user: data.user } });
        navigate("/");
      }

      if (status === 401) {
        console.log({ error: "Incorrect password" });
      }
    } catch (error) {
      const { response } = error;
      console.log({ error: response.data.error });
    }
  };

  return (
    <AppContext.Provider
      value={{ appData, dispatch, createNewUser, loginUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
