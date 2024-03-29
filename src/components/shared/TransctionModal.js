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

const steps = ["Initiating", "Waiting for confirmation", "Transction Status Generated"];

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

  const handleClose = () => {
    setOpen(false);
    modalClose();
  };

  const domData = response?.error ? response.error.receipt : response;
  // console.log('response', response);
  // console.log('domData',domData);
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
              {domData ? (
                domData?.status_code === "200" ? (
                  <b style={{ color: "green" }}>{domData.message}</b>
                ) : (
                  <b style={{ color: "red" }}>{domData.message}</b>
                )
              ) : (
                "Waiting for confirmation"
              )}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* {domData
                ? "Transactions request complete."
                : "Transactions have been initiated. Waiting for confirmation."} */}
              {domData ? (
                domData?.status_code === "200" ? (
                  "Transaction request complete."
                ) : (
                  "Transaction request failed. Please try again after sometime."
                )
              ) : (
                "Transaction has been initiated. Waiting for confirmation."
              )}
            </Typography>

            {domData?.status_code === "200" && (
              <List sx={{ width: "100%", bgcolor: "background.paper", overflowY: "scroll", height: "50vh" }}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Order Token ID"
                    secondary={
                      <React.Fragment><h5 style={{ color: "green" }}>{domData?.token_id}</h5></React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transaction hash"
                    secondary={
                      <React.Fragment>
                        <a
                          href={`https://goerli.etherscan.io/tx/${domData?.tokenHashDetails.transactionHash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {domData?.tokenHashDetails.transactionHash}
                        </a>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block hash"
                    secondary={
                      <React.Fragment>{domData?.tokenHashDetails?.blockHash}</React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Block number"
                    secondary={
                      <React.Fragment>{domData?.tokenHashDetails?.blockNumber}</React.Fragment>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transction from"
                    secondary={<React.Fragment>{domData?.tokenHashDetails?.from}</React.Fragment>}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary="Transction to"
                    secondary={<React.Fragment>{domData?.tokenHashDetails?.to}</React.Fragment>}
                  />
                </ListItem>
                <Divider component="li" />
              </List>
            )}

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
