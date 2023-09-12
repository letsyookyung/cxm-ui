import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import PieChart from "views/Charts/PieChart";

import pieChartData from "layouts_carrot/pages/charts/data/pieChartData";

const apiURL = "/ui/cs/customer";

const AgeChart = () => {

  return (
    <PieChart
      icon={{ color: "success", component: "donut_small" }}
      title="Pie chart"
      height="20rem"
      description="Analytics Insights"
      chart={pieChartData}
    />
  );
}

export default AgeChart;