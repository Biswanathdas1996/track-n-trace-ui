import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Container } from "reactstrap";
import BlankTokensTable from "./BlankTokensTable";
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
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm={7}>
          <Card style={{ width: "400px", height: "80px" }}>
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
                  <strong>Token Creation Date: </strong> {created} 
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <Typography >
                  <strong>No data assigned to this Token </strong>
                </Typography>
              </Grid>
            </Grid>
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
        // Header: () => null,
        // Header: "Expand Rows",
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            Expand Rows <br />
            {isAllRowsExpanded ? '👇' : '👉'}
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
        Header: "Action",
        accessor: "action",
        width: "450px",
        minWidth: "450px",
        disableFilters: true,
        Cell: ({ value }) => (
        //   <>
          <Grid container spacing={2} sx={{ marginLeft: "2px", marginTop: "2px"}}>
          <span>
            <Button startIcon={<QrCode2Icon />} type="button" variant="outlined"  disabled
              sx={{ marginRight: "20px", marginLeft: "5px", textTransform: "none", fontWeight: 800,
                backgroundColor: "rgba(0, 0, 0, 0.12) !important", color: "rgba(0, 0, 0, 0.26) !important", boxShadow: "none", borderColor: "rgba(0, 0, 0, 0.26) !important",
                ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
              }}
              style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }}
              onClick={() => handleAddTxn(value)} 
            >
              AddTxn
            </Button>
          </span>
          <span>
            <Button startIcon={<QrCode2Icon />} type="button" variant="outlined"  disabled
              sx={{ marginRight: "20px", marginLeft: "5px", textTransform: "none", fontWeight: 800,
                backgroundColor: "rgba(0, 0, 0, 0.12) !important", color: "rgba(0, 0, 0, 0.26) !important", boxShadow: "none", borderColor: "rgba(0, 0, 0, 0.26) !important",
                ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
              }}
              style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }}
              onClick={() => handleView(value)} 
            >
              View
            </Button>
          </span>
          <span>
            <Button endIcon={<SendIcon />} type="button" variant="outlined"  disabled
              sx={{ marginRight: "20px", marginLeft: "5px", textTransform: "none", fontWeight: 800,
                backgroundColor: "rgba(0, 0, 0, 0.12) !important", color: "rgba(0, 0, 0, 0.26) !important", boxShadow: "none", borderColor: "rgba(0, 0, 0, 0.26) !important",
                ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
              }}
              style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }}
              onClick={() => handleViewTxn(value)} 
            >
              ViewTxn
            </Button>
          </span>
          <span>
            <Button endIcon={<AddCircleIcon />} type="button" variant="outlined"
              sx={{ marginRight: "20px", textTransform: "none", fontWeight: 800, "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
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
        )
      }
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
        <Grid item sm={12} sx={{".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "5px !important" }}}>
          <h3 style={{ marginLeft: 10}}> BLANK TOKENS</h3>
        </Grid>
        <Grid item sm={2}/>
        <Grid item sm={8} sx={{ paddingTop: "8px !important"}}>
          <Container
            style={{ marginTop: 10, maxWidth: "100% !important" }}
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
      </Grid>
    </div>
  );
}
