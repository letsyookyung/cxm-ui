import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
import VerticalBarChart from "views/Charts/BarCharts/VerticalBarChart";

// Material Dashboard 2 PRO React base styles
import colors from "assets_carrot/theme/base/colors";

import { useQuery } from "react-query";

import Agent from "utils/Agent";

const apiURL = "/ui/analytics/chart";

const RnwYnChart = ({
  params,
  setRnwYnArray,
}) => {
  const path = `${apiURL}/renewal`
  const [param, setParam] = useState({});
  const { data, isLoading, isFetching, isSuccess, refetch } = useQuery({
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
        label: "갱신여부",
        color: "dark",
        data: [],
      },
    ],
  });

  const [isFirst, setIsFirst] = useState(true);
  const [title, setTitle] = useState("갱신여부");

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
      setTitle(`갱신여부 (전체: ${countTotal.toLocaleString()})`);
      const colorList = nameList.map((item, index) => (
        index == 0 ? colors.primary.main : colors.dark.main
      ));
      setVerticalBarChartData((prev) => ({
        ...prev,
        labels: nameList,
        datasets: [
          {
            label: "갱신여부",
            color: colorList,
            data: countList,
          },
        ]
      }));
      if (isFirst) {
        setRnwYnArray(nameList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);
      }
    }
  }, [data]);

  return (
    <VerticalBarChart
      icon={{ color: "warning", component: "event_repeat_icon" }}
      title={title}
      height="25rem"
      description=""
      chart={verticalBarChartData}
      isLoading={isLoading || isFetching}
    />
  );
}

export default RnwYnChart;