import React, { memo, useContext, useEffect, useRef } from "react";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import Cookies from "js-cookie";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  elements,
} from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
  elements
);

const BarChart = () => {
  // Navigation
  const navigate = useNavigate();

  // Context
  const { fetchData, appData } = useContext(AppContext);
  const { barChartData } = appData;

  // Bar chart

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Feature analysis",
      },
      legend: {
        display: false,
      },
    },
  };

  const { barDataLabels, barDataValues } = barChartData;

  const labels = barDataLabels;

  const data = {
    labels,
    datasets: [
      {
        label: "Feature analysis",
        data: barDataValues,
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  };

  // Get curr event

  const chartRef = useRef();
  const barClickHandler = (e) => {
    if (getElementAtEvent(chartRef.current, e).length > 0) {
      const dataIndex = getElementAtEvent(chartRef.current, e)[0].index;
      const element = data.labels[dataIndex];

      console.log({ element });
      navigate(`/line-chart/${element}`);
    }
  };

  // Filters:
  const filterCookie = Cookies.get("filters");
  const filterCookieJson = filterCookie ? JSON.parse(filterCookie) : {};

  // Using url for filters
  const [searchParams, setSearchParams] = useSearchParams();

  // Default filters
  const defaultFilters = {
    Age: "all",
    Gender: "all",
    StartDate: "2022-10-03",
    EndDate: "2022-10-29",
  };

  const filterAgeParam =
    searchParams.get("Age") ?? filterCookieJson.Age ?? defaultFilters.Age;
  // console.log({ filterAgeParam });

  const filterGenderParam =
    searchParams.get("Gender") ??
    filterCookieJson.Gender ??
    defaultFilters.Gender;
  // console.log({ filterGenderParam });

  const filterStartDateParam =
    searchParams.get("StartDate") ??
    filterCookieJson.StartDate ??
    defaultFilters.StartDate;

  const filterEndDateParam =
    searchParams.get("EndDate") ??
    filterCookieJson.EndDate ??
    defaultFilters.EndDate;

  // get Data
  const getData = () => {
    fetchData({
      Age: filterAgeParam,
      Gender: filterGenderParam,
      StartDate: filterStartDateParam,
      EndDate: filterEndDateParam,
    });
  };

  const filterHandler = () => {
    getData();

    // Pushing filters to cookies
    Cookies.set(
      "filters",
      JSON.stringify({
        Age: filterAgeParam,
        Gender: filterGenderParam,
        StartDate: filterStartDateParam,
        EndDate: filterEndDateParam,
      })
    );

    toast.success("Applied filters!");
  };

  // Remove filter cookies
  const resetPreferences = () => {
    Cookies.remove("filters");
    toast.success("Preferences removed.");

    fetchData(defaultFilters);
  };

  // Share Url
  const shareUrl = () => {
    const linkToCopy = window.location.href;
    navigator.clipboard.writeText(linkToCopy);
    toast.success("Link copied!");
  };

  // Fetching Data
  useEffect(() => {
    // Fetching filter cookies

    getData();
  }, []);

  return (
    <div className="my-10 flex justify-center items-center flex-col gap-10">
      <h1 className="font-semibold text-3xl">Bar Chart</h1>

      <div className="min-w-[80%] max-w-[95%] sm:min-h-[60dvh] sm:max-h-[70dvh] flex justify-center">
        <Bar
          data={data}
          options={options}
          onClick={barClickHandler}
          ref={chartRef}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col  sm:flex-row sm:flex-wrap sm:items-center gap-10">
        <div className="flex gap-5 justify-center items-center">
          <label>Age:</label>
          <select
            value={filterAgeParam}
            onChange={(e) =>
              setSearchParams(
                createSearchParams({
                  Age: e.target.value,
                  Gender: filterGenderParam,
                  StartDate: filterStartDateParam,
                  EndDate: filterEndDateParam,
                })
              )
            }
            className="border-slate-900  rounded-[5px] border"
          >
            <option value={"all"}>All</option>
            <option value={"15-25"}>15-25 years</option>
            <option value={">25"}>25+ years</option>
          </select>
        </div>

        <div className="flex justify-center  gap-5 items-center">
          <label>Gender:</label>
          <select
            value={filterGenderParam}
            onChange={(e) =>
              setSearchParams(
                createSearchParams({
                  Age: filterAgeParam,
                  Gender: e.target.value,
                  StartDate: filterStartDateParam,
                  EndDate: filterEndDateParam,
                })
              )
            }
            className="border-slate-900 rounded-[5px] border"
          >
            <option value={"all"}>All</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
          </select>
        </div>

        <div className="flex justify-center gap-5 items-center">
          <label>Start Date:</label>
          <input
            type="date"
            min={"2022-10-04"}
            max={"2022-10-29"}
            defaultValue={filterStartDateParam}
            onChange={(e) =>
              setSearchParams(
                createSearchParams({
                  Age: filterAgeParam,
                  Gender: filterGenderParam,
                  StartDate: e.target.value,
                  EndDate: filterEndDateParam,
                })
              )
            }
            className="border-slate-900 py-1 px-2 rounded-[5px] border"
          />
        </div>

        <div className="flex justify-center gap-5 items-center">
          <label>End Date:</label>
          <input
            type="date"
            min={"2022-10-04"}
            max={"2022-10-29"}
            defaultValue={filterEndDateParam}
            onChange={(e) =>
              setSearchParams(
                createSearchParams({
                  Age: filterAgeParam,
                  Gender: filterGenderParam,
                  StartDate: filterStartDateParam,
                  EndDate: e.target.value,
                })
              )
            }
            className="border-slate-900 py-1 px-2 rounded-[5px] border"
          />
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={filterHandler}
          className="border font-semibold rounded-sm bg-slate-300 hover:bg-slate-400 transition-all ease-in-out duration-500 border-slate-900 px-3 py-2"
        >
          Apply Filter
        </button>

        <button
          onClick={resetPreferences}
          className="border font-semibold rounded-sm bg-slate-300 hover:bg-slate-400 transition-all ease-in-out duration-500 border-slate-900 px-3 py-2"
        >
          Reset Preferences
        </button>

        <button
          onClick={shareUrl}
          className="border font-semibold rounded-sm bg-slate-300 hover:bg-slate-400 transition-all ease-in-out duration-500 border-slate-900 px-3 py-2"
        >
          Share URL
        </button>
      </div>
    </div>
  );
};

export default BarChart;
