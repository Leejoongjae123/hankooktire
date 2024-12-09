"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import { IoMdDownload } from "react-icons/io";

import SpiderChart from "./SpiderChart";
import BarChart from "./BarChart";

function ChartUI() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">상품명</h1>
          <Select className="w-full" label="상품명">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
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
        <h1 className="text-2xl font-bold">그래프</h1>
        
        <Button startContent={<IoMdDownload className="text-medium text-white"/>} color="primary">이미지</Button>
        </div>
        <SpiderChart></SpiderChart>
        
      </div>

      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">용도</h1>
          <Select className="w-full" label="상품명">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
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
        <h1 className="text-2xl font-bold">그래프</h1>
        
        <Button startContent={<IoMdDownload className="text-medium text-white"/>} color="primary">이미지</Button>
        </div>
        <BarChart></BarChart>
        
      </div>
    </div>
  );
}

export default ChartUI;
