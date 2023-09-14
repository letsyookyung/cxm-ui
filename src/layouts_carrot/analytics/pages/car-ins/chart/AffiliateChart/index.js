import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";

// import horizontalBarChartData from "layouts_carrot/pages/charts/data/horizontalBarChartData";
import { useQuery } from "react-query";
import { afccdNmList } from "variables/constantList";

import Agent from "utils/Agent";

const apiURL = "/ui/analytics/chart";

const AffiliateChart = ({
  params,
  setAfccdNmArray,
}) => {
  const path = `${apiURL}/affiliate`
  const [param, setParam] = useState({});
  const { data, isSuccess, refetch } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
  });

  const [horizontalBarChartData, setHorizontalBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "제휴사",
        color: "dark",
        data: [],
      },
    ],
  });

  const [height, setHeight] = useState("40rem");

  useEffect(() => {
    setParam(params)
  }, [params]);

  useEffect(() => {
    refetch();
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      const afccdNmList = data.map((item) => item.afccdNm);
      const afccdNmCntList = data.map((item) => item.count);
      setHorizontalBarChartData((prev) => ({
        ...prev,
        labels: afccdNmList,
        datasets: [
          {
            label: "제휴사",
            color: "dark",
            data: afccdNmCntList,
          },
        ]
      }));
      setAfccdNmArray(afccdNmList.map((item) => {
        return {label: item, id: item};
      }));
      const calcHeight = afccdNmList.length * 2 > 40 ? afccdNmList.length * 2 : 40;
      setHeight(`${calcHeight}rem`);
    }
  }, [data]);

  return (
    <HorizontalBarChart
      icon={{ color: "dark", component: "splitscreen" }}
      title="제휴사"
      height={height}
      description=""
      chart={horizontalBarChartData}
    />
  );
}

export default AffiliateChart;
