/**
 =========================================================
 * Material Dashboard 2 PRO React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { Icon, Tooltip } from "@mui/material";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts_carrot/table/components/DefaultCell";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";
import GreenColorButton from "components_carrot/MDColorButton/GreenColorButton";
import RedColorButton from "components_carrot/MDColorButton/RedColorButton";

import useSelectOptionsData from "hooks_carrot/useSelectOptionsData";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import CarrotTable from "views/Tables/CarrotTable";
import CarrotTableEventMgmt from "views/Tables/CarrotTableEventMgmt";
import SearchBox from "views/Tables/SearchBox";
import SearchBoxEventMgmt from "views/Tables/SearchBoxEventMgmt";
import SideDrawer from "views/SideDrawer";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import { pageOptionInit, pageTotalInit } from "variables/constantPage"

const attributeApiURL = "/ui/attributes-mgmt";
const segmentApiURL = "/ui/segment-mgmt";
const eventApiURL = "/ui/events-mgmt";
const routeURL = "/test/event-mgmt";

const EventMgmt = () => {
    const [pageOption, setPageOption] = useState(pageOptionInit);
    const [pageTotal, setPageTotal] = useState(pageTotalInit);
    const [rows, setRows] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const { options: segmentOptions } = useSelectOptionsData(`${segmentApiURL}/retrieve`, { sgmtName: null }, 'sgmtName', 'recid');
    const { options: extrAtrOptions } = useSelectOptionsData(`${attributeApiURL}/retrieve`, { atrName: null }, 'clmNm', 'recid');

    // 조회 & 조회 결과 테이블
    const searchDataInit = {
        eventNm: null,
        sgmtRecId: null,
        rstTyp: null,
    }

    const searchForm = [
        {
            label: "이벤트 이름",
            key: "eventNm",
            type: "text",
            helperText: "예: EVENT1"
        },
        {
            label: "세그먼트 이름",
            key: "sgmtRecId",
            type: "text",
            helperText: "예: Segment A",
        },
        {
            label: "결과 타입",
            key: "rstTyp",
            type: "select",
            options:[ { label: "전체", value: "" }, { label: "CSV", value: "CSV" } ],
        },
    ];

    const defaultCell = (value) => {
        return (
            <DefaultCell value={`${value}`} />
        );
    };

    const dateCell = (value) => {
        return (
            <DefaultCell value={moment(value).format("YYYY-MM-DD HH:mm")} />
        );
    };

    // 결과 테이블에 보여지는 컬럼들
    const columns = [
        {
            id: "recid",
            Header: "ID",
            accessor: "recid",
            width: "5%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "이벤트이름",
            accessor: "eventNm",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "세그먼트이름",
            accessor: "sgmtName",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "추출컬럼",
            accessor: "extrAtrName",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "일정",
            accessor: "schdExpre",
            width: "15%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "상태코드",
            accessor: "stcd",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "상태코드 변경일시",
            accessor: "stcdMdfDthms",
            width: "10%",
            Cell: ({ value }) => dateCell(value),
        },
        {
            Header: "시작일시",
            accessor: "strDthms",
            width: "10%",
            Cell: ({ value }) => dateCell(value),
        },
        {
            Header: "종료일시",
            accessor: "ndDthms",
            width: "10%",
            Cell: ({ value }) => dateCell(value),
        },
        {
            Header: "결과타입",
            accessor: "rstTyp",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "결과",
            accessor: "rst",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "수정자",
            accessor: "mdfUsrId",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "수정일시",
            accessor: "mdfDthms",
            width: "10%",
            Cell: ({ value }) => dateCell(value),
        },
        {
            id: "details",
            Header: "상세보기",
            accessor: "Detail",
            width: "5%",
            disableSortBy: true,
        }
    ];

    const table = {
        columns: columns,
        rows: rows,
    };


    // 생성 & 생성 side drawer
    const creatBtn = async () => {
        console.log("생성버튼 -> 사이드 페이지 등장")
    }

    const createForm = [
        {
            id: "eventNm",
            label: '이벤트 이름',
            type: "text",
            helperText: "예: EVENT1"
        },
        {
            id: "sgmtRecId",
            label: '세그먼트 이름',
            type: "select",
        },
        {
            id: "extrAtrRecId",
            label: '추출컬럼',
            type: "select",
        },
        {
            id: "rstTyp",
            label: '결과 타입',
            type: "text",
            helperText: "예: CSV"
        },
        {
            id: "eventFrequency",
            label: '이벤트 주기',
            type: "react-select",
        },
        {
            id: "eventPeriod",
            label: '이벤트 기간',
            type: "date",
        },
    ];

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };
    
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };


    // 삭제 & 체크박스
    const deleteBtn = async () => {
        console.log(selectedIds, "-> 서버에 보내서 삭제")
        resetSelectedIds();
    }

    const resetSelectedIds = () => {
        setSelectedIds([]);
    };

    const handleCheckboxClick = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== id));
        } else {
            setSelectedIds(prevIds => [...prevIds, id]);
        }
    };

    useEffect(() => {
    }, []);

    return (
    <DashboardLayout>
        <DashboardNavbar />
            <MDBox py={3} lineHeight={1}>
                <AppErrorBoundary>
                    <Suspense fallback={<AppSkeleton />}>
                        <SearchBoxEventMgmt
                            searchDataInit={searchDataInit}
                            searchForm={searchForm}
                            searchURL={`${eventApiURL}/retrieve`}
                            setRows={setRows}
                            pageOption={pageOption}
                            setPageTotal={setPageTotal}
                            resetSelectedIds={resetSelectedIds}
                            segmentOptions={segmentOptions}
                        />
                        <MDBox p={3}>
                            {/* Datatable Search */}
                        </MDBox>
                        <MDBox py={0} display="flex" justifyContent="flex-end" my={1}>
                            <GreenColorButton
                              variant="contained"
                              style={{ marginRight: "10px"}}
                              onClick={handleOpenDrawer}
                            >
                                등록
                            </GreenColorButton>
                            <RedColorButton
                              variant="contained"
                              style={{ marginRight: "3px"}}
                              onClick={deleteBtn}
                            >
                                삭제
                            </RedColorButton>
                        </MDBox>
                        <CarrotTableEventMgmt
                            entriesPerPage
                            searchURL={`${eventApiURL}/retrieve`}
                            table={table}
                            cxmPageOption={pageOption}
                            setCxmPageOption={setPageOption}
                            cxmPageTotal={pageTotal}
                            cxmSetPageTotal={setPageTotal}
                            selectedIds={selectedIds}
                            onCheckboxClick={handleCheckboxClick}
                        />
                    </Suspense>
                </AppErrorBoundary>
            </MDBox>
                <SideDrawer
                  open={isDrawerOpen}
                  onClose={handleCloseDrawer}
                  formType="create"
                  formData={createForm}
                  />
            <Footer />
        </DashboardLayout>
    );
}

export default EventMgmt;
