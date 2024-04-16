import React, { memo, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import { Bar } from "react-chartjs-2";

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
    onClick: function (evt, element) {
      if (element.length > 0) {
        console.log(element);
      }
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

  // Fetching Data
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-10 flex justify-center items-center flex-col gap-[10px]">
      <h1 className="font-semibold text-3xl">Bar Chart</h1>

      <div className="min-w-[80%] max-w-[95%] min-h-[80dvh]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
