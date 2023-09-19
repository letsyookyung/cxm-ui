import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";

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
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 60 * 60 * 1000, // 1시간 이내에는 캐시된 결과를 사용
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

  const [isFirst, setIsFirst] = useState(true);
  const [title, setTitle] = useState("제휴사");
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
      const afccdNmCntTotal = afccdNmCntList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
      setTitle(`제휴사 (전체: ${afccdNmCntTotal})`);
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
      if (isFirst) {
        setAfccdNmArray(afccdNmList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);

        const calcHeight = afccdNmList.length * 2 > 40 ? afccdNmList.length * 2 : 40;
        setHeight(`${calcHeight}rem`);
      }
    }
  }, [data]);

  return (
    <HorizontalBarChart
      icon={{ color: "dark", component: "splitscreen" }}
      title={title}
      height={height}
      description=""
      chart={horizontalBarChartData}
    />
  );
}

export default AffiliateChart;
