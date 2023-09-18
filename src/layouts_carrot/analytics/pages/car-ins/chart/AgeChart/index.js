import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import DoughnutChart from "views/NivoCharts/DoughnutChart";

import { useQuery } from "react-query";

import Agent from "utils/Agent";

import { colorHslList } from "variables/constantList";

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
      const aggbList = data.map((item) => item.aggb);
      const aggbCntList = data.map((item) => item.count);
      const aggbCntTotal = aggbCntList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
      setTitle(`연령대 (전체: ${aggbCntTotal})`);
      const chartData = data.map((item, index) => {
        return {
          "id": item.aggb == 60 ? `${item.aggb}+ 대` : `${item.aggb} 대`,
          "label": item.aggb == 60 ? `${item.aggb}+ 대` : `${item.aggb} 대`,
          "value": item.count,
          "color": colorHslList[index % colorHslList.length],
        };
      });
      setPieChartData((prev) => (chartData));
      if (isFirst) {
        setAggbArray(aggbList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);
      }
    }
  }, [data]);

  return (
    <DoughnutChart
      icon={{ color: "success", component: "donut_small" }}
      title={title}
      height="25rem"
      description=""
      chart={pieChartData}
    />
  );
}

export default AgeChart;