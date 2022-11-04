import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import {
  Container,
  //   Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import FilledTokensTable from "./FilledTokensTable";
import "../Styles/catFormFields.css";
import { getRequestLoggedIn } from "../functions/apiClient";
import { getAllTokensData, distributerList } from "../endpoint";
// import AssignDistributer from "./AssignDistributer";
import { useToken } from "../Context/token";
import { SelectColumnFilter } from "../common/filters";
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

export default function FilledTokens() {
  const [tokenBool, setTokenBool] = useState(false);
  const [token, setToken] = useToken();
  const [tokenListArray, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [row, setRow] = useState(null);
  //   console.log('button clicked row==>',row);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  const [distributerListArray, setDistributerList] = useState([]);
  //   const [blankTokenFlag, setBlankTokenFlag] = useState(0);
  let history = useNavigate();

  useEffect(() => {
    const getTokenList = async () => {
      //   const res = await getRequestLoggedIn(tokenList);
      const ep = getAllTokensData(0);
      const res = await getRequestLoggedIn(ep);
      if (res?.status_code === "200") {
        // console.log('res',res);
        const tokenList = res.data.map((obj) => obj);
        setTokenList(tokenList);
        setTokenList((tokenListArray) => {
          return tokenListArray;
        });
      }
    };

    const getDistributerList = async () => {
      const res = await getRequestLoggedIn(distributerList);
      if (res?.status_code === "200") {
        const dList = res.distributerList.map((obj) => obj);
        setDistributerList(dList);
        setDistributerList((distributerList) => {
          return distributerList;
        });
      }
    };

    getTokenList();
    getDistributerList();
  }, [tokenBool]);

  const tListArray = tokenListArray.map((tokenData) => ({
    ...tokenData,
    action: tokenData,
  }));
  //   console.log('distributerListArray',distributerListArray);

  //   console.log('tokenListArray',tokenListArray);
  //   console.log('tListArray',tListArray);

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
      //   attributes: [{
      //     attribute_key, attribute_value
      //   }],
      //   picture,
    } = row.original;
    return (
      <Grid container>
        {/* category card */}

        <Grid item sm={3}>
          <Card style={{ width: "22rem", margin: "0 auto" }}>
            <CardTitle style={{ height: "100px", paddingBottom: "10px" }}>
              <Typography variant="h6" sx={{ margin: "auto" }}>
                <strong>Category : </strong>
                {categoryName} <br />
              </Typography>
            </CardTitle>
            <CardMedia
              component="img"
              width="160"
              image={
                categoryImage ||
                "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png"
              }
              sx={{ height: "300px" }}
            />
          </Card>
        </Grid>
        {/* sub category card */}

        <Grid item sm={3}>
          <Card style={{ width: "22rem", margin: "0 auto" }}>
            <CardTitle style={{ height: "100px", paddingBottom: "10px" }}>
              <Typography variant="h6" sx={{ margin: "auto" }}>
                <strong>Sub Category: </strong>
                {subcategoryName} <br />
              </Typography>
            </CardTitle>
            <CardMedia
              component="img"
              width="160"
              image={
                subcategoryImage ||
                "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png"
              }
              sx={{ height: "300px" }}
            />
          </Card>
        </Grid>
        {/* product*/}

        <Grid item sm={3}>
          <Card style={{ width: "22rem", margin: "0 auto" }}>
            <CardTitle style={{ height: "100px", paddingBottom: "10px" }}>
              <Typography variant="h6" sx={{ margin: "auto" }}>
                <strong>Product :</strong> {productName}
                <br />
                <strong>Title : </strong>
                {title}
                <br />
                <strong>Description :</strong>
                {description}
                <br />
              </Typography>
            </CardTitle>
            <CardMedia
              component="img"
              width="160"
              image={
                "https://trckndtrce.azurewebsites.net/trackndtrace/product_images/img1667541515.png" ||
                productImage
              }
              sx={{ height: "300px" }}
            />
          </Card>
        </Grid>
        {/* tokens card */}

        <Grid item sm={3}>
          <Card style={{ width: "22rem", margin: "0 auto" }}>
            <CardTitle style={{ height: "100px", paddingBottom: "10px" }}>
              <Typography variant="h6" sx={{ margin: "auto" }}>
                <strong>Batch No. : </strong> {batch_no}
                <br />
                <strong>Created Date: </strong>: {created}
                <br />
                <strong>Modified Date: </strong>: {modified}
                <br />
              </Typography>
            </CardTitle>
          </Card>
        </Grid>
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
        Header: () => null,
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
        Header: "Token ID",
        accessor: "id",
      },
      {
        Header: "Batch No",
        accessor: "tokenDetails.batch_no",
      },
      {
        Header: "Category Name",
        accessor: "tokenDetails.categoryName",
      },
      {
        Header: "Sub-Category Name",
        accessor: "tokenDetails.subcategoryName",
      },
      {
        Header: "Product Name",
        accessor: "tokenDetails.productName",
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        Header: "Title",
        accessor: "tokenDetails.title",
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        Header: "Action",
        accessor: "action",
        width: "22vw",
        minWidth: "285px",
        Cell: ({ value }) => (
          //   <>
          <Grid container spacing={2}>
            <Grid item sm={3}>
              <Button
                startIcon={<QrCode2Icon />}
                type="button"
                variant="contained"
                style={{ width: "5vw", borderRadius: 4 }}
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
                style={{ width: "5vw", borderRadius: 4 }}
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
                style={{ width: "5vw", borderRadius: 4 }}
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
                style={{ width: "5vw", borderRadius: 4 }}
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
        ),
      },
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
        {!tokenBool && (
          <>
            <Grid item sm={12}>
              <h1>FILLED TOKENS</h1>
            </Grid>

            <Grid item sm={12}>
              <Container
                style={{
                  marginTop: 10,
                  maxWidth: "80vw !important",
                  overflowX: "scroll",
                }}
              >
                {tListArray.length > 0 && (
                  <FilledTokensTable
                    columns={columns}
                    data={tListArray}
                    renderRowSubComponent={renderRowSubComponent}
                    distributerListArray={distributerListArray}
                  />
                )}
              </Container>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
