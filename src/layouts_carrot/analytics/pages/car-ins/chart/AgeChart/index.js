import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React examples
// import PieChart from "views/Charts/PieChart";
import DoughnutChart from "views/NivoCharts/DoughnutChart";

import { useQuery } from "react-query";

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

  // const [pieChartData, setPieChartData] = useState({
  //   labels: [],
  //   datasets: {
  //     label: "연령대",
  //     backgroundColors: [],
  //     data: [],
  //   },
  // });
  const [pieChartData, setPieChartData] = useState([
    {
      "id": "elixir",
      "label": "elixir",
      "value": 593,
      "color": "hsl(346, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 403,
      "color": "hsl(316, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 529,
      "color": "hsl(200, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 578,
      "color": "hsl(178, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 549,
      "color": "hsl(275, 70%, 50%)"
    }
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
      console.log(aggbCntList);
      setTitle(`연령대 (전체: ${aggbCntTotal})`);
      setPieChartData((prev) => ({
        labels: aggbList,
        datasets: {
          label: "명",
          backgroundColors: ["info", "primary", "dark", "secondary", "primary", "secondary"],
          data: aggbCntList,
        },
      }));
      if (isFirst) {
        setAggbArray(aggbList.map((item) => {
          return {label: item, id: item};
        }));
        setIsFirst(false);
      }
    }
  }, [data]);

  // <PieChart
  //   icon={{ color: "success", component: "donut_small" }}
  //   title={title}
  //   height="20rem"
  //   description=""
  //   chart={pieChartData}
  // />
  return (
    <DoughnutChart
      icon={{ color: "success", component: "donut_small" }}
      title={title}
      height="20rem"
      description=""
      chart={pieChartData}
    />
  );
}

export default AgeChart;