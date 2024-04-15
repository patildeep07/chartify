import { createContext, useReducer } from "react";
import axios from "axios";

export const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
};

export const AppProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    console.log({ state, action });
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
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AppContext.Provider value={{ appData, dispatch, createNewUser }}>
      {children}
    </AppContext.Provider>
  );
};
