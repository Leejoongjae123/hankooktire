import React, { useEffect, useState } from "react";
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
import {createClient} from "@/utils/supabase/client";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ chartData }) => {
  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default function SpiderChart({ data, selectedBrand, selectedModel, selectedUseCase }) {
  const [chartData, setChartData] = useState({
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
    datasets: [],
  });

  useEffect(() => {
    if (selectedModel && data.length > 0) {
      const filteredData = data.filter(item => item.Model === selectedModel);
      if (filteredData.length > 0) {
        const newData = chartData.labels.map(label => {
          const value = filteredData[0][label];
          return value !== null ? value : 0;
        });

        const getRandomColor = () => {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };

        const color = getRandomColor();

        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            ...prevData.datasets,
            {
              label: `${selectedBrand} ${selectedModel}`,
              data: newData,
              backgroundColor: `${color}33`,
              borderColor: color,
              borderWidth: 1,
            },
          ],
        }));
      }
    }
  }, [selectedModel, data]);

  return (
    <div style={{ width: "100%", margin: "50px auto" }}>
      <RadarChart chartData={chartData} />
    </div>
  );
}
