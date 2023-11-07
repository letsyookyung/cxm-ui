import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useEffect, useState} from "react";

const ResultTable = ({ results }) => {
  const columns = [
    {id:'recid', name:'번호', width: 100, align: 'center'},
    {id:'eventNm', name:'이벤트명', width: 250, align: 'center'},
    {id:'sgmtName', name:'세그먼트명', width: 250, align: 'center'},
    {id:'extrAtrName', name:'기준속성명', width: 250, align: 'center'},
    {id:'eventTyp', name:'이벤트타입', width: 250, align: 'center'},
    {id:'stcd', name:'상태', width: 100, align: 'center'},
    {id:'stcdMdfDthms', name:'상태변경일시', width: 250, align: 'center'},
    {id:'strDthms', name:'시작일시', width: 250, align: 'center'},
    {id:'ndDthms', name:'종료일시', width: 250, align: 'center'},
    {id:'rst', name:'결과', width: 250, align: 'center'},
  ]


  const[page, setPage] = useState(0);
  const[rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
      <Paper sx={{width:'100%', overflow: 'hidden', borderRadius: '16px' }}>
        <TableContainer sx={{ maxHeight: '90%' }}>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow >
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ width: column.width}} style={{ width: column.width, background: "white" }} align="center">
                    {column.name}
                  </TableCell>
                ))}
            </TableRow>
            <TableBody>
                {results
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} style={{ width: column.width, background: "white" }} align="center">
                              {row[column.id]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
          </TableHead>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10,25,100, { label: 'All', value: -1 }]}
          component="div"
          count={results.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
}

export default ResultTable;