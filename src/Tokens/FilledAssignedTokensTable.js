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

const TableContainer = ({ columns, data, renderRowSubComponent, setDist, role, dist, location }) => {

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

  const trxnMsg = role === '1' ? "Token Unassigned from Distributor." : role === '2' ? "Token Unssigned from Retailer." : "Token Unssigned." ;

  const unAssignOrder = async () => {
    const unAssignData = {
        tokenIds: selectedIds,
        trnxtnMsg: trxnMsg,
        trnxlocation: location,
    };
    const res = await postRequestLoggedIn(unAssignToken, unAssignData);
    if (res?.status_code === "200") {
      resetPage();
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
      {(selectedIds?.length > 0) && (
        <Grid item sm={12} sx={{ paddingLeft: "17px", paddingTop: "10px !important" }}>
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={unAssignOrder}
            disabled={selectedIds.length == 0}
            sx={{ lineHeight: 1.6, borderRadius: "8px", marginLeft: "25px !important", marginTop: "-1px", float: "right" }}
          >
            UNASSIGN
          </Button>
        </Grid>
      )}
      <Grid item sm={12} sx={{ paddingTop: "10px !important"}}>
        <div style={{ height: "248px", overflow: "scroll" }}>
          <Table bordered hover {...getTableProps()} style={{
            // boxShadow: "5px 10px #eeee",
            backgroundColor: "#ffffff"
          }}>
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
        </div>
      </Grid>
      </Grid>
        
        <Row style={{ maxWidth: 1090, margin: '10px 18px 2px 0px', textAlign: 'center', backgroundColor: "#FFFFFF", padding: "4px 2px" }}>
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