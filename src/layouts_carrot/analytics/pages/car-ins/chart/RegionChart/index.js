import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import VerticalBarChart from "views/Charts/BarCharts/VerticalBarChart";

import verticalBarChartData from "layouts_carrot/pages/charts/data/verticalBarChartData";

const apiURL = "/ui/cs/customer";

const RegionChart = () => {

  return (
    <VerticalBarChart
      icon={{ color: "dark", component: "leaderboard" }}
      title="Bar chart"
      height="20rem"
      description="Sales related to age average"
      chart={verticalBarChartData}
    />
  );
}

export default RegionChart;