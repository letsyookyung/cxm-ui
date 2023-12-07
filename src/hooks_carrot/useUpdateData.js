import { useMutation } from 'react-query';
import Agent from "utils/Agent";

const useUpdateData = () => {
  const mutation = useMutation(
    ({ url, data }) => Agent.requests.put(url, data),
    {
      onSuccess: () => {
        // console.log("url?", url)
        //  const recid = 3
        // setRows(currentRows => currentRows.map(row =>
        //   row.recid === recid ? { ...row, ...data } : row
        // ));
        console.log('Data updated successfully');
      },
      onError: (error) => {
        console.error('Error updating data', error);
      },
    }
  );

  return mutation;
};

export default useUpdateData;
