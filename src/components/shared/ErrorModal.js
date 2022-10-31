import React from "react";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ErrorModal = ({ open, setOpen, errorText }) => {
  return (
    <Grid>
      <Dialog
        open={open}
        onClose={setOpen}
        aria-labelledby="error-title"
        aria-describedby="errror-desc"
      >
        <DialogTitle
          id="error-title"
          style={{
            margin: "auto",
            textTransform: "none",
            color: "red",
            fontSize: "1.75rem",
            paddingBottom: "0",
          }}
        >
          Oops
        </DialogTitle>
        \
        <DialogContent id="errror-desc">
          <DialogContentText
            style={{
              margin: "auto",
              color: "black",
              paddingTop: "0",
              textAlign: "center",
            }}
          >
            {errorText ? (
              errorText
            ) : (
              <div>
                <div>Something went wrong..!! </div>
                <div>Please try agaain in some time.</div>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            paddingBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            color="error"
            style={{
              margin: "auto",
              textTransform: "none",
            }}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
        {/* <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            width: "30%",
            height: "30%",
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
            <div className="aaaa">
              <div>{errorText ? errorText : "Something went wrong"}</div>
              <div>
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
          </div>
        </Box> */}
      </Dialog>
    </Grid>
  );
};

export default ErrorModal;
