import { createContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
  userDetails: {},
  barChartData: [],
  lineChartData: [],
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

      case "SET_BAR_CHART_DATA":
        return {
          ...state,
          barChartData: action.payload,
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

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");

      if (response) {
        const data = response.data.data;

        // Processing data for bar chart
        const barData = data.reduce(
          (acc, curr) => {
            return {
              ...acc,
              A: acc["A"] + Number(curr["A"]),
              B: acc["B"] + Number(curr["B"]),
              C: acc["C"] + Number(curr["C"]),
              D: acc["D"] + Number(curr["D"]),
              E: acc["E"] + Number(curr["E"]),
              F: acc["F"] + Number(curr["F"]),
            };
          },
          { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 }
        );

        const barDataLabels = Object.keys(barData);
        const barDataValues = Object.values(barData).map((value) =>
          (value / data.length).toFixed(0)
        );

        dispatch({
          type: "SET_BAR_CHART_DATA",
          payload: { barDataValues, barDataLabels },
        });
        // console.log({ barDataArray });

        // Data for line chart
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{ appData, dispatch, createNewUser, loginUser, fetchData }}
    >
      {children}
    </AppContext.Provider>
  );
};
