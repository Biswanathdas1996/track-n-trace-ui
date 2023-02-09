import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function BulkTransctionModal({ response, modalClose }) {
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
                  "Bulk Transaction request complete."
                ) : (
                  "Bulk Transaction request failed. Please try again after sometime."
                )
              ) : (
                "Transaction have been initiated. Waiting for confirmation."
              )}
            </Typography>

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
