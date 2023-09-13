import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import PieChart from "views/Charts/PieChart";

import pieChartData from "layouts_carrot/pages/charts/data/pieChartData";
import { useQuery } from "react-query";
import { aggbList } from "variables/constantList";

const apiURL = "/ui/analytics/age";

const AgeChart = (
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
    <PieChart
      icon={{ color: "success", component: "donut_small" }}
      title="연령대"
      height="20rem"
      description=""
      chart={pieChartData}
    />
  );
}

export default AgeChart;