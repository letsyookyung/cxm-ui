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

/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts_carrot/table/components/DefaultCell";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";
import CreateColorButton from "components_carrot/ButtonEventMgmt/CreateColorButton";
import DeleteColorButton from "components_carrot/ButtonEventMgmt/DeleteColorButton";
import SideDrawerEventMgmt from "components_carrot/SideDrawerEventMgmt";

import useSelectOptionsData from "hooks_carrot/useSelectOptionsData";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import CarrotTable from "views/Tables/CarrotTable";
import CarrotTableEventMgmt from "views/Tables/CarrotTableEventMgmt";
import SearchBox from "views/Tables/SearchBox";
import SearchBoxEventMgmt from "views/Tables/SearchBoxEventMgmt";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import { pageOptionInit, pageTotalInit } from "variables/constantPage"


const segmentApiURL = "/ui/segment-mgmt"
const eventApiURL = "/ui/events-mgmt";
const routeURL = "/test/event-mgmt";

const EventMgmt = () => {
    const [pageOption, setPageOption] = useState(pageOptionInit);
    const [pageTotal, setPageTotal] = useState(pageTotalInit);
    const [rows, setRows] = useState([]);

    const navigate = useNavigate();
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const searchDataInit = {
        eventNm: null,
        sgmtRecId: null,
        eventTyp: "CSV",
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
            label: "이벤트타입",
            key: "eventTyp",
            type: "text",
            helperText: "예: CSV"
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
    
    const columns = [
        {
            id: "recid",
            Header: "ID",
            accessor: "recid",
            width: "10%",
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
            Header: "추출기준",
            accessor: "extrAtrName",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "이벤트타입",
            accessor: "eventTyp",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "진행상태",
            accessor: "stcd",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
        {
            Header: "상태변경일시",
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
            Header: "결과",
            accessor: "rst",
            width: "10%",
            Cell: ({ value }) => defaultCell(value),
        },
    ];

    const table = {
        columns: columns,
        rows: rows,
    };

    const creatBtn = async () => {
        console.log("생성버튼 -> 사이드 페이지 등장")
    }

    const { options: segmentOptions } = useSelectOptionsData(`${segmentApiURL}/retrieve`, { sgmtName: null });

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

    const createForm = [
        {
            id: "eventNm",
            label: '이벤트명',
            type: "text",
            placeholder: 'eventNm',
            helperText: "예: EVENT1"
        },
        {
            id: "sgmtName",
            label: '세그먼트명',
            type: "select",
            placeholder: 'sgmtName',
            options:[...segmentOptions]
        },
        {
            id: "extrAtrRecId",
            label: '추출 기준',
            type: "text",
            placeholder: 'extrAtrRecId',
            helperText: "예: COL1"
        },
        {
            id: "eventTyp",
            label: '이벤트타입',
            type: "text",
            placeholder: 'eventTyp',
            helperText: "예: CSV"
        },
        {
            id: "eventFrequency",
            label: '이벤트주기',
            type: "react-select",
        },
    ];


    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };
    
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
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
                            <CreateColorButton
                              variant="contained"
                              style={{ marginRight: "10px"}}
                              onClick={handleOpenDrawer}
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
                <SideDrawerEventMgmt open={isDrawerOpen} onClose={handleCloseDrawer} createForm={createForm} />
            <Footer />
        </DashboardLayout>
    );
}

export default EventMgmt;
