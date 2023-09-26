import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import DoughnutChart from "views/NivoCharts/DoughnutChart";

import { useQuery } from "react-query";

import Agent from "utils/Agent";

import { colorHslList2 } from "variables/constantList";

const apiURL = "/ui/analytics/chart";

const AgeChart = ({
  params,
  setAggbArray,
}) => {
  const path = `${apiURL}/age`
  const [param, setParam] = useState({});
  const { data, isLoading, isFetching, isSuccess, refetch, status } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 60 * 60 * 1000, // 1시간 이내에는 캐시된 결과를 사용
  });

  const [pieChartData, setPieChartData] = useState([
    {
      "id": "",
      "label": "",
      "value": 0,
      "color": "hsl(346, 70%, 50%)"
    },
  ]);

  const [isFirst, setIsFirst] = useState(true);
  const [title, setTitle] = useState("연령대");

  useEffect(() => {
    setParam(params)
  }, [params]);

  useEffect(() => {
    refetch();
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      const nameList = data.filter((item) => item?.name != null).map((item) => item.name);
      const countList = data.filter((item) => item?.count != null).map((item) => item.count);
      const countTotal = countList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
      setTitle(`연령대 (전체: ${countTotal.toLocaleString()})`);
      const chartData = data.map((item, index) => {
        return {
          "id": item?.name == 60 ? `${item?.name}+ 대` : `${item?.name} 대`,
          "label": item?.name == 60 ? `${item?.name}+ 대` : `${item?.name} 대`,
          "value": item?.count,
          "color": colorHslList2[index % colorHslList2.length],
        };
      });
      setPieChartData((prev) => (chartData));
      if (isFirst) {
        setAggbArray(nameList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);
      }
    }
  }, [data]);

  return (
    <DoughnutChart
      icon={{ color: "success", component: "filter_1" }}
      title={title}
      height="25rem"
      description=""
      chart={pieChartData}
      isLoading={isLoading || isFetching}
    />
  );
}

export default AgeChart;