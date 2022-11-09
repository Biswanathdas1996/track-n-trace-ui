import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import {
  Container,
  CardTitle,
} from "reactstrap";
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

export default function FilledAssignedTokens() {
  const [tokenListArray, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [row, setRow] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  let history = useNavigate();

  useEffect(() => {
    const getTokenList = async () => {
      const ep = getAllTokensData(0,1);
      const res = await getRequestLoggedIn(ep);
      if (res?.status_code === "200") {
        const tokenList = res.data.map((obj) => obj);
        setTokenList(tokenList);
        setTokenList((tokenListArray) => {
          return tokenListArray;
        });
      }
    };

      getTokenList();
  }, []);

  const tListArray = tokenListArray.map((tokenData) => ({ ...tokenData, action: tokenData }));

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
          <Card style={{ width: "290px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "15px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography variant="h6">
                  <strong>Category : </strong>
                  {categoryName} <br />
                </Typography>
              </Grid>
              <Grid sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={
                    categoryImage ||
                    "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png"
                  }
                  sx={{ height: "190px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* sub category card */}

        <Grid item sm={3}>
          <Card style={{ width: "290px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "15px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography variant="h6">
                  <strong>Sub Category : </strong>
                  {subcategoryName} <br />
                </Typography>
              </Grid>
              <Grid sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={
                    subcategoryImage ||
                    "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png"
                  }
                  sx={{ height: "190px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* product*/}
        <Grid item sm={3}>
          <Card style={{ width: "290px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "15px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography variant="h6">
                  <strong>Product : </strong>
                  {productName} <br />
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <CardMedia
                  component="img"
                  width="160"
                  image={
                    productImage ||
                    "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png"
                  }
                  sx={{ height: "190px" }}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item sm={3}>
          <Card style={{ width: "380px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "15px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography variant="h5">
                  <strong>More Information </strong>
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <Typography variant="h6">
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
                          <Grid sm={4}>
                            <strong>
                              {index + 1} . {attr.attribute_key}
                            </strong>
                          </Grid>
                          <Grid sm={1}>:</Grid>
                          <Grid sm={7}>{attr.attribute_value}</Grid>
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
        Header: "Expand Rows",
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
        width: "9vw",
        minWidth: "9vw",
        Header: "Batch No",
        accessor: "tokenDetails.batch_no",
      },
      {
        width: "9vw",
        minWidth: "9vw",
        Header: "Category Name",
        accessor: "tokenDetails.categoryName",
      },
      {
        width: "9vw",
        minWidth: "9vw",
        Header: "Sub-Category Name",
        accessor: "tokenDetails.subcategoryName",
      },
      {
        width: "9vw",
        minWidth: "9vw",
        Header: "Product Name",
        accessor: "tokenDetails.productName",
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        width: "9vw",
        minWidth: "9vw",
        Header: "Title",
        accessor: "tokenDetails.title",
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        Header: "Action",
        accessor: "action",
        width: "450px",
        minWidth: "450px",
        disableFilters: true,
        Cell: ({ value }) => (
        //   <>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Button
                startIcon={<QrCode2Icon />}
                type="button"
                variant="contained"
                style={{ minWidth: "100px", maxWidth: "110px", width: "100px", borderRadius: 4 }}
                sx={{ textTransform: "none" }}
                onClick={() => handleAddTxn(value)}
              >
                AddTxn
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                startIcon={<QrCode2Icon />}
                type="button"
                variant="contained"
                style={{ minWidth: "100px", maxWidth: "110px", width: "100px", borderRadius: 4 }}
                sx={{ textTransform: "none" }}
                onClick={() => handleView(value)}
              >
                View
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                endIcon={<SendIcon />}
                type="button"
                variant="contained"
                style={{ minWidth: "90px", maxWidth: "100px", width: "100px", borderRadius: 4 }}
                sx={{ textTransform: "none" }}
                onClick={() => handleViewTxn(value)}
              >
                ViewTxn
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                endIcon={<AddCircleIcon />}
                type="button"
                variant="contained"
                style={{ minWidth: "100px", maxWidth: "100px", width: "100px !important", marginLeft: "5px",borderRadius: 4 }}
                sx={{ textTransform: "none" }}
                onClick={() => handleAdd(value)}
                // disabled={value && ("Batch No" in value)}
                color="warning"
                disabled
              >
                Add
              </Button>
            </Grid>
          </Grid>
        // </>
        )
      }
    ],
    []
  );

  return (
    <div className="container">
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
            title={row?.tokenDetails.title}
          />
        </Box>
      </Modal>
      <Grid container spacing={2}>
            <Grid item sm={12}>
              <h1
                style={{ marginLeft: 10}}
              >
                FILLED ASSIGNED TOKENS
              </h1>
            </Grid>

            <Grid item sm={12}>
              <Container
                style={{ marginTop: 10, maxWidth: "100% !important", overflowX: "scroll" }}
              >
                {tListArray.length > 0 && (
                  <FilledAssignedTokensTable
                    columns={columns}
                    data={tListArray}
                    renderRowSubComponent={renderRowSubComponent}
                  />
                )}
              </Container>
            </Grid>
      </Grid>
    </div>
  );
}
