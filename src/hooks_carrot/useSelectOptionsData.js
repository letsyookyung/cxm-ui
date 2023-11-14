import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Agent from "utils/Agent";

const useSelectOptionsData = (searchURL, param) => {
  const [options, setOptions] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const extractDataFunction = (data) => {
    return data.content.map((item) => ({
      label: item.sgmtName,
      value: item.recid,
    }));
  };

//   useQuery({
//     queryKey: param,
//     queryFn: () => Agent.requests.get(searchURL, param),
//     enabled: true,
//     onSuccess: (data) => {
//       console.log("---", data);
//       if (isMounted) {
//         setOptions(extractDataFunction(data));
//       }
//     }
//   });
//
//   return { options };
// };
  
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
        label: item.sgmtName,
        value: item.recid,
      }));
      setOptions(newOptions);
    }
  }, [data, isSuccess]);

  return { options };
};

export default useSelectOptionsData;