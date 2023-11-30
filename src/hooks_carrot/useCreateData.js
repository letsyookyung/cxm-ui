import { useState, useCallback, useEffect } from "react";
import { useMutation } from 'react-query';
import Agent from "utils/Agent";

const useCreateData = () => {
  console.log('use create data')
  const mutation = useMutation(
    ({ url, data }) => Agent.requests.post(url, data),
    {
      onSuccess: (data) => {
        // 성공 처리
        console.log('Data created successfully', data);
      },
      onError: (error) => {
        // 오류 처리
        console.error('Error creating data', error);
      },
    }
  );

  return mutation;
};

export default useCreateData;
