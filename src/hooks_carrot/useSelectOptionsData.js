import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Agent from "utils/Agent";

const useSelectOptionsData = (searchURL, param, labelField, valueField) => {
  const [options, setOptions] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const extractDataFunction = (data) => {
    return data.content.map((item) => ({
      label: item[labelField],
      value: item[valueField],
    }));
  };

  const { data, isSuccess, refetch } = useQuery({
    queryKey: param,
    queryFn: () => Agent.requests.get(searchURL, param),
    enabled: true,
    onSuccess: (data) => {
      setOptions(extractDataFunction(data));
    }
  });

  useEffect(() => {
    if (isSuccess && data) {
      const newOptions = data.content.map((item) => ({
        label: item[labelField],
        value: item[valueField],
      }));
      setOptions(newOptions);
    }
  }, [data, isSuccess]);

  return { options };
};

export default useSelectOptionsData;