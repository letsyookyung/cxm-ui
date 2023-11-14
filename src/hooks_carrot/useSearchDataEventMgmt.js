import { useState, useCallback, useEffect } from "react";

const useSearchDataEventMgmt = (initalForm) => {
  const [searchData, setSearchData] = useState(initalForm);
  const [searchActualData, setSearchActualData] = useState(searchData);

  const onChangeInput = useCallback((e, key) => {
    const { value } = e.target;
    setSearchData((form) => ({ ...form, [key]: value }));

    if (key === "sgmtRecId") {
      setSearchActualData((form) => ({ ...form, [key]: e.target.id }));
    } else {
      setSearchActualData((form) => ({ ...form, [key]: value }));
    }
  }, []);
  

  const reset = useCallback(() => setSearchData(initalForm), [initalForm]);

  return [searchActualData, searchData, onChangeInput, setSearchData, reset];
};

export default useSearchDataEventMgmt;