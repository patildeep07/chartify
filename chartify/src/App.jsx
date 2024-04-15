import Header from "./components/Header/Header";
import "./App.css";
import { Route, Routes } from "react-router";
import { Suspense, lazy, useContext } from "react";
import { AppContext } from "./context/AppProvider";
import Error from "./pages/Error/Error";
import Loading from "./components/Loading/Loading";

const Login = lazy(() => import("./pages/Login/Login"));
const BarChart = lazy(() => import("./pages/BarChart/BarChart"));
const LineChart = lazy(() => import("./pages/LineChart/LineChart"));
const Signup = lazy(() => import("./pages/Signup/Signup"));

function App() {
  const { isLoggedIn } = useContext(AppContext);
  return (
    <div className="App">
      <Header />

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
            path="/line-chart"
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
    </div>
  );
}

export default App;
