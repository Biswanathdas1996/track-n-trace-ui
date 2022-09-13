import { filter } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
// material
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
import {
  // Card,
  // Table,
  Stack,
  // Avatar,
  // Button,
  // Checkbox,
  // TableRow,
  // TableBody,
  // TableCell,
  Container,
  Typography,
  // TableContainer,
  Box,
  Tab,
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

import { TabContext, TabList, TabPanel } from '@mui/lab';

// components
import Page from '../components/Page';
// import Scrollbar from '../components/Scrollbar';
// import Iconify from '../components/Iconify';
// import SearchNotFound from '../components/SearchNotFound';
// import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';
// apiClient
import { getData } from "../functions/apiClient";
// import ProductTableBodyUI from "../components/ProductTableBodyUI"
import PublishBulkArt from "../components/PublishBulkArt";
import PublishArt from "../components/PublishArt";
import AddProductData from "../components/AddProductData";
import EditProductData from "../components/EditProductData";
import TokensTable from "../components/TokensTable";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
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

  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

	// const[showCreateTokenForm,setShowCreateTokenForm]=useState(null);

	// const[showCreateBulkTokenForm,setShowCreateBulkTokenForm]=useState(null);
  
	// const[showAddProductData,setShowAddProductData]=useState(null);
  
	// const[showUpdateProductData,setShowUpdateProductData]=useState(null);

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <Typography variant="h4" gutterBottom>
              Generated Tokens
            </Typography>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Tokens Module">
                  <Tab label="Generated Tokens" value="0" />
                  <Tab label="Create Tokens" value="1" />
                  <Tab label="Create Bulk Tokens" value="2" />
                  <Tab label="Add Product Data" value="3" />
                  <Tab label="Update Product Data" value="4" />
                </TabList>
              </Box>
              <TabPanel value="0"><TokensTable /></TabPanel>
              <TabPanel value="1"><PublishArt /></TabPanel>
              <TabPanel value="2"><PublishBulkArt /></TabPanel>
              <TabPanel value="3"><AddProductData /></TabPanel>
              <TabPanel value="4"><EditProductData /></TabPanel>
            </TabContext>
          </Box>
          {/* <Button
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
          </Button> */}
        </Stack>
        {/* {
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
        } */}
      </Container>
    </Page>
  );
}
