import React, { memo, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { AppContext } from "../../context/AppProvider";
import { useParams } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  // Context
  const { appData } = useContext(AppContext);

  const { lineChartData } = appData;

  // UseParams
  const { featureId } = useParams();

  const lineData = lineChartData[featureId];
  // console.log({ lineData });

  // Labels
  const lineDataLabel = Object.keys(lineData);
  // console.log({ lineDataLabel });

  // Values
  const lineDataValues = Object.values(lineData).reduce((acc, curr) => {
    const average = (
      curr.reduce((acc, currentValue) => acc + Number(currentValue), 0) /
      curr.length
    ).toFixed(0);
    return [...acc, average];
  }, []);

  // console.log({ lineDataValues });

  // Line chart

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 1000,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Feature Analysis of ${featureId}`,
      },
    },
  };

  const labels = lineDataLabel;

  const data = {
    labels,
    datasets: [
      {
        label: "Feature analysis",
        data: lineDataValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="my-10 flex justify-center items-center flex-col gap-[10px]">
      <h1 className="font-semibold text-3xl">Line Chart</h1>

      <div className="min-w-[80%] max-w-[95%]  sm:min-h-[80dvh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
