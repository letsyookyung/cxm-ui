import React, { useEffect, useState, Suspense } from "react";

import ComplexStatisticsCard from "views/Cards/StatisticsCards/ComplexStatisticsCard";

import { useQuery } from "react-query";
import Agent from "utils/Agent";

const apiURL = "/ui/dashboard";

const CarInsCountCard = ({
  params,
  title,
}) => {
  const path = `${apiURL}/car-ins/count`
  const [param, setParam] = useState({});
  const { data, isLoading, isFetching, isSuccess, refetch } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 60 * 60 * 1000, // 1시간 이내에는 캐시된 결과를 사용
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    setParam(params)
  }, [params]);

  useEffect(() => {
    refetch();
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      setCount(data);
    }
  }, [data]);

  return (
    <ComplexStatisticsCard
      color="warning"
      icon="person_add"
      title={title}
      count={count.toLocaleString()}
      percentage={{
        color: "success",
        amount: "",
        label: "",
      }}
      isLoading={isLoading || isFetching}
    />
  );
}

export default CarInsCountCard;