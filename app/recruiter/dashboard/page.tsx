import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import React from "react";
import data from "../data.json";

const page = () => {
  return (
    <div>
      <SectionCards />
      <div className="px-4 lg:px-6 mt-8 mb-8">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
};

export default page;
