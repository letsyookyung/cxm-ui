import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import VerticalBarChart from "views/Charts/BarCharts/VerticalBarChart";

import { useQuery } from "react-query";

import Agent from "utils/Agent";

const apiURL = "/ui/analytics/chart";

const RegionChart = ({
  params,
  setSdArray,
}) => {
  const path = `${apiURL}/region`
  const [param, setParam] = useState({});
  const { data, isSuccess, refetch } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
  });

  const [verticalBarChartData, setVerticalBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "시 / 도",
        color: "dark",
        data: [],
      },
    ],
  });

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    setParam(params)
  }, [params]);

  useEffect(() => {
    refetch();
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      const sdList = data.map((item) => item.sd);
      const sdCntList = data.map((item) => item.count);
      setVerticalBarChartData((prev) => ({
        ...prev,
        labels: sdList,
        datasets: [
          {
            label: "시 / 도",
            color: "dark",
            data: sdCntList,
          },
        ]
      }));
      if (isFirst) {
        setSdArray(sdList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);
      }
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