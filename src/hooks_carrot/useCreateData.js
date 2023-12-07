import { useMutation } from 'react-query';
import Agent from "utils/Agent";

const useCreateData = () => {
  const mutation = useMutation(
    ({ url, data }) => Agent.requests.post(url, data),
    {
      onSuccess: (data) => {
        console.log('Data created successfully', data);
      },
      onError: (error) => {
        console.error('Error creating data', error);
      },
    }
  );

  return mutation;
};

export default useCreateData;
