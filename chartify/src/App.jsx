import Header from "./components/Header/Header";
import "./App.css";
import { Route, Routes } from "react-router";
import { Suspense, lazy, useContext, useEffect } from "react";
import { AppContext } from "./context/AppProvider";
import Error from "./pages/Error/Error";
import Loading from "./components/Loading/Loading";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/Login/Login"));
const BarChart = lazy(() => import("./pages/BarChart/BarChart"));
const LineChart = lazy(() => import("./pages/LineChart/LineChart"));
const Signup = lazy(() => import("./pages/Signup/Signup"));

function App() {
  window.document.title = "Chartify";

  const { appData, bootServer } = useContext(AppContext);
  const { isLoggedIn, serverStatus } = appData;

  // Boot server

  useEffect(() => {
    bootServer();
  }, []);

  return (
    <div className="App">
      <Header />

      <h1 className={`text-center my-4 sm:text-right mx-10 `}>
        Server status:{" "}
        <span
          className={`${
            serverStatus === "Connected!" ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {serverStatus}
        </span>
      </h1>

      <Routes>
        {/* Bar Chart navigation */}

        {isLoggedIn && (
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <BarChart />
              </Suspense>
            }
          />
        )}

        {!isLoggedIn && (
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
        )}

        {/* Line Chart navigation */}
        {isLoggedIn && (
          <Route
            path="/line-chart/:featureId"
            element={
              <Suspense fallback={<Loading />}>
                <LineChart />
              </Suspense>
            }
          />
        )}

        {!isLoggedIn && (
          <Route
            path="/line-chart"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
        )}

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          }
        />

        <Route path="/*" element={<Error />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
