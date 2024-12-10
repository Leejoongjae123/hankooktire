import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BarChart = ({ inputData, useCase, selectedUseCase }) => {
  const [datasets, setDatasets] = useState([]);
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    if (!selectedUseCase) {
      setDatasets([]);
      setShowLegend(false);
      return;
    }

    const filteredData = useCase.filter(
      (item) => item.use === selectedUseCase || item.season === selectedUseCase
    );
    console.log("filteredData:", filteredData);
    const color = getRandomColor();
    const newDataset = {
      label: selectedUseCase,
      data: labels.map((label) => {
        return filteredData.reduce((acc, item) => {
          return acc + (item[label] !== undefined ? item[label] : 0);
        }, 0);
      }),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 1,
    };

    setDatasets((prevDatasets) => [...prevDatasets, newDataset]);
    setShowLegend(true);
  }, [selectedUseCase, useCase]);

  const labels = [
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
  ];
  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default function BarChartComponent({
  data,
  useCase,
  selectedBrand,
  selectedModel,
  selectedUseCase,
}) {
  return (
    <div style={{ width: "100%", margin: "50px auto" }}>
      <BarChart
        inputData={data}
        useCase={useCase}
        selectedBrand={selectedBrand}
        selectedModel={selectedModel}
        selectedUseCase={selectedUseCase}
      />
    </div>
  );
}
