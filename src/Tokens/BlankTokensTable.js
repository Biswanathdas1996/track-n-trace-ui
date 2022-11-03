import React, { Fragment, useState } from 'react';
import { useTable, useSortBy, useFilters, useExpanded, usePagination, useRowSelect } from 'react-table';
import { Table, Row, Col, Button, Input } from 'reactstrap';
import { Filter, DefaultColumnFilter } from '../common/filters';
// import {
//   MenuItem,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef
    // console.log('indeterminate',indeterminate);
    // console.log('rest',rest);

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

const TableContainer = ({ columns, data, renderRowSubComponent }) => {

//   const [selectedDist, setSelectedDist] = useState('');

//   const handleChange = async (event) => {
//     let valEvent = event.target.value;
//     console.log('valEvent',valEvent);
//     setSelectedDist(valEvent);
//   };

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
    state: { pageIndex, pageSize, selectedRowIds },
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
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            {/* {( */}
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ])
  });

//   const selectedT = selectedFlatRows.map(d => d.original);
//   const selectedIds = selectedT.map(tokens => tokens.id);
//   console.log('selectedIds',selectedIds);

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

//   const assignDist = () => {
//     const assignData = {
//         tokenIds: selectedIds,
//         assignTo: selectedDist,
//         trnxtnMsg: "Transaction Started. Token Assigned to distributer."
//     };
//     console.log('assignData',assignData);

//   };


  return (
    <Fragment>
    {/* {(selectedIds?.length > 0) && (
      <Grid item sm={12}>
        <Grid item sm={12} style={{ marginTop: "18px", marginBottom: "18px" , paddingLeft: "17px" }}>
          <FormControl sx={{ width: "74%" }}>
            <InputLabel>Distributer</InputLabel>
            <Select
              label="Distributer"
            //   id="fullWidth"
              onChange={(e) => handleChange(e)}
              value={selectedDist.id}
              name="id"
            >
              {distributerListArray.map((dList) => (
                <MenuItem key={dList.id} value={dList.id}>
                  {`${dList.user_fname} ${dList.user_lname}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        <Button
          type="button"
          variant="contained"
          style={{ padding: 8, borderRadius: 4, marginTop: 6, marginLeft: "2vw", width: "7vw" }}
          sx={{
            marginRight: "20px",
            textTransform: "none",
          }}
          onClick={assignDist}
        >
          Assign
        </Button>
        </Grid>
      </Grid>
    )} */}
        <Table bordered hover {...getTableProps()}>
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
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <Col md={3}>
            <Button
              color='primary'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </Button>
            <Button
              color='primary'
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
            <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
              {'>'}
            </Button>
            <Button
              color='primary'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </Button>
          </Col>
        </Row>

        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                'selectedFlatRows[].original': selectedFlatRows.map(
                  d => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre>

    </Fragment>
  );
};

export default TableContainer;