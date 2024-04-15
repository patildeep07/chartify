import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
};

export const AppProvider = ({ children }) => {
  const reducerFunction = (state, action) => {
    console.log({ state, action });
  };

  const [appData, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <AppContext.Provider value={{ appData, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
