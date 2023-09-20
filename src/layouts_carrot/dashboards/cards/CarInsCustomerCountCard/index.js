import React, { useEffect, useState, Suspense } from "react";

import ComplexStatisticsCard from "views/Cards/StatisticsCards/ComplexStatisticsCard";

import { useQuery } from "react-query";
import Agent from "utils/Agent";

const apiURL = "/ui/dashboard";

const CarInsCustomerCountCard = ({
  title,
}) => {
  const path = `${apiURL}/car-ins/customer/count`
  const [param, setParam] = useState({});
  const { data, isSuccess, refetch } = useQuery({
    queryKey: path + param,
    queryFn: () => Agent.requests.get(path, param),
    // enabled: false,
    cacheTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 60 * 60 * 1000, // 1시간 이내에는 캐시된 결과를 사용
  });

  const [count, setCount] = useState(0);

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
      color="primary"
      icon="person_add"
      title={title}
      count={count.toLocaleString()}
    />
  );
}

export default CarInsCustomerCountCard;