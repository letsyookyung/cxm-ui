import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";
import MDInput from "components_carrot/MDInput";
import MDPagination from "components_carrot/MDPagination";

// Material Dashboard 2 PRO React examples
import DataTableHeadCell from "views/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "views/Tables/DataTable/DataTableBodyCell";

import Util from "utils/Util";

// const CarrotTable = ({
//     columns,
//     rows,
//     pageOption,
//     setPageOption,
//     pageTotal,
//     getList,
//     ...others
// }) => {
//   const [hideshow, setHideshow] = useState(Util.ejectBoolValue(columns, "field", "hide"));
// }

const CarrotTable = ({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  pageOption,
  setPageOption,
}) => {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 20;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["20", "30", "50", "100"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
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
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 20), [defaultValue]);

  useEffect(() => {
    console.log(tableInstance);
    // setPageOption((prev) => ({
    //   ...prev,
    //   pageNo: 0,
    //   sortField: nextSort[0].field,
    //   sortDirection: nextSort[0].sort.toUpperCase(),
    // }));
  }, [tableInstance]);

  // useDebouncedEffect(
  //   () => {
  //     if (pageOption.pageNo !== 0) getList();
  //     else if (pageOption.pageNo === 0 && innerPageNoCheck) {
  //       getList();
  //       setInnerPageNoCheck(false);
  //     }
  //   },
  //   100,
  //   [pageOption.pageNo]
  // );

  // useEffect(() => {
  //   if (pageTotal && pageTotal.totalElements) getList();
  // }, [pageOption.pageSize, pageOption.sortField, pageOption.sortDirection]);

  // useEffect(() => {
  //   if (initCheck && mode === "privacy") setMode("default");
  // }, [rows]);

  //test
  // useEffect(() => {
  //   console.log(defaultValue);
  //   console.log(page);
  //   console.log(pageOptions);
  //   console.log(customizedPageOptions);
  // }, []);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => {
    if (pageIndex < 3) { // 1 ~ 3 페이지 선택의 경우
      if (option < 5) {
        return (
          <MDPagination
            sx={{ border: 0 }}
            item
            key={option}
            onClick={() => gotoPage(Number(option))}
            active={pageIndex === option}
          >
            {option + 1}
          </MDPagination>
        );
      } else if (option == pageOptions.length - 1) { // ... 마지막 페이지
        return (
          <>
            <MDTypography variant="overline" fontWeight="regular">
              ...
            </MDTypography>
            <MDPagination
              sx={{ border: 0 }}
              item
              key={option}
              onClick={() => gotoPage(Number(option))}
              active={pageIndex === option}
            >
              {option + 1}
            </MDPagination>
          </>
        );
      }
    } else if (pageOptions.length - 3 <= pageIndex) { // 마지막-2 ~ 마지막 페이지 선택의 경우
      if (pageOptions.length - 5 <= option) {
        return (
          <MDPagination
            sx={{ border: 0 }}
            item
            key={option}
            onClick={() => gotoPage(Number(option))}
            active={pageIndex === option}
          >
              {option + 1}
          </MDPagination>
        );
      }
    } else { // 중간 페이지 선택의 경우
      if (pageIndex - 3 < option && option < pageIndex + 3) {
        return (
          <MDPagination
            sx={{ border: 0 }}
            item
            key={option}
            onClick={() => gotoPage(Number(option))}
            active={pageIndex === option}
          >
            {option + 1}
          </MDPagination>
        );
      } else if (option == pageOptions.length - 1) { // ... 마지막 페이지
        return (
          <>
            <MDTypography variant="overline" fontWeight="regular">
              ...
            </MDTypography>
            <MDPagination
              sx={{ border: 0 }}
              item
              key={option}
              onClick={() => gotoPage(Number(option))}
              active={pageIndex === option}
            >
              {option + 1}
            </MDPagination>
          </>
        );
      }
    }
  });

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

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

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
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
                {row.cells.map((cell, idx) => (
                  <DataTableBodyCell
                    key={idx}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
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
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {/* {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              {entriesStart}-{entriesEnd} / {rows.length}
            </MDTypography>
          </MDBox>
        )} */}

        {entriesPerPage && (
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="caption" color="secondary">
              페이지 크기: &nbsp;
            </MDTypography>
            <Autocomplete
              disableClearable
              value={pageSize.toString()}
              options={entries}
              onChange={(event, newValue) => {
                setEntriesPerPage(parseInt(newValue, 20));
              }}
              size="small"
              sx={{ width: "5rem" }}
              renderInput={(params) => <MDInput {...params} />}
            />
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            <MDBox display="flex" alignItems="center" mr={2}>
              <MDTypography variant="caption" color="secondary">
                페이지 번호: &nbsp;
              </MDTypography>
              <MDInput
                inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                value={customizedPageOptions[pageIndex]}
                onChange={(handleInputPagination, handleInputPaginationValue)}
                size="small"
              />
            </MDBox>
            {canPreviousPage && (
              <MDPagination sx={{ border: 0 }} item onClick={() => gotoPage(0)}>
                <Icon sx={{ fontWeight: "bold" }}>first_page</Icon>
              </MDPagination>
            )}
            {canPreviousPage && (
              <MDPagination sx={{ border: 0 }} item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination}
            {canNextPage && (
              <MDPagination sx={{ border: 0 }} item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
            {canNextPage && (
              <MDPagination sx={{ border: 0 }} item onClick={() => gotoPage(pageOptions.length - 1)}>
                <Icon sx={{ fontWeight: "bold" }}>last_page</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Setting default values for the props of CarrotTable
CarrotTable.defaultProps = {
  entriesPerPage: { defaultValue: 20, entries: [20, 30, 50, 100] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};

// Typechecking props for the CarrotTable
CarrotTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
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

export default CarrotTable;