import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { QR_BASE_URL } from "../config";
import { getData } from "../functions/apiClient";
// import AddTokenData from "../components/AddTokenData";

// export default function ProductTableBodyUI({ token, labelId, isItemSelected, handleClick }) {
  export default function ProductTableBodyUI({ token, labelId, isItemSelected }) {
  const [nftData, setNftData] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  // const demoImg = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

  const history = useNavigate();
  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blankObj = {
    "name":"",
    "product":"",
    // "image":"https://ipfs.infura.io/ipfs/QmWMf45aY2biZMZkqJzHeuMo1ydMmxJt46Yt51X2aVyucn",
    "image" : null,
    "description":"",
    "attributes":[],
    "transction":[]
  }

  const getDetails = async () => {
    const data = await getData(`/get-token-data?id=${token}`);
    console.log("------>", data);
    // console.log("data.hasOwnProperty('name')", data.hasOwnProperty('name'));
    if ('name' in data) {
      setNftData(data);
    } else {
      setNftData(blankObj);
    }
    // ((Object.keys(data).length !== 0) ? setNftData(data) : setNftData(blankObj));
    // setNftData(data);
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

      <TableRow 
        hover 
        tabIndex={-1}
        // onClick={(event) => handleClick(event, token.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        key={token}
        selected={isItemSelected}
      >
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
            onChange={(event) => handleClick(event, token)}
          />
        </TableCell> */}
        <TableCell
            component="th"
            id={labelId}
            scope="token"
            padding="none"
            align="center"
          >
            #{token}
          </TableCell>
        {/* <TableCell align="center">#{token}</TableCell> */}
        <TableCell align="left" style={{ display: "flex" }}>
          <Avatar alt="Remy Sharp" src={nftData?.image} />
          <b style={{ margin: 10 }}>{nftData?.name}</b>
        </TableCell>
        <TableCell align="left">{nftData?.product}</TableCell>

        <TableCell align="left">
            <Button startIcon={<QrCode2Icon />} style={{ marginRight: 10 }} onClick={handleOpenForm} >
              Add TXN
            </Button>
            <Button variant="outlined" startIcon={<QrCode2Icon />} style={{ marginRight: 10 }} onClick={handleOpen} >
              View
            </Button>
            <Button variant="contained" endIcon={<SendIcon />} style={{ marginRight: 10 }} onClick={() => history(`/transctions/${token}`)} />
            <Button variant="contained" color="warning" endIcon={<AddCircleIcon />} 
            // onClick={() => <AddTokenData exact path='add-token-data/${token}' />}
            onClick={() => history(`add-token-data/${token}`)}
            disabled={nftData?.name} >
              Add
            </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
