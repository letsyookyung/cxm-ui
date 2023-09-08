import { useState, useCallback } from "react";

const useSearchData = (initalForm) => {
  const [searchData, setSearchData] = useState(initalForm);

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    setSearchData((form) => ({ ...form, [name]: value }));
  }, []);

  const onChangeDate = useCallback(
    (labelTxt) => (moment) => {
      setSearchData((form) => ({ ...form, [labelTxt]: moment }));
    },
    []
  );

  const reset = useCallback(() => setSearchData(initalForm), [initalForm]);

  return [searchData, onChangeInput, onChangeDate, setSearchData, reset];
};

export default useSearchData;
