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
import { useMemo, useEffect, useState, Suspense } from "react";

import MDBox from "components_carrot/MDBox";
import GreenColorButton from "components_carrot/MDColorButton/GreenColorButton";
import RedColorButton from "components_carrot/MDColorButton/RedColorButton";

import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import CarrotResultTable from "views/Tables/CarrotResultTable";
import CarrotSearchBox from "views/Tables/CarrotSearchBox";
import SideDrawer from "views/SideDrawer";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";
import { pageOptionInit, pageTotalInit } from "variables/constantPage";

import DefaultCell from "layouts_carrot/table/components/DefaultCell";
import { searchDataInit, searchField } from "layouts_carrot/segments/pages/attribute-mgmt/search/SearchInfo";
import { createColumns }  from "layouts_carrot/segments/pages/attribute-mgmt/result_table/ResultTableInfo";

import CreateForm from 'layouts_carrot/segments/pages/attribute-mgmt/create';
import DetailForm from 'layouts_carrot/segments/pages/attribute-mgmt/detail';
import UpdateForm from 'layouts_carrot/segments/pages/attribute-mgmt/update';
import { createField } from "layouts_carrot/segments/pages/attribute-mgmt/create/CreateInfo";
import { detailField } from "layouts_carrot/segments/pages/attribute-mgmt/detail/DetailInfo";
import { updateField } from "layouts_carrot/segments/pages/attribute-mgmt/update/UpdateInfo";

import useDeleteData from 'hooks_carrot/useDeleteData';

import Agent from "utils/Agent";

const attributeApiURL = "/ui/attributes-mgmt"; 

const AttributeMgmt = () => {
  // Side drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentFormType, setCurrentFormType] = useState(null);
  const [rowData, setRowData] = useState([]);
  const formComponents = {
    create: CreateForm,
    detail: DetailForm,
    update: UpdateForm,
  };
  const formFields = {
    create: createField,
    detail: detailField,
    update: updateField,
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };


  // search
  const [pageOption, setPageOption] = useState(pageOptionInit);
  const [pageTotal, setPageTotal] = useState(pageTotalInit);
  const [rows, setRows] = useState([]);
  // detail & update icon handler in search result table
  const handleDetailClick = (rowData) => {
    setCurrentFormType("detail");
    setIsDrawerOpen(true);
    setRowData(rowData);
  };
  const handleUpdateClick = (rowData) => {
    setCurrentFormType("update");
    setIsDrawerOpen(true);
    setRowData(rowData);
  };
  // search result table columns
  const columns = useMemo(() => {
    return createColumns(handleDetailClick, handleUpdateClick);
  }, []);


  // create
  const handleCreateClick = () => {
    setCurrentFormType("create");
    setIsDrawerOpen(true);
  };


  // delete
  const deleteData = useDeleteData();
  const [selectedRecIds, setSelectedRecIds] = useState([]);
  const handleSelectedRecIds = (newSelectedRecIds) => {
    setSelectedRecIds(newSelectedRecIds);
  };

  const handleDeleteClick = async () => {
    try {
      console.log('Deleting attribute data:', selectedRecIds)
      await Promise.all(
        selectedRecIds.map(recId =>
          deleteData.mutateAsync({ url: attributeApiURL, recId })
        )
      );

      // update table UI after deleting row
      const newRows = rows.filter(row => !selectedRecIds.includes(row.recid));
      setRows(newRows);

      setSelectedRecIds([]);
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} lineHeight={1}>
        <AppErrorBoundary>
          <Suspense fallback={<AppSkeleton />}>
            <CarrotSearchBox
              searchDataInit={searchDataInit}
              searchForm={searchField}
              searchURL={`${attributeApiURL}/retrieve`}
              setRows={setRows}
              pageOptionInit={pageOptionInit}
              pageOption={pageOption}
              setPageTotal={setPageTotal}
            />
            <MDBox p={3}>
              {/* nothing */}
            </MDBox>
            <MDBox py={0} display="flex" justifyContent="flex-end" my={1}>
              <GreenColorButton
                variant="contained"
                style={{ marginRight: "10px" }}
                onClick={handleCreateClick}
              >
                등록
              </GreenColorButton>
              <RedColorButton
                variant="contained"
                style={{ marginRight: "3px" }}
                onClick={handleDeleteClick}
              >
                삭제
              </RedColorButton>
            </MDBox>
            <CarrotResultTable
              entriesPerPage
              searchURL={`${attributeApiURL}/retrieve`}
              table={{
                columns: columns,
                rows: rows,
              }}
              cxmPageOption={pageOption}
              setCxmPageOption={setPageOption}
              cxmPageTotal={pageTotal}
              cxmSetPageTotal={setPageTotal}
              onSelectedRecIds={handleSelectedRecIds}
            />
          </Suspense>
        </AppErrorBoundary>
      </MDBox>
      <SideDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        formType={currentFormType}
        formComponent={formComponents[currentFormType]}
        formField={formFields[currentFormType]}
        apiURL={attributeApiURL}
        rowData={rowData}
      />
      <Footer />
    </DashboardLayout>
  );
};


export default AttributeMgmt;
