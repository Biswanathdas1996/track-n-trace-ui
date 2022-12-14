import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
// import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
// import ProductTable from "./components/ProductTable";
// import DashboardButtonCard from "./components/DashboardButtonCard";
// import Card from "./components/Card";
// import pwcLogo from "../logo.svg";
import T1 from "../trkNdTrcIcons/T1.png";
import T2 from "../trkNdTrcIcons/T2.png";
import T3 from "../trkNdTrcIcons/T3.png";
import T4 from "../trkNdTrcIcons/T4.png";
import T5 from "../trkNdTrcIcons/T5.png";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { visuallyHidden } from '@mui/utils';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {
  Button,
  Box,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Stack,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  getRequestLoggedIn,
} from "../functions/apiClient";
import {
  dashboardData,
  getLatestUpdates,
} from "../endpoint";
// import Tree from "./components/Tree";
import { ApplicationContext } from "../Context/ApplicationContext";
import { toNumber } from "lodash";
import { useUser } from "../Context/user";

function Dashboard() {
  
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [dashboardTileData, setDashboardTileData] = useState({});
  const [rows, setDashboardTableData] = useState([]);

  const user = useUser();
  // console.log('dash==>>', user);
  
  useEffect(() => {
    const getDashboardTileData = async () => {
      const res = await getRequestLoggedIn(dashboardData);
      if (res?.status_code === "200") {
        // console.log('Tile res',res);
        setDashboardTileData(res);
      } else {
        setDashboardTileData({});
      }
    };
    const getDashboardTableData = async () => {
      const res = await getRequestLoggedIn(getLatestUpdates);
      if (res?.status_code === "200") {
        let data = res.data;
        let newData = data.map(obj => {
          // console.log('obj',typeof(obj.tokenId) === "string", obj);
          if(typeof(obj.tokenId) === "string") {
            // console.log('num obj', typeof(toNumber(obj.tokenId)));
            let temp = toNumber(obj.tokenId);
            // console.log('num obj===>>', temp);
            obj.tokenId = temp;
          }
          // console.log('UPDT obj',obj);
        })
        // console.log('Table data',data);

        setDashboardTableData(data);
      } else {
        setDashboardTableData([]);
      }
    };

    getDashboardTileData();
    getDashboardTableData();
  }, []);

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
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'tokenId',
      numeric: false,
      disablePadding: false,
      label: 'Token ID',
    },
    {
      id: 'title',
      numeric: true,
      disablePadding: false,
      label: 'Token Title',
    },
    {
      id: 'categoryName',
      numeric: true,
      disablePadding: false,
      label: 'Category',
    },
    {
      id: 'subCategoryName',
      numeric: true,
      disablePadding: false,
      label: 'Sub Category',
    },
    {
      id: 'productName',
      numeric: true,
      disablePadding: false,
      label: 'Product',
    },
    {
      id: 'created',
      numeric: true,
      disablePadding: false,
      label: 'Date',
    },
    {
      id: 'assignedToEmail',
      numeric: true,
      disablePadding: false,
      label: 'Assigned To',
    },
    {
      id: 'trnxtnDetails',
      numeric: true,
      disablePadding: false,
      label: 'Latest Transaction',
    },
  ];
  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ backgroundColor: "#ccc", fontWeight: "800", fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
  };  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  // const { tokenDetailsArray } = useContext(ApplicationContext);
  return (
    <ThemeProvider>
      <div className="dashboardContainer">
        <Grid container spacing={2} sx={{ width: "98vw" }}>
          {/* <Grid item sx={{ paddingTop: "0px" }} sm={12}> */}
            <Grid item sx={{ marginTop: "5px !important" }} sm={0.7}>
              <Grid container>
                <Grid item sx={{ paddingLeft: "5px", fontSize: "18px" }} sm={12}>
                  <Box width="50px">
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "0px",
                        borderRadius: "25px" ,
                      }}
                    >
                      <CardActions sx={{ height: "50px", padding: "0px"}}>
                        {/* <CardMedia
                           sx={{ height: "56px" }}
                          component="img"
                          image={pwcLogo}
                        /> */}
                        {/* <Tooltip> */}
                          {/* <IconButton sx={{ p: 0, cursor: "none" }}> */}
                            <Avatar sx={{ height: "50px", width: "50px", fontSize: "1.5rem", fontWeight: 600, backgroundColor: "black", textTransform: "uppercase" }} 
                              alt={user.user_fname}
                              src="/static/images/avatar/6.jpg"
                              {...stringAvatar(user.user_fname + " " + user.user_lname)}
                            />
                          {/* </IconButton> */}
                        {/* </Tooltip> */}
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ marginTop: "5px !important", paddingLeft: "0px !important" }} sm={11.3}>
              <Grid container>
                <Grid item sx={{ paddingLeft: "5px", fontSize: "18px" }} sm={12}>{"Welcome Back, "}<strong>{user.user_fname + " " + user.user_lname}</strong></Grid>
                <Grid item sx={{ paddingLeft: "5px", fontSize: "14px" }} sm={12}><strong>{user.role_type}</strong></Grid>
              </Grid>
            </Grid>
          {/* </Grid> */}
          <Grid item sx={{ padding: "15px", paddingTop: "5px !important", paddingBottom: "0px" }} sm={2}>
            <Box width="190px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#C52A1A",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ padding: "6px 0px 0px 0px" }}>
                  <Grid sx={{ fontSize: "20px", fontWeight: "bold", width: "180px"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        textAlign: "center",
                        height: "30px",
                        padding: "0px",
                      }}
                    >
                      <div
                        style={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none", paddingLeft: "8px" }}
                        // onClick={() => navigation(`/sub-category?catId=${idData}`)}
                      >
                        {"Token Count"}
                      </div>
                    </CardActions>
                    <a href="/tokens"><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></a>
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <div
                        style={{ justifyContent: "flex-start", fontSize: "25px", fontWeight: "bold", color: "white", paddingLeft: "2px" }}
                      >
                        {dashboardTileData.totalTokens}
                      </div>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "100px", padding: "2px" }}>
                  <CardMedia
                     sx={{ height: "122px", marginLeft: "52px", marginTop: "24px" }}
                    component="img"
                    image={T1}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sx={{ padding: "15px", paddingTop: "5px !important", paddingBottom: "0px" }} sm={2}>
            <Box width="190px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#FFBF1F",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ padding: "6px 0px 0px 0px" }}>
                  <Grid sx={{ fontSize: "20px", fontWeight: "bold", width: "180px"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        textAlign: "center",
                        height: "30px",
                        padding: "0px",
                      }}
                    >
                    <div style={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none", paddingLeft: "8px" }} >
                      {"Product Count"}
                    </div>
                    </CardActions>
                    <ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} />
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "25px", fontWeight: "bold", color: "white", paddingLeft: "2px" }}
                      >
                        {dashboardTileData.totalProducts}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "100px", padding: "2px" }}>
                  <CardMedia
                     sx={{ height: "102px", marginLeft: "58px", marginBottom: "2px" }}
                    component="img"
                    image={T2}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sx={{ padding: "15px", paddingTop: "5px !important", paddingBottom: "0px" }} sm={2}>
            <Box width="190px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#415385",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ padding: "6px 0px 0px 0px" }}>
                  <Grid sx={{ fontSize: "20px", fontWeight: "bold", width: "180px"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        textAlign: "center",
                        height: "30px",
                        padding: "0px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none" }}
                        // onClick={() => navigation(`/sub-category?catId=${idData}`)}
                      >
                        {"Blank Token Count"}
                      </Button>
                    </CardActions>
                    <ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} />
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "25px", fontWeight: "bold", color: "white", paddingLeft: "2px" }}
                      >
                        {dashboardTileData.totalBlankTokens}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "100px", padding: "2px" }}>
                  <CardMedia
                     sx={{ height: "100px", marginLeft: "78px", marginBottom: "4px" }}
                    component="img"
                    image={T3}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sx={{ padding: "15px", paddingTop: "5px !important", paddingBottom: "0px" }} sm={2}>
            <Box width="190px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#D04A02",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ padding: "6px 0px 0px 0px" }}>
                  <Grid sx={{ fontSize: "20px", fontWeight: "bold", width: "180px"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        textAlign: "center",
                        height: "30px",
                        padding: "0px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none" }}
                        // onClick={() => navigation(`/sub-category?catId=${idData}`)}
                      >
                        {"Distributor"}
                      </Button>
                    </CardActions>
                    <ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} />
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "25px", fontWeight: "bold", color: "white", paddingLeft: "2px" }}
                      >
                        {dashboardTileData.totalDistributers}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "100px", padding: "2px" }}>
                  <CardMedia
                     sx={{ height: "108px", marginLeft: "64px", marginBottom: "14px" }}
                    component="img"
                    image={T4}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sx={{ padding: "15px", paddingTop: "5px !important", paddingBottom: "0px" }} sm={2}>
            <Box width="190px">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0px",
                  background: "#22992E",
                  boxShadow: "4px 4px 2px #d3d3d3",
                  borderRadius: "15px",
                }}
              >
                <CardActions sx={{ padding: "6px 0px 0px 0px" }}>
                  <Grid sx={{ fontSize: "20px", fontWeight: "bold", width: "180px"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        textAlign: "center",
                        height: "30px",
                        padding: "0px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none" }}
                        // onClick={() => navigation(`/sub-category?catId=${idData}`)}
                      >
                        {"Retailer"}
                      </Button>
                    </CardActions>
                    <ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} />
                  </Grid>
                </CardActions>
                <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                  <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                    <CardActions
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "35px",
                      }}
                    >
                      <Button
                        sx={{ justifyContent: "flex-start", fontSize: "25px", fontWeight: "bold", color: "white", paddingLeft: "2px" }}
                      >
                        {dashboardTileData.totalRetailers}
                      </Button>
                    </CardActions>
                  </Grid>
                </CardActions>
                <CardActions sx={{ height: "100px", padding: "2px" }}>
                  <CardMedia
                     sx={{ height: "108px", marginLeft: "42px", marginBottom: "12px" }}
                    component="img"
                    image={T5}
                  />
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item sx={{ paddingTop: "0px" }} sm={12}>
            <Grid container>
              <Grid item sx={{ paddingLeft: "2px", fontWeight: "800", fontSize: "18px" }} sm={12}>My Bookmarks</Grid>
              <Grid item sx={{ paddingRight: "2px", paddingTop: "2px", paddingLeft: "0px", paddingBottom: "2px" }} sm={12}>
                  <Box width="210px">
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0px",
                        height: "45px",
                        width: "80vw",
                        background: "#FFFFFF",
                        boxShadow: "4px 4px 2px #d3d3d3",
                      }}
                    >
                      <CardActions sx={{ padding: "0px", marginTop: "-6px" }}>
                        <Grid sx={{ fontSize: "30px", fontWeight: "bold"}}>
                          <CardActions
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                              height: "30px",
                            }}
                          >
                            {/* <Button
                              sx={{ justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}
                            >
                              {"Create Order Tokens"}
                            </Button> */}
                            <a href="/category" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Category</a>
                            <a href="/sub-category" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Sub Category</a>
                            <a href="/product" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Product</a>
                            <a href="/publishBulkArt" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Create Bulk Tokens</a>
                            <a href="/uploadBulkData" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Upload Bulk Tokens</a>
                            <a href="/tokens" style={{ marginLeft: "3vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Track Tokens</a>
                            {/* <Button
                              sx={{ justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}
                            >
                              {"Create Bulk Tokens"}
                            </Button>
                            <Button
                              sx={{ justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}
                            >
                              {"Upload Bulk Tokens"}
                            </Button>
                            <Button
                              sx={{ justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}
                            >
                              {"Track Tokens"}
                            </Button>
                            <Button
                              sx={{ justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}
                            >
                              {"Create Product"}
                            </Button> */}
                          </CardActions>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ paddingTop: "0px" }} sm={12}>
            <Grid container>
              <Grid item sx={{ paddingLeft: "5px", fontWeight: "800", fontSize: "18px" }} sm={12}>{"Latest Update (24 Hrs)"}</Grid>
              <Grid item sx={{ padding: "0px" }} sm={12}>
                  <Box width="210px">
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // paddingTop: "4px",
                        height: "160px",
                        width: "80vw",
                        background: "#FFFFFF",
                        // boxShadow: "4px 4px 2px #d3d3d3",
                        // overflowY: "scroll",
                      }}
                    >
                    <Box sx={{ width: '100%' }}>
                      {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
                        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                          >
                            <EnhancedTableHead
                              // numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              // onSelectAllClick={handleSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={rows.length}
                            />
                            <TableBody>
                              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                 rows.sort(getComparator(order, orderBy)).slice() */}
                              {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                  // const isItemSelected = isSelected(row.name);
                                  // const labelId = `enhanced-table-checkbox-${index}`;
                                  // console.log('row',row);
                
                                  return (
                                    <TableRow
                                      hover
                                      // onClick={(event) => handleClick(event, row.name)}
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={index}
                                    >
                                      <TableCell
                                        // component="th"
                                        // id={labelId}
                                        align="left"
                                        // scope="row"
                                        // padding="normal"
                                        // sx={{ paddingTop: '0px', paddingBottom: "0px" }}
                                        sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }}
                                      >
                                        {row.tokenId}
                                      </TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.title}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.categoryName}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.subcategoryName}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.productName}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.created}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.assignedToEmail}</TableCell>
                                      <TableCell sx={{ fontSize: "0.8rem !important", padding: "8px 0px 0px 8px !important", lineHeight: "0.9rem !important" }} align="left">{row.trnxtnDetails}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: 22 * emptyRows,
                                  }}
                                >
                                  <TableCell colSpan={8} />
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          sx={{ 
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                            justifyContent: "flex-end",
                            height: "20px",
                            overflow: "hidden",
                            ".MuiTablePagination-toolbar": {
                              flexDirection: "row !important",
                              display: "flex !important",
                              alignItems: "baseline !important",
                            },
                            ".css-hrm44d-MuiButtonBase-root-MuiIconButton-root": {
                              paddingRight: "5px !important",
                              paddingTop: "0px !important",
                              paddingBottom: "0px !important",
                            }
                          }}
                          rowsPerPageOptions={[]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                        />
                      {/* </Paper> */}
                    </Box>
                    </Card>
                  </Box>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
