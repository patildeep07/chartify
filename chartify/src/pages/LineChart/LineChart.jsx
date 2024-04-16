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
  // console.log({ lineChartData });

  const lineDataOfA = lineChartData.A;
  // console.log({ lineDataOfA });

  // Labels
  const lineDataLabel = Object.keys(lineDataOfA);
  // console.log({ lineDataLabel });

  // Values
  const lineDataValues = Object.values(lineDataOfA).reduce((acc, curr) => {
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
        text: "Feature Analysis",
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

      <div className="min-w-[80%] max-w-[95%] min-h-[80dvh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
