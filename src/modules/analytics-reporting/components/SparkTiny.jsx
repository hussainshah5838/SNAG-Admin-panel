import React from "react";
import ChartArea from "../../../shared/components/ChartArea";

export default function SparkTiny({ data = [] }) {
  return <ChartArea data={data} height={70} />;
}
