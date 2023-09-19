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
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 60 * 60 * 1000, // 1시간 이내에는 캐시된 결과를 사용
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
  const [title, setTitle] = useState("시 / 도");

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
      const sdCntTotal = sdCntList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
      setTitle(`시 / 도 (전체: ${sdCntTotal})`);
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
      title={title}
      height="25rem"
      description=""
      chart={verticalBarChartData}
    />
  );
}

export default RegionChart;