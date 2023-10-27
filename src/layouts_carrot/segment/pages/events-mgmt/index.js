import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

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

const apiURL = "http://localhost:3001/";

const EventsMgmt = () => {
    // const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTgzODIzOTIsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiODRjYTNjODEtNzM0MS00Mjk4LTgwYjAtNzdhZGZhYTVhNGMyIiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk4Mzg1OTkyfQ.X2-Qa1JKgyY3ZqvOwVT4MpqM3rhAw3SsvNLKZgG8zn72-MFYPiIhBFtFMsvrEL3HLc9SmwU1dviiyQ0bPhkdfcuFHKy1fTqDLo32yRdzhoA0Jj9Qh5y4BpjNtS2FBfkeQtzHjuGl5qpo00d5tyBbIa4IxnCUeubdGoOCCv15oB3SYO2HBrV8eSqRQu1T9811SSiEUkMkT1EfZTW889W6rqyX-3IzbPTnMA6VEtYH2Lxptc-9YOHIFp546YVrUnQllde5_SRcI055BzV8B4vkrpZRWJEKxVPg1EmhTAzg1z55FXy4pS5UTMP01QCdtStFu4Y-q2fuhM8I2ERuUsBXFA";
    // const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTgzODcxMzAsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiZjJmYWUzYTctODY3ZS00MTA3LWEwY2ItMjkyM2JiZGYxNDZjIiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk4MzkwNzMwfQ.JnTBSDGOcx0SKodmhASBzx0Hh-T_xxSgcBSuTYsjoNvShzE8NNpoL5H9HA-qPT8h-f0VppE0EWz85r3rqQWEefm03kHbFN8DWUnCXEl7AtPr7v-6-SkNamaC4kzli2c5DwDGvp2yBUFpRSQokauJ7b_qeafpzl2GFVRzGMKacfm6JQg53OBN7FR10_j8IrmbFXkwn_9tzC0FOqvK8P6g7ZQFjzZI9xSp0eY2xrpGQT56Cpu9M9HC2i0T-h9zBNp9X4dnd3v2AJQZP73yOVXuuNZZ4mF4M1D39Xl5vvZz3Bokl5NVqwQutLYNBbYxn2Q9qClat93twyNGWgpwl5Fgag";
    const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTgzOTYxOTYsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiMjNiMDY2ZGItNDVjNy00ZDU0LWE2ZGUtM2UxMWMyMDFjMGUxIiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk4Mzk5Nzk2fQ.efW314c1jvAAcU0GAw0-zQKugJ1RGSUigGSbQDu09aPM4HhUvuc4jv_yYc0IG5SO8ptWU3BJFYLqNZSXRxojVtfkxaBtUEbA-85YYP35xjtZe5zYnx9BVvk6WUA64o-xPh1WuYYtBIBMI1SUZQ-xpcukIpinEFKgNqaMhvKzyvS91IYqvLh2V1LNrPLngrVxpRAC7SfZi6vgr8bHKeIWjChK41UW3L3w0TCh0vjus65c-8OzKlfFEiA-G_cZBUPxgcut78GtHw7gBGShYx7JYv_yAFcvHTKCe2sZftj2-TfttKANlXyaJYxePsbNwdzRurgb-5GdPCVueiSVn5bIbw"
    const [eventNmArray, setEventNmArray] = useState([]);
    const [sgmtNameArray, setSsgmtNameArray] = useState([]);
    const [eventTypArray, setEventTypArray] = useState([]);

    const [params, setParams] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchComplete = (results) => {
        setSearchResults(results);
    };

    const searchForm = [
        {
            label: "이벤트명",
            key: "eventNm",
            type: "select",
            options: [{ label: "전체", id: null }, ...eventNmArray],
            defaultValue: "전체",
        },
        {
            label: "세그먼트명",
            key: "sgmtName",
            type: "select",
            options: [{ label: "전체", id: null }, ...sgmtNameArray],
            defaultValue: "전체",
        },
        {
            label: "이벤트타입",
            key: "eventTyp",
            type: "select",
            options: [{ label: "전체", id: null }, {label: "CSV", id: "CSV"}],
            defaultValue: "전체",
        },
    ];

    useEffect(() => {
        const getAllSelectList = async () => {
            const endpoint = "http://localhost:7777/api/cxbd/v1/ui/events-mgmt/retrieve";
            const { data: resp } = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
            setEventNmArray([...resp.content.map((data) => ({ label: data.eventNm, id: data.id }))]);
            setSgmtNameArray([...resp.content.map((data) => ({ label: data.sgmtName, id: data.id }))]);
        }
        getAllSelectList();
    }, []);


return (
      <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} lineHeight={1}>
              <SearchBox
                searchForm={searchForm}
                jwtToken={jwtToken}
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

export default EventsMgmt;
