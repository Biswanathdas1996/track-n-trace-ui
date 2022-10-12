import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@mui/material";
import { getAuthData } from "../../functions/apiClient";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { QR_BASE_URL } from "../../config";
import Skeleton from "@mui/material/Skeleton";

export default function ProductTableBodyUI({ token }) {
  const [nftData, setNftData] = useState(null);

  const [loading, setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  let history = useNavigate();
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blankObj = {
    name: "",
    product: "",
    image: null,
    description: "",
    attributes: [],
    transction: [],
  };

  const getDetails = async () => {
    setLoading(true);
    const data = await getAuthData(`/get-token-data?id=${token}`);
    console.log("------>", data);
    if ("name" in data) {
      setNftData(data);
    } else {
      setNftData(blankObj);
    }
    setLoading(false);
  };

  return (
    <>
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
            value={`${QR_BASE_URL}/transctions/${token}`}
            title={nftData?.name}
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
            value={`${QR_BASE_URL}/add-tracking-data/${token}`}
            title={nftData?.name}
          />
        </Box>
      </Modal>

      {!loading ? (
        <TableRow hover tabIndex={-1}>
          <TableCell align="center">#{token}</TableCell>
          <TableCell align="center" style={{ display: "flex" }}>
            <Avatar alt="Remy Sharp" src={nftData?.image} />
            <b style={{ margin: 10 }}>{nftData?.name}</b>
          </TableCell>
          <TableCell align="center">{nftData?.product}</TableCell>

          <TableCell align="center">
            <center>
              <Button
                startIcon={<QrCode2Icon />}
                style={{ marginRight: 10 }}
                onClick={handleOpenForm}
              >
                Add TXN
              </Button>
              <Button
                variant="outlined"
                startIcon={<QrCode2Icon />}
                style={{ marginRight: 10 }}
                onClick={handleOpen}
              >
                View
              </Button>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                style={{ marginRight: 10 }}
                onClick={() => history(`/transctions/${token}`)}
              ></Button>

              <Button
                variant="contained"
                color="warning"
                endIcon={<AddCircleIcon />}
                onClick={() => history(`/add-token-data/${token}`)}
                disabled={nftData?.name}
              >
                Add
              </Button>
            </center>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow hover tabIndex={-1}>
          <TableCell align="center">
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
