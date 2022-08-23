import {
  Card,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
} from '@mui/material';
import React, { useState } from 'react';
import RowGrid from '../RowGrid';

import SearchTextInput from '../SearchTextInput';
import MyTableNotFoundData from './MyTableNotFoundData';

const MyTable = ({
  searchTextValue,
  handleSearchTextValueChange,
  searchTextPlaceholder,
  columns,
  data,
  isDataFound,
  allDataCount,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allDataCount) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card>
      <RowGrid
        style={{ padding: 20 }}
        children={
          <>
            <Grid item xs={12}>
              <SearchTextInput
                value={searchTextValue}
                placeholder={searchTextPlaceholder}
                onChange={handleSearchTextValueChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                      return (
                        <TableRow hover key={row.id}>
                          {columns.map((column) => {
                            return <TableCell align={column.align}>{column.renderComponent(row)}</TableCell>;
                          })}

                          {/* <TableCell align="center">
                      <UserMoreMenu />
                    </TableCell> */}
                        </TableRow>
                      );
                    })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isDataFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <MyTableNotFoundData searchTextValue={searchTextValue} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allDataCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </>
        }
      />
    </Card>
  );
};

export default MyTable;
