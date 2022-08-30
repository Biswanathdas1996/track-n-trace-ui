import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// material
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Stack,
  // Avatar,
  Button,
  // Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  // TablePagination,
  // TableFooter,
  // Box,
  // IconButton,
} from '@mui/material';
// import {
//   FirstPage,
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   LastPage,
// } from "@mui/icons-material";
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
// apiClient
import { getData } from "../functions/apiClient";
import ProductTableBodyUI from "./ProductTableBodyUI"
import PublishBulkArt from "../components/PublishBulkArt";
import PublishArt from "../components/PublishArt";
import AddProductData from "../components/AddProductData";
import EditProductData from "../components/EditProductData";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'name', label: 'Name', alignRight: false },
  // { id: 'company', label: 'Company', alignRight: false },
  // { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: "id", label: "Token", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "product", label: "Product", alignRight: false },
  { id: "Actions", label: "Actions", alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page-1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0,Math.ceil(count/rowsPerPage)-1));
//   };

//   return (
//     <Box sx={{flexShrink:0, ml:2.5}}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page===0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl'? <LastPage /> : <FirstPage />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page===0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  console.log("array",array);
  console.log("comparator",comparator);
  console.log("query",query);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAllPosts() {
    const data = await getData(`/get-all-token`);
    setData(data);
    console.log("fetchAllPosts==>", data );
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = data.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredData = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isDataNotFound = filteredData.length === 0;

	const[showCreateTokenForm,setShowCreateTokenForm]=useState(null);

	const[showCreateBulkTokenForm,setShowCreateBulkTokenForm]=useState(null);
  
	const[showAddProductData,setShowAddProductData]=useState(null);
  
	const[showUpdateProductData,setShowUpdateProductData]=useState(null);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Generated Tokens
          </Typography>
          <Button
            type="button"
            variant="contained" 
            style={{ float: "right", padding: 8, borderRadius: 4 }} 
            startIcon={<Iconify icon="eva:plus-fill" />}sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            // onClick={() => history("/publishArt")}
            onClick={()=>setShowCreateTokenForm(!showCreateTokenForm)}
          >
            Create Tokens
          </Button>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              // onClick={() => history("/publishBulkArt")}
            onClick={()=>setShowCreateBulkTokenForm(!showCreateBulkTokenForm)}
            >
              Create Bulk Tokens
            </Button>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              // onClick={() => history("/addProductData")}
            onClick={()=>setShowAddProductData(!showAddProductData)}
            >
              Add Product Data
            </Button>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              // onClick={() => history("/editProductData")}
            onClick={()=>setShowUpdateProductData(!showUpdateProductData)}
            >
              Update Product Data
            </Button>
        </Stack>
        {
        showCreateTokenForm?<Card sx={{ mb: 2, p: 5 }}>
         <PublishArt />
        </Card>:null
        }
        {
        showCreateBulkTokenForm?<Card sx={{ mb: 2, p: 5 }}>
         <PublishBulkArt />
        </Card>:null
        }
        {
        showAddProductData?<Card sx={{ mb: 2, p: 5 }}>
         <AddProductData />
        </Card>:null
        }
        {
        showUpdateProductData?<Card sx={{ mb: 2, p: 5 }}>
         <EditProductData />
        </Card>:null
        }

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
                  {filteredData.map((token, index) => {
                    // const { id, name, product, actions, avatarUrl, isVerified } = token;
                    console.log("token",token);
                    const isItemSelected = selected.indexOf(token.name) !== -1;
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return <ProductTableBodyUI token={token} labelId={labelId} isItemSelected={isItemSelected} handleClick={handleClick} />;

                    // return (
                    //   <TableRow
                    //     hover
                    //     key={id}
                    //     tabIndex={-1}
                    //     role="checkbox"
                    //     selected={isItemSelected}
                    //     aria-checked={isItemSelected}
                    //   >
                    //     <TableCell padding="checkbox">
                    //       <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                    //     </TableCell>
                    //     <TableCell component="th" scope="row" padding="none">
                    //       <Stack direction="row" alignItems="center" spacing={2}>
                    //         <Avatar alt={id} src={avatarUrl} />
                    //         <Typography variant="subtitle2" noWrap>
                    //           {id}
                    //         </Typography>
                    //       </Stack>
                    //     </TableCell>
                    //     <TableCell align="left">{name}</TableCell>
                    //     <TableCell align="left">{product}</TableCell>
                    //     <TableCell align="left">{actions}</TableCell>
                    //     <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                    //     {/* <TableCell align="left">
                    //       <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                    //         {sentenceCase(status)}
                    //       </Label>
                    //     </TableCell> */}

                    //     <TableCell align="right">
                    //       <UserMoreMenu />
                    //     </TableCell>
                    //   </TableRow>
                    // );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isDataNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {/* <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50, {label:'All', value: -1}]}
                      colSpan={4}
                      component="div"
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows-per-page',
                        },
                        native: true,
                      }}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter> */}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
