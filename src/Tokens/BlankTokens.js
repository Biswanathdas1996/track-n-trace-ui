import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Grid } from "@mui/material";
import {
  Container,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import BlankTokensTable from "./BlankTokensTable";
import "../Styles/catFormFields.css";
import { getRequestLoggedIn } from "../functions/apiClient";
import { getAllTokensData } from "../endpoint";
import { useToken } from "../Context/token";
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

export default function BlankTokens() {
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
      const ep = getAllTokensData(1,0);
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
        created,
      },
    } = row.original;
    return (
      <Card style={{ width: "18rem", margin: "0 auto" }}>
        <CardTitle>
          <strong>Token Creation Date: </strong> {created} <br />
        </CardTitle>
        {/* ===========description */}
        <CardBody>
          <CardText>
            <strong>No data assigned to this Token</strong><br />
          </CardText>
        </CardBody>
      </Card>
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
              style={{ minWidth: "100px", maxWidth: "100px", width: "100px !important", marginLeft: "5px",borderRadius: 4 }}
              sx={{ textTransform: "none" }}
              onClick={() => handleAddTxn(value)}
              color="warning"
              disabled
            >
              AddTxn
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button
              startIcon={<QrCode2Icon />}
              type="button"
              variant="contained"
              style={{ minWidth: "100px", maxWidth: "100px", width: "100px !important", marginLeft: "5px",borderRadius: 4 }}
              sx={{ textTransform: "none" }}
              onClick={() => handleView(value)}
              color="warning"
              disabled
            >
              View
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button
              endIcon={<SendIcon />}
              type="button"
              variant="contained"
              style={{ minWidth: "100px", maxWidth: "100px", width: "100px !important", marginLeft: "5px",borderRadius: 4 }}
              sx={{ textTransform: "none" }}
              onClick={() => handleViewTxn(value)}
              color="warning"
              disabled
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
          <>
            <Grid item sm={12}>
              <h1
                style={{ marginLeft: 10}}
              >
                BLANK TOKENS
              </h1>
            </Grid>

            <Grid item sm={12}>
              <Container
                style={{ marginTop: 10, maxWidth: "120vw !important", overflowX: "scroll" }}
              >
                {tListArray.length > 0 && (
                  <BlankTokensTable
                    columns={columns}
                    data={tListArray}
                    renderRowSubComponent={renderRowSubComponent}
                  />
                )}
              </Container>
            </Grid>
          </>
        {/* )} */}
      </Grid>
    </div>
  );
}
