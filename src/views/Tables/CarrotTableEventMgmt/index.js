import { useMemo, useEffect, useState, forwardRef, useRef, useImperativeHandle } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";
import MDInput from "components_carrot/MDInput";
import MDPagination from "components_carrot/MDPagination";
import BpCheckbox from "components_carrot/CheckboxEventMgmt";

// Material Dashboard 2 PRO React examples
import DataTableHeadCell from "views/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "views/Tables/DataTable/DataTableBodyCell";
import SideDrawer from "views/SideDrawer";

import { DetailFields } from "layouts_carrot/segments/pages/event-mgmt/DetailForm/DetailFields"

const CarrotTableEventMgmt = ({
                       entriesPerPage,
                       showTotalEntries,
                       table,
                       pagination,
                       isSorted,
                       noEndBorder,
                       cxmPageOption,
                       setCxmPageOption,
                       cxmPageTotal,
                       cxmSetPageTotal,
                       selectedIds,
                       onCheckboxClick,
                     }) => {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 20;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["20", "30", "50", "100"];
  const displayButtonCount = 5; // 화면 표시 페이지 버튼 수
  const displayMidButtonCount = Math.ceil(displayButtonCount / 2); // 페이지 버튼 중간(올림)
  const [pageArr, setPageArr] = useState([...Array(cxmPageTotal.totalPages).keys()]);

  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const [displayedData, setDisplayedData] = useState([]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    // { columns, data: displayedData, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    // pageOptions,
    // canPreviousPage,
    // canNextPage,
    // gotoPage,
    // nextPage,
    // previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => {
    setPageSize(value);
    setCxmPageOption((prev) => ({
      ...prev,
      pageSize: value,
      pageNo: 0
    }));
  };

  // Set the default value for the entries per page when component mounts
  useEffect(() => {
    setPageSize(defaultValue || 20);
    setCxmPageOption((prev) => ({
      ...prev,
      pageSize: defaultValue,
      pageNo: 0
    }));
  }, [defaultValue]);

  useEffect(() => {
    setPageArr([...Array(cxmPageTotal.totalPages).keys()]);
  }, [cxmPageTotal]);

  const pageButton = (index) => {
    return (
      <MDPagination
        item
        key={index}
        onClick={() => {
          console.log(`cxmPageOption.pageNo: ${cxmPageOption.pageNo}, index: ${index}`);
          setCxmPageOption((prev) => ({
            ...prev,
            pageNo: index
          }));
        }}
        active={cxmPageOption.pageNo === index}
      >
        {index + 1}
      </MDPagination>
    );
  };
  
  // Render the paginations
  const renderPagination = pageArr.map((option) => {
    if (cxmPageOption.pageNo < displayMidButtonCount) { // 1 ~ 3 페이지 선택의 경우
      if (option < displayButtonCount) {
        return pageButton(option);
      } else if (option == pageArr.length - 1) { // ... 마지막 페이지
        return (
          <>
            <MDTypography variant="overline" fontWeight="regular">
              ...
            </MDTypography>
            {pageButton(option)}
          </>
        );
      }
    } else if (pageArr.length - displayMidButtonCount <= cxmPageOption.pageNo) { // 마지막-2 ~ 마지막 페이지 선택의 경우
      if (pageArr.length - displayButtonCount <= option) {
        return pageButton(option);
      }
    } else { // 중간 페이지 선택의 경우
      if (cxmPageOption.pageNo - displayMidButtonCount < option && option < cxmPageOption.pageNo + displayMidButtonCount) {
        return pageButton(option);
      } else if (option == pageArr.length - 1) { // ... 마지막 페이지
        return (
          <>
            <MDTypography variant="overline" fontWeight="regular">
              ...
            </MDTypography>
            {pageButton(option)}
          </>
        );
      }
    }
  });

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) => {
    value > pageArr.length || value < 0 ?
      setCxmPageOption((prev) => ({
        ...prev,
        pageNo: 0
      }))
      :
      setCxmPageOption((prev) => ({
        ...prev,
        pageNo: value
      }));
  };

  // Customized page options starting from 1
  const customizedPageOptions = pageArr.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => {
    setCxmPageOption((prev) => ({
      ...prev,
      pageNo: value.value - 1
    }));
  };

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  const handleCheckboxChange = (rowId) => {
    onCheckboxClick(rowId);
  };

  // 상세보기 click & 상세보기 side drawer
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState({});
  const handleDetailClick = (rowData) => {
    setSelectedDetail(rowData); //선택된 행의 데이터를 상태에 저장
    setIsDetailDrawerOpen(true); //Side Drawer 열기
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Table {...getTableProps()}>
        <MDBox component="thead" bgColor="light" variant="gradient">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              <TableHead></TableHead>
              {headerGroup.headers.map((column, idx) => (
                <DataTableHeadCell
                  key={idx}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                  sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                <DataTableBodyCell
                  key={`checkbox-${key}`}
                  align="center"
                >
                  <BpCheckbox
                    checked={selectedIds.includes(row.original.recid)}
                    onChange={() => handleCheckboxChange(row.original.recid)}
                  />
                </DataTableBodyCell>
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {idx === row.cells.length - 1 ? ( //마지막 셀 = 상세보기
                      <InfoIcon
                        onClick={() => handleDetailClick(row.original)}
                        style={{ cursor: 'pointer' }}  />
                    ) : (
                      cell.render("Cell")
                    )}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageArr.length === 1 ? 0 : 3}
      >
        {entriesPerPage && (
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="caption" color="secondary">
              페이지 크기: &nbsp;
            </MDTypography>
            <Autocomplete
              disableClearable
              value={cxmPageOption.pageSize.toString()}
              options={entries}
              onChange={(event, newValue) => {
                setEntriesPerPage(parseInt(newValue, 10));
              }}
              size="small"
              sx={{ width: "5rem" }}
              renderInput={(params) => <MDInput {...params} />}
            />
          </MDBox>
        )}
        {pageArr.length > 0 && (
          <MDPagination
            variant={pagination?.variant ? pagination.variant : "gradient"}
            color={pagination?.color ? pagination.color : "info"}
          >
            {pageArr.length > displayButtonCount && (
              <MDBox display="flex" alignItems="center" mr={3}>
                <MDTypography variant="caption" color="secondary">
                  페이지 번호: &nbsp;
                </MDTypography>
                <MDInput
                  variant="standard"
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[cxmPageOption.pageNo]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                  size="small"
                />
              </MDBox>
            )}
            <MDPagination item
                onClick={() => {
                  setCxmPageOption((prev) => ({
                    ...prev,
                    pageNo: 0
                  }));
                }}
                disabled={cxmPageOption.pageNo == 0}
              >
                <Icon sx={{ fontWeight: "bold" }}>first_page</Icon>
              </MDPagination>
              <MDPagination item
                onClick={() => {
                  setCxmPageOption((prev) => ({
                    ...prev,
                    pageNo: prev.pageNo - 1
                  }));
                }}
                disabled={cxmPageOption.pageNo == 0}
              >  
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            {renderPagination}
              <MDPagination item
                onClick={() => {
                  setCxmPageOption((prev) => ({
                    ...prev,
                    pageNo: prev.pageNo + 1
                  }));
                }}
                disabled={cxmPageOption.pageNo == pageArr.length - 1}
              >
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
              <MDPagination item
                onClick={() => {
                  setCxmPageOption((prev) => ({
                    ...prev,
                    pageNo: pageArr.length - 1
                  }));
                }}
                disabled={cxmPageOption.pageNo == pageArr.length - 1}
              >
                <Icon sx={{ fontWeight: "bold" }}>last_page</Icon>
            </MDPagination> 
          </MDPagination>
        )}
      </MDBox>
          <SideDrawer
            open={isDetailDrawerOpen}
            onClose={() => setIsDetailDrawerOpen(false)}
            formType="detail"
            formData={DetailFields}
            rowData={selectedDetail}
            />
    </TableContainer>
  );
}

// Setting default values for the props of CarrotTable
CarrotTableEventMgmt.defaultProps = {
  entriesPerPage: { defaultValue: 20, entries: [20, 30, 50, 100] },
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the CarrotTable
CarrotTableEventMgmt.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default CarrotTableEventMgmt;