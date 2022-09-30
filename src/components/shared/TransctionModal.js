import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const steps = ["Initiating", "Waiting for confirmation", "Transction complete"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransctionModal({ response, setStart, modalClose }) {
  const [open, setOpen] = React.useState(true);
  const responseData = response;
  const handleClose = () => {
    setOpen(false);
    modalClose();
    // setRefreshFlag(!refreshFlag);
  };

  // eslint-disable-next-line
  const domData = responseData?.error ? responseData.error.receipt : responseData;
  console.log("domData",domData);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 700 }}>
          <Stepper activeStep={domData ? 3 : 1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <center>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginTop: 30 }}
            >
              {/* eslint-disable-next-line */}
              {domData ? (
                domData?.status ? (
                  <b style={{ color: "green" }}>Transction complete</b>
                ) : (
                  <b style={{ color: "red" }}>Transction failed</b>
                )
              ) : (
                "Waiting for confirmation"
              )}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {domData
                ? "Transactions request complete."
                : "Transactions have been initiated. Waiting for confirmation."}
            </Typography>

            {domData && (
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transaction hash"
                    secondary={
                      <>
                        <a
                          href={`https://rinkeby.etherscan.io/tx/${domData?.transactionHash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {domData?.transactionHash}
                        </a>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block hash"
                    secondary={
                      <>{domData?.blockHash}</>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block number"
                    secondary={
                      <>{domData?.blockNumber}</>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transction from"
                    secondary={<>{domData?.from}</>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transction to"
                    secondary={<>{domData?.to}</>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            )}

            {/* eslint-disable-next-line */}
            {domData ? (
              <Button
                variant="contained"
                onClick={(e) => handleClose()}
                style={{ marginTop: 20 }}
              >
                Close
              </Button>
            ) : response?.error?.code === 4001 ? (
              <>
                <p style={{ color: "red", marginTop: 20 }}>
                  {response?.error?.message}
                </p>
                <Button
                  variant="contained"
                  onClick={(e) => handleClose()}
                  style={{ marginTop: 20 }}
                >
                  Close
                </Button>
              </>
            ) : (
              <CircularProgress style={{ marginTop: 30 }} />
            )}
          </center>
        </Box>
      </Modal>
    </div>
  );
}
