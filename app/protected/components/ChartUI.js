"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {Button, ButtonGroup} from "@nextui-org/button";
import Chart from "./Chart";
function ChartUI() {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">분류</h1>
          <Select className="w-full" label="분류">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
          </Select>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">상품명</h1>
          <Select className="w-full" label="상품명">
            <SelectItem key="1">1</SelectItem>
            <SelectItem key="2">2</SelectItem>
            <SelectItem key="3">3</SelectItem>
          </Select>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">그래프</h1>
        
        <Button color="primary">다운로드</Button>
        </div>
        <Chart></Chart>
        
      </div>
    </div>
  );
}

export default ChartUI;
