import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
// import MDTypography from "components_carrot/MDTypography";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import SearchBox from "./SearchBox"
import ResultTable from "./ResultTable";

const AttributeMgmt = () => {
    const searchDataInit = {
        tabnm: null,
        colNm: null,
        psinfYn: null,
    };

    const [tabnmArray, setTabnmArray] = useState([]);
    const [colNmArray, setColNmArray] = useState([]);
    const [psinfYnArray, setPsinfYnArray] = useState([]);

    const searchForm = [
        {
            label: "테이블명",
            key: "tabnm",
            type: "select",
            options: [{ label: "전체", id: null }, ...tabnmArray],
            defaultValue: "전체",
        },
        {
            label: "컬럼명",
            key: "colNm",
            type: "select",
            options: [{ label: "전체", id: null }, ...colNmArray],
            defaultValue: "전체",
        },
        {
            label: "개인정보여부",
            key: "psinfYn",
            type: "select",
            options: [{ label: "전체", id: null }, ...psinfYnArray],
            defaultValue: "전체",
        },
    ];

    const [params, setParams] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchComplete = (results) => {
        setSearchResults(results); 
    };

    // 컴포넌트가 처음 렌더링될 때 초기 데이터 설정
    useEffect(() => {
        const initialData = [
            // 초기 데이터 예시
            { id: 1, tabnm: "테이블1", colNm: "컬럼1", colTyp: "타입1", psinfYn: "아니오", mdf_usr_id: "사용자1", mdf_dthms: "날짜1" },
            { id: 2, tabnm: "테이블2", colNm: "컬럼2", colTyp: "타입2", psinfYn: "예", mdf_usr_id: "사용자2", mdf_dthms: "날짜2" },
            // 추가 데이터 항목
        ];

        setSearchResults(initialData);
    }, []);


    return (
      <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} lineHeight={1}>
              <SearchBox
                searchDataInit={searchDataInit}
                searchForm={searchForm}
                // setParams={setParams}
                // onSearch={handleSearch}
                onSearchComplete={handleSearchComplete} // 검색 결과 설정 콜백
              />
              <MDBox p={3}>
                  {/* <MDTypography variant="h5" fontWeight="medium">
                    </MDTypography> */}
              </MDBox>
              <ResultTable results={searchResults} />
              <MDBox p={3}>
                  {/* <MDTypography variant="h5" fontWeight="medium">
                    </MDTypography> */}
              </MDBox>
          </MDBox>
      </DashboardLayout>
    );
};

export default AttributeMgmt;
