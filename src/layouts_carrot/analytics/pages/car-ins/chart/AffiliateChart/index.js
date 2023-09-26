import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";

// Material Dashboard 2 PRO React base styles
import colors from "assets_carrot/theme/base/colors";

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
  const { data, isLoading, isFetching, isSuccess, refetch } = useQuery({
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
      const nameList = data.filter((item) => item?.name != null).map((item) => item.name).slice(0, 30);
      const countList = data.filter((item) => item?.count != null).map((item) => item.count).slice(0, 30);
      const countTotal = countList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      },0);
      setTitle(`제휴사 (전체: ${countTotal.toLocaleString()})`);
      const colorList = nameList.map((item, index) => (
        index == 0 ? colors.primary.main : colors.dark.main
      ));
      setHorizontalBarChartData((prev) => ({
        ...prev,
        labels: nameList,
        datasets: [
          {
            label: "제휴사",
            color: colorList,
            data: countList,
          },
        ]
      }));
      if (isFirst) {
        setAfccdNmArray(nameList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);

        const calcHeight = nameList.length * 2 > 40 ? nameList.length * 2 : 40;
        setHeight(`${calcHeight}rem`);
      }
    }
  }, [data]);

  return (
    <HorizontalBarChart
      icon={{ color: "secondary", component: "business" }}
      title={title}
      height={height}
      description=""
      chart={horizontalBarChartData}
      isLoading={isLoading || isFetching}
    />
  );
}

export default AffiliateChart;
