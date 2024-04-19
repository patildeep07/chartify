import { createContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { getTime } from "../utils/utils";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // Get Cookies
  const loggedInState = Boolean(Cookies.get("isLoggedIn"));
  const userState = Cookies.get("user");
  const userStateJson = userState ? JSON.parse(userState) : null;

  // Initial state
  const initialState = {
    isLoggedIn: loggedInState ?? false,
    userDetails: userStateJson ?? {},
    barChartData: [],
    lineChartData: {},
    path: "/",
    serverStatus: "Trying to connect...",
  };

  const reducerFunction = (state, action) => {
    // console.log({ state, action });
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

      case "SET_LINE_CHART_DATA":
        return {
          ...state,
          lineChartData: action.payload,
        };

      case "SET_CHART_DATA":
        return {
          ...state,
          barChartData: action.payload.barChartData,
          lineChartData: action.payload.lineChartData,
        };

      case "STORE_PATH":
        return {
          ...state,
          path: action.payload,
        };

      case "UPDATE_SERVER_STATUS":
        return {
          ...state,
          serverStatus: action.payload,
        };

      default:
        return state;
    }
  };

  const [appData, dispatch] = useReducer(reducerFunction, initialState);

  // Boot server

  const bootServer = async () => {
    try {
      const response = await axios.get("https://chartify-i7z8.onrender.com/");

      if (response) {
        dispatch({ type: "UPDATE_SERVER_STATUS", payload: "Connected!" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server down!");
      dispatch({ type: "UPDATE_SERVER_STATUS", payload: "Not connected!" });
    }
  };

  // Create new user
  const createNewUser = async (userDetails) => {
    try {
      const response = await axios.post(
        "https://chartify-i7z8.onrender.com/users/signup",
        userDetails
      );

      const { data, status } = response;

      console.log(response.data);

      if (status === 201) {
        console.log(data.message, data.newUser);
        toast.success("Registered. Proceed to log in!");
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
        "https://chartify-i7z8.onrender.com/users/login",
        userDetails
      );

      const { data, status } = response;

      if (status === 200) {
        dispatch({ type: "SET_USER", payload: { user: data.user } });
        Cookies.set("isLoggedIn", true);
        Cookies.set("user", JSON.stringify(data.user));

        toast.success("Logged In");

        if (appData.path === "/login") {
          navigate("/");
        } else {
          navigate(appData.path);
        }
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
  const fetchData = async (
    filterMethods = {
      Age: "all",
      Gender: "all",
      StartDate: "2022-10-04",
      EndDate: "2022-10-29",
    }
  ) => {
    try {
      const response = await axios.get(
        "https://chartify-i7z8.onrender.com/posts",
        filterMethods
      );

      if (response) {
        const data = response.data.data;

        const { Age, Gender, StartDate, EndDate } = filterMethods;

        const startTime = new Date(StartDate).getTime();
        const endTime = new Date(EndDate).getTime();

        const filteredData = data
          .filter((entry) => (Age === "all" ? true : entry.Age === Age))
          .filter((entry) =>
            Gender === "all" ? true : entry.Gender === Gender
          )
          .filter((entry) => {
            const entryTime = getTime(entry.Day);
            return startTime <= entryTime && entryTime <= endTime;
          });

        // Processing data for bar chart
        const barData = filteredData.reduce(
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
          (value / filteredData.length).toFixed(0)
        );

        // dispatch({
        //   type: "SET_BAR_CHART_DATA",
        //   payload: { barDataValues, barDataLabels },
        // });
        // console.log({ barDataValues });

        // Data for line chart
        const lineData = filteredData.reduce(
          (acc, curr) => {
            if (acc.A[curr.Day]) {
              return {
                ...acc,
                A: {
                  ...acc.A,
                  [curr.Day]: [...acc.A[curr.Day], curr.A],
                },
                B: {
                  ...acc.B,
                  [curr.Day]: [...acc.B[curr.Day], curr.B],
                },
                C: {
                  ...acc.C,
                  [curr.Day]: [...acc.C[curr.Day], curr.C],
                },
                D: {
                  ...acc.D,
                  [curr.Day]: [...acc.D[curr.Day], curr.D],
                },
                E: {
                  ...acc.E,
                  [curr.Day]: [...acc.E[curr.Day], curr.E],
                },
                F: {
                  ...acc.F,
                  [curr.Day]: [...acc.F[curr.Day], curr.F],
                },
              };
            } else {
              return {
                ...acc,
                A: {
                  ...acc.A,
                  [curr.Day]: [curr.A],
                },
                B: {
                  ...acc.B,
                  [curr.Day]: [curr.B],
                },
                C: {
                  ...acc.C,
                  [curr.Day]: [curr.C],
                },
                D: {
                  ...acc.D,
                  [curr.Day]: [curr.D],
                },
                E: {
                  ...acc.E,
                  [curr.Day]: [curr.E],
                },
                F: {
                  ...acc.F,
                  [curr.Day]: [curr.F],
                },
              };
            }
          },
          { A: {}, B: {}, C: {}, D: {}, E: {}, F: {} }
        );

        // dispatch({ type: "SET_LINE_CHART_DATA", payload: lineData });

        dispatch({
          type: "SET_CHART_DATA",
          payload: {
            barChartData: { barDataValues, barDataLabels },
            lineChartData: lineData,
          },
        });

        // console.log({ lineData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        appData,
        dispatch,
        createNewUser,
        loginUser,
        fetchData,
        bootServer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
