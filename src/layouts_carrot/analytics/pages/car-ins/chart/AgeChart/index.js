import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import PieChart from "views/Charts/PieChart";

// import pieChartData from "layouts_carrot/pages/charts/data/pieChartData";
import { useQuery } from "react-query";
import { aggbList } from "variables/constantList";

import Agent from "utils/Agent";

const apiURL = "/ui/analytics/chart";

const AgeChart = ({
  params,
  setAggbArray,
}) => {
  const path = `${apiURL}/age`
  const [param, setParam] = useState({});
  const { data, isSuccess, refetch } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
  });

  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: {
      label: "연령대",
      backgroundColors: [],
      data: [],
    },
  });

  useEffect(() => {
    setParam(params)
  }, [params]);

  useEffect(() => {
    refetch();
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      const aggbList = data.map((item) => item.aggb);
      const aggbCntList = data.map((item) => item.count);
      setPieChartData((prev) => ({
        labels: aggbList,
        datasets: {
          label: "연령대",
          backgroundColors: ["info", "primary", "dark", "secondary", "primary", "secondary"],
          data: aggbCntList,
        },
      }));
      // setAggbArray(aggbList);
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