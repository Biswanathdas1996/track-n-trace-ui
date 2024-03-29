import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import T1 from "../trkNdTrcIcons/T1.png";
import T2 from "../trkNdTrcIcons/T2.png";
import T3 from "../trkNdTrcIcons/T3.png";
import T4 from "../trkNdTrcIcons/T4.png";
import T5 from "../trkNdTrcIcons/T5.png";
import DashAvatarIcon from "../trkNdTrcIcons/DashAvatarIcon.png";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { visuallyHidden } from '@mui/utils';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { NavLink } from "react-router-dom";
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
// import { ApplicationContext } from "../Context/ApplicationContext";
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
          if(typeof(obj.tokenId) === "string") {
            let temp = toNumber(obj.tokenId);
            obj.tokenId = temp;
          }
        })

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <ThemeProvider>
      <div className="dashboardContainer">
        <Grid container spacing={2} sx={{ width: "98vw" }}>
            <Grid item sx={{ marginTop: "5px !important" }} sm={0.6}>
              <Grid container>
                <Grid item sx={{ paddingLeft: "5px", fontSize: "18px" }} sm={12}>
                  <Box width="40px">
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        padding: "0px",
                        borderRadius: "25px" ,
                      }}
                    >
                      <CardActions sx={{ height: "40px", padding: "0px"}}>
                        <CardMedia
                           sx={{ height: "40px" }}
                          component="img"
                          image={DashAvatarIcon}
                        />
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
                      >
                        {"Token Count"}
                      </div>
                    </CardActions>
                    <NavLink to="/tokens"><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></NavLink>
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
                        {dashboardTileData.totalTokens || 0}
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
                    <NavLink to="/product"><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></NavLink>
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
                        {dashboardTileData.totalProducts || 0}
                      </div>
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
                      <div style={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none", paddingLeft: "8px" }} >
                        {"Blank Token Count"}
                      </div>
                    </CardActions>
                    <NavLink to="/publishBulkArt"><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></NavLink>
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
                        {dashboardTileData.totalBlankTokens || 0}
                      </div>
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
                      <div style={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none", paddingLeft: "8px" }} >
                        {"Distributor"}
                      </div>
                    </CardActions>
                    <NavLink to="/distributer"><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></NavLink>
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
                        {dashboardTileData.totalDistributers || 0}
                      </div>
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
                      <div style={{ justifyContent: "flex-start", fontSize: "14px", fontWeight: 400, color: "white", textTransform: "none", paddingLeft: "8px" }} >
                        {"Retailer"}
                      </div>
                    </CardActions>
                    <a><ArrowForwardIosRoundedIcon sx={{ color: "white", float: "right", marginTop: "-12px"}} /></a>
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
                        {dashboardTileData.totalRetailers || 0}
                      </div>
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
                        height: "40px",
                        width: "80vw",
                        background: "#FFFFFF",
                        boxShadow: "4px 4px 2px #d3d3d3",
                      }}
                    >
                      <CardActions sx={{ padding: "0px" }}>
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
                            <NavLink to="/category" style={{ marginLeft: "1vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Category</NavLink>
                            <NavLink to="/sub-category" style={{ marginLeft: "2vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Sub Category</NavLink>
                            <NavLink to="/product" style={{ marginLeft: "2vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Product</NavLink>
                            <NavLink to="/publishBulkArt" style={{ marginLeft: "2vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Create Bulk Tokens</NavLink>
                            <NavLink to="/uploadBulkData" style={{ marginLeft: "2vw", marginRight: "3vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Upload Bulk Tokens</NavLink>
                            <NavLink to="/tokens" style={{ marginLeft: "2vw", marginRight: "1vw", fontWeight: 400, justifyContent: "flex-start", fontSize: "15px", color: "#0063F9", textDecoration: "underline", textTransform: "none" }}>Track Tokens</NavLink>
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
                        maxHeight: "165px",
                        width: "80vw",
                        background: "#FFFFFF",
                      }}
                    >
                    <Box sx={{ width: '100%' }}>
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                          >
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              rowCount={rows.length}
                            />
                            {rows && (rows.length > 0) && (<TableBody>
                              {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                
                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={index}
                                    >
                                      <TableCell
                                        align="left"
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
                            </TableBody>)}{(rows.length == 0) && (<TableBody>
                              {
                                <TableRow style={{ height: 22, }}
                                >
                                  <TableCell colSpan={8}>No records available to display.</TableCell>
                                </TableRow>
                              }
                            </TableBody>)}
                          </Table>
                        </TableContainer>
                        <TablePagination
                          sx={{ 
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                            justifyContent: "flex-end",
                            height: "22px",
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
                            },
                            ".css-8nphli .MuiTablePagination-actions": {
                              marginLeft: "15px !important",
                              marginTop: "-8px !important",
                            }
                          }}
                          rowsPerPageOptions={[]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                        />
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
