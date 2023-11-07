import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {useEffect, useState} from "react";

const ResultTable = ({ results }) => {
  const columns = [
    {id:'id', name:'번호', width: 150, align: 'center'},
    {id:'tabnm', name:'테이블명', width: 250, align: 'center'},
    {id:'colNm', name:'컬럼명', width: 250, align: 'center'},
    {id:'colTyp', name:'컬럼타입', width: 250, align: 'center'},
    {id:'psinfYn', name:'개인정보여부', width: 250, align: 'center'},
    {id:'mdf_usr_id', name:'수정자', width: 250, align: 'center'},
    {id:'mdf_dthms', name:'수정일시', width: 250, align: 'center'},
    {id:'update', name:'수정', width: 150, align: 'center'},
    {id:'delete', name:'삭제', width: 150, align: 'center'},
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
              <TableRow>
                {columns.map((column) => (
                  <TableCell style={{ width: column.width }} align="center">
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
              <TableBody>
                {results
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow>
                        {columns.map((column) => {
                          return (
                            <TableCell style={{ width: column.width }} align="center">
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