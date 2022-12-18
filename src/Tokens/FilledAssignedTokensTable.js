import React, { Fragment } from 'react';
import { useTable, useSortBy, useFilters, useExpanded, usePagination, useRowSelect } from 'react-table';
import { Table, Row, Col, Input } from 'reactstrap';
import Button from "@mui/material/Button";
import { Filter, DefaultColumnFilter } from '../common/filters';
import {
  Grid,
} from "@mui/material";
import { unAssignToken } from "../endpoint";
import {
  postRequestLoggedIn,
} from "../functions/apiClient";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const TableContainer = ({ columns, data, renderRowSubComponent, setDist, dist }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter },
    initialState: { pageIndex: 0, pageSize: 5 }
  },
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      // Making a column for selection
      {
        id: 'selection',
        width: "2vw",
        minWidth: "2vw",
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <div>
            Select Rows <br/>
            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ])
  });

  const selectedT = selectedFlatRows.map(d => d.original);
  let selectedIds = selectedT.map(tokens => tokens.id);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const resetPage = () => {
    selectedIds = [];
    if(selectedIds.length == 0)
      setDist(!dist);
      setDist((dist) => {
        return dist;
      });
  };

  const unAssignDist = async () => {
    const unAssignData = {
        tokenIds: selectedIds,
    };
    const res = await postRequestLoggedIn(unAssignToken, unAssignData);
    if (res?.status_code === "200") {
      resetPage();
    }
  };

  return (
    <Fragment>
      {(selectedIds?.length > 0) && (
        <Grid item sm={12}>
          <Grid item sm={12} style={{ marginBottom: "10px" , paddingLeft: "17px", float: "right" }}>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={unAssignDist}
              disabled={selectedIds.length == 0}
              sx={{ lineHeight: 1.6, borderRadius: "8px", marginLeft: "25px !important", marginTop: "-1px" }}
            >
              UNASSIGN
            </Button>
          </Grid>
        </Grid>
      )}
        <Table bordered hover {...getTableProps()} style={{boxShadow: "5px 10px #eeee"}}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
                ))}
              </tr>
            ))}
          </thead>
        
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps({
                            style: {
                              minWidth: cell.column.minWidth,
                              width: cell.column.width,
                            },
                          })}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        
        <Row style={{ maxWidth: 1000, margin: '0 auto 10px', textAlign: 'center' }}>
          <Col md={3}>
            <Button
              variant="contained"
              color="error"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
            {'<<'}
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
            {'<'}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <Input
              type='select'
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={3}>
            <Button
              variant="contained"
              color="error"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={nextPage}
              disabled={!canNextPage}
            >
            {'>'}
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
            {'>>'}
            </Button>
          </Col>
        </Row>
    </Fragment>
  );
};

export default TableContainer;