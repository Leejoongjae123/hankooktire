import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: [
      "Wet performance",
      "Snow performance",
      "Ice performance",
      "Dry performance",
      "Comfort",
      "Noise",
      "Mileage",
      "Rolling resistance",
      "Braking performance",
      "Cost",
      "Irregular wear",
      "Tire outward design",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [12, 19, 3, 5, 2, 3, 8, 12, 14, 6, 10, 4],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default function Home() {
  return (
    <div style={{ width: "50%", margin: "50px auto" }}>
      <RadarChart />
    </div>
  );
}
