import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";

import horizontalBarChartData from "layouts_carrot/pages/charts/data/horizontalBarChartData";
import { useQuery } from "react-query";
import { afccdNmList } from "variables/constantList";

const apiURL = "/ui/analytics/affiliate";

const AffiliateChart = (
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
    <HorizontalBarChart
      icon={{ color: "dark", component: "splitscreen" }}
      title="제휴사"
      height="45rem"
      description=""
      chart={horizontalBarChartData}
    />
  );
}

export default AffiliateChart;