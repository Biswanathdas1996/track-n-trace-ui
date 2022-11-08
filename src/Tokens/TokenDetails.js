import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import BlankTokens from "./BlankTokens"
import FilledAssignedTokens from "./FilledAssignedTokens";
import FilledUnassignedTokens from "./FilledUnassignedTokens"
import "../Styles/catFormFields.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";

export default function TokenDetails() {
  const [blankTokenFlag, setBlankTokenFlag] = useState(1);
  const [assignedFlag, setAssignedFlag] = useState(0);

  const setFlag = (aFlag, bFlag) => {

    setBlankTokenFlag(bFlag);
    setBlankTokenFlag((blankTokenFlag) => {
      return blankTokenFlag;
    });

    setAssignedFlag(aFlag);
    setAssignedFlag((assignedFlag) => {
      return assignedFlag;
    });
  }

  return (
    <div className="container">
      <Grid container spacing={2}
          style={{ paddingRight: "18px" }}
        >
        <Grid item sm={6} />
        <Grid item sm={2}>
          <Button
            type="button"
            variant="contained"
            style={{ minWidth: "12vw", maxWidth: "15vw", float: "right", padding: 8, borderRadius: 4 }}
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            onClick={() => setFlag(0,0)}
          >
            Filled Unassigned Tokens
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            type="button"
            variant="contained"
            style={{ minWidth: "12vw", maxWidth: "15vw", float: "right", padding: 8, borderRadius: 4 }}
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            onClick={() => setFlag(1,0)}
          >
            Filled Assigned Tokens
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            type="button"
            variant="contained"
            style={{ minWidth: "12vw", maxWidth: "15vw", float: "right", padding: 8, borderRadius: 4 }}
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            onClick={() => setFlag(0,1)}
          >
            Blank Tokens Table
          </Button>
        </Grid>
      </Grid>

{(assignedFlag === 0 && blankTokenFlag === 0) && (
    <Grid item sm={12}>
        <FilledUnassignedTokens />
    </Grid>
)}
{(assignedFlag === 1 && blankTokenFlag === 0) && (
    <Grid item sm={12}>
        <FilledAssignedTokens />
    </Grid>
)}
{(assignedFlag === 0 && blankTokenFlag === 1) && (
    <Grid item sm={12}>
        <BlankTokens />
    </Grid>
)}
    </div>
  );
}
