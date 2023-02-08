import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Container } from "reactstrap";
import FilledAssignedTokensTable from "./FilledAssignedTokensTable";
import "../Styles/catFormFields.css";
import { getRequestLoggedIn } from "../functions/apiClient";
import { getAllTokensData } from "../endpoint";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";
import { useNavigate } from "react-router-dom";
import { QR_BASE_URL } from "../config";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useUser } from "../Context/user";
import SpinLoader from "../trkNdTrcIcons/SpinLoader.gif";

export default function FilledAssignedTokens() {
  const user = useUser();
  const role = user.user_role;
  const [tokenListArray, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [row, setRow] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  const [dist, setDist] = useState(false);
  const [location, setLocation] = useState(null);
  const [apiStatus, setApiStatus] = useState("0");
  let history = useNavigate();

  useEffect(() => {
    const getTokenList = async () => {
      const ep = getAllTokensData(0, 1, 0);
      const res = await getRequestLoggedIn(ep);
      if (res?.status_code === "200") {
        const tokenList = res.data.map((obj) => obj);
        setTokenList(tokenList);
        setApiStatus("200");
        setTokenList((tokenListArray) => {
          return tokenListArray;
        });
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getTokenList();
    getLocation();
  }, [dist]);

  const tListArray = tokenListArray.map((tokenData) => ({
    ...tokenData,
    action: tokenData,
  }));

  const renderRowSubComponent = (row) => {
    const {
      tokenDetails: {
        title,
        description,
        batch_no,
        created,
        modified,
        productName,
        productImage,
        categoryName,
        categoryImage,
        subcategoryName,
        subcategoryImage,
      },
      attributes,
    } = row.original;
    return (
      <Grid container justifyContent="center" alignItems="center">
        {/* category card */}

        <Grid item sm={3}>
          <Card style={{ width: "220px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "10px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography >
                  <strong>Category : </strong>
                  {categoryName} <br />
                </Typography>
              </Grid>
              <Grid sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={categoryImage}
                  sx={{ height: "110px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* sub category card */}

        <Grid item sm={3}>
          <Card style={{ width: "220px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "10px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography >
                  <strong>Sub Category : </strong>
                  {subcategoryName} <br />
                </Typography>
              </Grid>
              <Grid sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={subcategoryImage}
                  sx={{ height: "110px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* product*/}
        <Grid item sm={3}>
          <Card style={{ width: "220px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "10px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography >
                  <strong>Product : </strong>
                  {productName} <br />
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={productImage}
                  sx={{ height: "110px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item sm={3}>
          <Card style={{ width: "250px", height: "220px", overflowY: "scroll" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "10px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography >
                  <strong>More Information </strong>
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <Typography >
                  <strong>Product Title : </strong>
                  {title}
                  <br />
                  <strong> Product Description : </strong>
                  {description} <br />
                  <strong>Batch No. : </strong> {batch_no}
                  <br />
                  <strong>Created Date: </strong> {created}
                  <br />
                  <strong>Modified Date: </strong>
                  {modified}
                  <br />
                  {attributes.length > 0 ? (
                    <strong>Attributes associated with product : </strong>
                  ) : (
                    ""
                  )}
                  <Grid
                    container
                    flexDirection="column"
                    sx={{ paddingLeft: "15px" }}
                  >
                    {attributes.map((attr, index) => {
                      return (
                        <Grid key={index} container>
                          <Grid item sm={5}>
                            <strong>
                              {index + 1}{"."} {attr.attribute_key}
                            </strong>
                          </Grid>
                          <Grid item sm={1}>
                            :
                          </Grid>
                          <Grid item sm={6}>
                            {attr.attribute_value}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* tokens card */}
      </Grid>
    );
  };

  function showPosition(position) {
    setLocation(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
  }

  const handleAdd = (row) => {
    // console.log('handleAdd row',row);
    setRow(row);
    history(`/add-token-data/${row.id}`);
  };

  const handleViewTxn = (row) => {
    // console.log('handleViewTxn row',row);
    setRow(row);
    history(`/transctions/${row.id}`);
  };

  const handleAddTxn = (row) => {
    // console.log('handleAddTxn row',row);
    setRow(row);
    handleOpenForm();
  };

  const handleView = (row) => {
    // console.log('handleView row',row);
    setRow(row);
    handleOpen();
  };

  const columns = useMemo(
    () => [
      {
        // Header: () => null,
        // Header: "Expand Rows",
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            Expand Rows <br />
            {isAllRowsExpanded ? "👇" : "👉"}
          </span>
        ),
        width: "2vw",
        minWidth: "2vw",
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        width: "8vw",
        minWidth: "8vw",
        Header: "Token ID",
        accessor: "id",
      },
      {
        width: " 8vw",
        minWidth: " 8vw",
        Header: "Batch No",
        accessor: "tokenDetails.batch_no",
      },
      {
        width: " 8vw",
        minWidth: " 8vw",
        Header: "Category",
        accessor: "tokenDetails.categoryName",
      },
      {
        width: " 8vw",
        minWidth: " 8vw",
        Header: "Sub-Category",
        accessor: "tokenDetails.subcategoryName",
      },
      {
        width: " 8vw",
        minWidth: " 8vw",
        Header: "Product",
        accessor: "tokenDetails.productName",
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      // {
      //   width: " 8vw",
      //   minWidth: " 8vw",
      //   Header: "Title",
      //   accessor: "tokenDetails.title",
      //   // Filter: SelectColumnFilter,
      //   // filter: "equals",
      // },
      {
        Header: "Action",
        accessor: "action",
        width: "350px",
        minWidth: "350px",
        disableFilters: true,
        Cell: ({ value }) => (
          //   <>
          <Grid container spacing={2} sx={{ marginLeft: "2px", marginTop: "2px"}}>
            <span>
              <Button startIcon={<QrCode2Icon />} type="button" variant="outlined" 
                sx={{ marginRight: "20px", textTransform: "none", fontWeight: 800, "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                  ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
                }}
                style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }} 
                onClick={() => handleAddTxn(value)} 
              >
                AddTxn
              </Button>
            </span>
            <span>
              <Button startIcon={<QrCode2Icon />} type="button" variant="outlined" 
                sx={{ marginRight: "20px", textTransform: "none", fontWeight: 800, "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                  ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
                }}
                style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }} 
                onClick={() => handleView(value)} 
              >
                View
              </Button>
            </span>
            <span>
              <Button endIcon={<SendIcon />} type="button" variant="outlined" 
                sx={{ marginRight: "20px", textTransform: "none", fontWeight: 800, "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                  ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
                }}
                style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }} 
                onClick={() => handleViewTxn(value)} 
              >
                ViewTxn
              </Button>
            </span>
            <span>
              <Button endIcon={<AddCircleIcon />} type="button" variant="outlined" disabled
                sx={{ marginRight: "20px", marginLeft: "5px", textTransform: "none", fontWeight: 800,
                  backgroundColor: "rgba(0, 0, 0, 0.12) !important", color: "rgba(0, 0, 0, 0.26) !important", boxShadow: "none", borderColor: "rgba(0, 0, 0, 0.26) !important",
                  ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
                }}
                style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }} 
                onClick={() => handleAdd(value)} 
              >
                Add
              </Button>
            </span>
          </Grid>
          // </>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ marginTop: "0px"}}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            background: "white",
            padding: "16px",
          }}
        >
          <QRCode
            value={`${QR_BASE_URL}/transctions/${row?.id}`}
            // value={`https://trackndtrace.netlify.app/transctions/${row?.id}`}
            title={row?.tokenDetails.title}
          />
        </Box>
      </Modal>

      <Modal
        open={openForm}
        onClose={handleCloseForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            background: "white",
            padding: "16px",
          }}
        >
          <QRCode
            value={`${QR_BASE_URL}/add-tracking-data/${row?.id}`}
            // value={`http://localhost:3000/add-tracking-data/${row?.id}`}
            title={row?.tokenDetails.title}
          />
        </Box>
      </Modal>
      {((role === undefined) || (apiStatus === "0")) && (<Grid container spacing={2}>
        <Grid item sm={12} sx={{".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "5px !important" }}}>
          <h2 style={{ marginTop: "10%", textAlign: "center" }}>Please Hang On !!!</h2>
          <h2 style={{ textAlign: "center" }}>We are getting things ready for you...</h2>
          <img src={SpinLoader} style={{ width: "75px", marginTop: "15px", marginLeft: "40vw"}} />
        </Grid>
      </Grid>)}

      {((role !== undefined) && (apiStatus !== "0")) && (<Grid container spacing={2}>
        {(role === '1') && (<Grid item sm={12} sx={{".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "5px !important" }}}>
          <h3 style={{ marginLeft: 10 }}>FILLED ASSIGNED TOKENS</h3>
        </Grid>)}
        {(role !== '1') && (<Grid item sm={12} sx={{".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "5px !important" }}}>
          <h3 style={{ marginLeft: 10 }}>ASSIGNED TOKENS</h3>
        </Grid>)}

        <Grid item sm={12} sx={{ paddingTop: "8px !important"}}>
          <Container
            style={{
              marginTop: 0,
              maxWidth: "100% !important",
            }}
          >
            {tListArray.length > 0 && (
              <FilledAssignedTokensTable
                columns={columns}
                data={tListArray}
                role={role}
                renderRowSubComponent={renderRowSubComponent}
                setDist={setDist}
                dist={dist}
                location={location}
              />
            )}
          </Container>
        </Grid>
      </Grid>)}
    </div>
  );
}
