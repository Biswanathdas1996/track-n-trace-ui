import React from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";

const ErrorModal = ({ open, setOpen, errorText }) => {
  return (
    <Grid>
      <Modal
        open={open}
        onClose={setOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            width: "50%",
            height: "50%",
            color: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {errorText}
              </Typography>
              <Button
                type="button"
                variant="contained"
                style={{ margin: 9, padding: 8, borderRadius: 4 }}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ErrorModal;
