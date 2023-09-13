import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import VerticalBarChart from "views/Charts/BarCharts/VerticalBarChart";

import verticalBarChartData from "layouts_carrot/pages/charts/data/verticalBarChartData";
import { useQuery } from "react-query";
import { sdList } from "variables/constantList";

const apiURL = "/ui/analytics/region";

const RegionChart = (
  searchData,
) => {

  const [param, setParam] = useState({
      ...searchData
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: param,
    queryFn: () => Agent.requests.get(`${apiURL}/retrieve`, param),
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess) {
      // TODO set chart data
    }
  }, [data]);

  return (
    <VerticalBarChart
      icon={{ color: "dark", component: "leaderboard" }}
      title="시 / 도"
      height="20rem"
      description=""
      chart={verticalBarChartData}
    />
  );
}

export default RegionChart;