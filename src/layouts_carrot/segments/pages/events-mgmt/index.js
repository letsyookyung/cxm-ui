import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import FormControl from '@mui/material/FormControl';


// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import SearchBox from "./SearchBox";
import ResultTable from "./ResultTable";
import CreateColorButton from "./Button/CreateColorButton";
import DeleteColorButton from "./Button/DeleteColorButton";
import SideDrawer from "./SideDrawer";

const EventsMgmt = () => {
  // const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTkzMjYwNDYsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiNDQ1MzYxYzQtNjE5MC00MTQ1LTk5OWEtZTc5OTM4MzBhNGMzIiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk5MzI5NjQ2fQ.Cz--mwu-5Yq5p5DB4kiKI3iKQL-zhCwyMz0Ofo9Mrf6h2URkri957xZa1o_xOf17qHxJYAaXj3s72aI1BC4_wSSnXKl3Ih7bE5RJ-gMs8YRyVQT880JSxkzquL4f_emC3H05djSdoW2BjBc4QUr3jO67SydYiSNa0X9xukxdIfKmmzdoeR0rXWxRvJBIkrGWax8hMjLHl7m3mHj3lf9jtvu-mpadSD06NK-6i124Ir3woEvUCrGSSASAQxXhM9sa8h47FDCOVD3leOXKp5cmDGWkbkIreaYMUJGAxFCtLezAMUeqMPhQAQE8jgg_MkEsmT6J0B5-vDdIOUy_IHHCOg"
  // const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTkzMzE4NDUsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiMGU3ZTVmZTYtNzg4Yy00YTg4LWFkZjktZThlYTUxNzE0MDk1IiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk5MzM1NDQ1fQ.a5fQl01LuDCNViQuUlBa9A-6XzSnV_pDrINzjj77RpnJa2-YS0Knp57sKpRXm_fjJXGl6hNf9YZAr_H69It_IcHOwAoGsUd3L-SG_2cvh9Dh4SJBCuURujoN4ax8MVC_gqkwjqvkLBpCykfQ32RZw-IRmSEyeSacsnOVka2Y95Jf1Bl5yg1gHYS4tQH9yH9zg9yyB_oHXx4o3xiRypoFrp7jSzYI43KrBW6fgpfk846rzICVrd3c1l3fJVyn1pYdaomzZ5d0s0Dv42HwtTg_U0Gt3PmEeweJPRF6KlYhxa9dpiSeyuDv8-V1H3I5ZLTMyH_O7Vpfcml4iZFx2lMYtg"
  const jwtToken = "eyJraWQiOiJkZWZhdWx0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjeG0iLCJpc3MiOiJjZ2ktYXV0aC1iYWNrZW5kLWFwaSIsImF1ZCI6Ijk5OTk5OTciLCJpYXQiOjE2OTkzMzg0NDEsInByaV91c2VybmFtZSI6ImxvY2FsIGZpbiB0ZXN0IiwicHJpX2F1dGgiOiJST0xFX0FOQUxZVElDUyxST0xFX0NVU1RPTUVSX0lORk8sUk9MRV9EQVNIQk9BUkQsUk9MRV9NQVJULFJPTEVfU0VHTUVOVCIsImlkIjoiODY2OTk3OTctZjgxNC00NTNmLTkxZTEtYzNjNTVhZmM1ZjYxIiwicHJpX3R0IjoiYXQiLCJwcmlfZW1haWwiOiI5OTk5OTk3QGNhcnJvdGlucy5jb20iLCJwcmlfdXNlcm5tIjoi7ZmN6ri464-ZIiwicHJpX2RlcHQiOiJBSe2UjOueq-2PvO2MgCIsInByaV9kaXZpc2lvbiI6IuuUlOyngO2EuO2YgeyLoOuzuOu2gCIsInByaV9wb3NpdGlvbiI6Iu2MgOybkCIsInByaV9kZXB0X2NvZGUiOiIxMDAwMTA1IiwiZXhwIjoxNjk5MzQyMDQxfQ.AXmGmZLBtlQQ0h1chgD5WHjGg2yKa1DfOUZL0kMI1LMZXnRmUx-e0CgWstLVxSlHkj2eomRDO5jmDkTIZg8cYr0cJrmbkTc-pWpW4Eye6hnQB9-cMSyLO9FV-5cEa0CBlTIVNp4UFSjlMN5D3tZ_r1NBo3JowvKUdrgkR7f6mfCj3sArKQ6z3IcA5vrYvG5XUescTFQlk1BoUJKzR2ZCVAwnFh4WT-qdjXRfQA0qOBkVssKh2GWmx3ZHyfn7W-4NZlUqMlLus2F9hTlRUu7Nf5IM4skBbrAAZ_o6JNWKu3IZmOFdvclovJ6r0pndTyTu_AXrVg5geMBNms-3SOSNvA"
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchComplete = (results) => {
      setSearchResults(results);
  };

  const handleCheckboxClick = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds(prevIds => [...prevIds, id]);
    }
  };

  const resetSelectedIds = () => {
    setSelectedIds([]);
  };

  const deleteBtn = async () => {
    console.log(selectedIds,"-> 서버에 보내서 삭제")
  }

  const creatBtn = async () => {
    console.log("생성버튼 -> 사이드 페이지 등장")
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const searchForm = [
        { id: "eventNm", label: '이벤트명', type: "text-input", placeholder: 'eventNm', helperText: "예: EVENT1"},
        { id: "sgmtName", label: '세그먼트명', type: "text-input", placeholder: 'sgmtName', helperText: "예: Segment A"},
        { id: "eventTyp", label: '이벤트타입', type: "text-input", placeholder: 'eventTyp', helperText: "예: CSV"},
    ];

  return (
      <DashboardLayout>
        <DashboardNavbar />
          <MDBox py={3} lineHeight={1}>
            <SearchBox
              searchForm={searchForm}
              jwtToken={jwtToken}
              onSearchComplete={handleSearchComplete}
              resetSelectedIds={resetSelectedIds}
            />
          </MDBox>
          <MDBox py={0} display="flex" justifyContent="flex-end" my={1}>
            <CreateColorButton
              variant="contained"
              style={{ marginRight: "10px"}}
              onClick={handleOpenDialog}
            >
              등록
            </CreateColorButton>
            <DeleteColorButton
              variant="contained"
              style={{ marginRight: "3px"}}
              onClick={deleteBtn}
            >
              삭제
            </DeleteColorButton>
          </MDBox>
        <MDBox py={0} lineHeight={1}>
          <ResultTable
            results={searchResults}
            selectedIds={selectedIds}
            onCheckboxClick={handleCheckboxClick}
          />
        </MDBox>
        <SideDrawer open={isDialogOpen} onClose={handleCloseDialog} jwtToken={jwtToken}/>
      </DashboardLayout>
    );
  };


export default EventsMgmt;
