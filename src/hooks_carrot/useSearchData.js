import { useState, useCallback, useEffect } from "react";

const useSearchData = (initalForm) => {
  const [searchData, setSearchData] = useState(initalForm);

  const onChangeInput = useCallback((e, key) => {
    const { value } = e.target;
    setSearchData((form) => ({ ...form, [key]: value }));
  }, []);

  const onChangeDate = useCallback((key, dateStr) => {
      setSearchData((form) => ({ ...form, [key]: dateStr }));
  }, []);

  const onChangeSelect = useCallback((key, value) => {
    setSearchData((form) => ({ ...form, [key]: value }));
  }, []);

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  const reset = useCallback(() => setSearchData(initalForm), [initalForm]);

  return [searchData, onChangeInput, onChangeDate, onChangeSelect, setSearchData, reset];
};

export default useSearchData;
