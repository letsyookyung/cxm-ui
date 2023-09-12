import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";

import horizontalBarChartData from "layouts_carrot/pages/charts/data/horizontalBarChartData";

const apiURL = "/ui/cs/customer";

const AffiliateChart = () => {

  return (
    <HorizontalBarChart
      icon={{ color: "dark", component: "splitscreen" }}
      title="Bar chart horizontal"
      height="45rem"
      description="Sales related to age average"
      chart={horizontalBarChartData}
    />
  );
}

export default AffiliateChart;