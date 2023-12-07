import { useMutation } from 'react-query';
import Agent from "utils/Agent";

const useDeleteData = () => {
  const mutation = useMutation(
    ({ url, recId }) => Agent.requests.delete(`${url}/${recId}`),
    {
      onSuccess: (recId) => {
        console.log('Data deleted successfully', recId);
      },
      onError: (error) => {
        console.error('Error deleting data', error);
      },
    }
  );

  return mutation;
};

export default useDeleteData;