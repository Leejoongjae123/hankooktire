"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IoMdDownload } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import SpiderChart from "./SpiderChart";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

function ChartUI() {
  const supabase = createClient();
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [useCase, setUseCase] = useState([]);
  const [useCaseSelection, setUseCaseSelection] = useState([]);
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const fetchData = async () => {
    const { data, error } = await supabase.from("spiderMap").select("*");
    if (error) {
      console.error(error);
    } else {
      setData(data);
      const uniqueBrands = [...new Set(data.map((item) => item.Mark))];
      setBrand(uniqueBrands);
    }
  };

  const fetchUseCase = async () => {
    const { data, error } = await supabase.from("top10").select("*");
    if (error) {
      console.error(error);
    } else {
      const uniqueUseCase = [
        ...new Set(data.map((item) => item.use || item.season)),
      ];
      setUseCase(data);
      setUseCaseSelection(uniqueUseCase);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUseCase();
  }, []);

  useEffect(() => {
    if (brand.length === 0) {
      setModel([]);
    } else {
      const filteredModels = data
        .filter((item) => item.Mark === selectedBrand)
        .map((item) => item.Model);
      const uniqueModels = [...new Set(filteredModels)];
      setModel(uniqueModels);
    }
  }, [selectedBrand]);

  const downloadChartAsImage = async () => {
    const chartElement = document.getElementById("spider-chart");
    if (chartElement) {
      const canvas = await html2canvas(chartElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "spider-chart.png";
      link.click();
    }
  };

  const downloadBarChartAsImage = async () => {
    const barChartElement = document.getElementById("bar-chart");
    if (barChartElement) {
      const canvas = await html2canvas(barChartElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "bar-chart.png";
      link.click();
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">상품별</h1>
          <div className="flex gap-4">
            <Select
              className="w-full"
              label="브랜드"
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brand.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>
            <Select
              className="w-full"
              label="모델명"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {model.map((item) => (
                <SelectItem key={item}>{item}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        {/* <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">상품명</h1>
          <Select className="w-full" label="상품명">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
          </Select>
        </div> */}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">그래프<span className="text-sm text-gray-300">(단위:점수)</span></h1>

          <Button
            startContent={<IoMdDownload className="text-medium text-white" />}
            color="primary"
            onClick={downloadChartAsImage}
          >
            이미지
          </Button>
        </div>
        <div id="spider-chart">
          <SpiderChart
            data={data}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedUseCase={selectedUseCase}
          ></SpiderChart>
        </div>
      </div>

      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">용도</h1>
          <Select
            className="w-full"
            label="용도"
            onChange={(e) => setSelectedUseCase(e.target.value)}
          >
            {useCaseSelection.map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>
        {/* <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">상품명</h1>
          <Select className="w-full" label="상품명">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
          </Select>
        </div> */}
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">그래프<span className="text-sm text-gray-300">(단위:%)</span></h1>

          <Button
            startContent={<IoMdDownload className="text-medium text-white" />}
            color="primary"
            onClick={downloadBarChartAsImage}
          >
            이미지
          </Button>
        </div>
        <div id="bar-chart">
          <BarChart
            useCase={useCase}
            data={data}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
            selectedUseCase={selectedUseCase}
          ></BarChart>
        </div>
      </div>
    </div>
  );
}

export default ChartUI;
