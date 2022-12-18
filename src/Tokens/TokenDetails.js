import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import BlankTokens from "./BlankTokens"
import FilledAssignedTokens from "./FilledAssignedTokens";
import FilledUnassignedTokens from "./FilledUnassignedTokens"
import "../Styles/catFormFields.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";

export default function TokenDetails() {
  const [blankTokenFlag, setBlankTokenFlag] = useState(0);
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
    <div className="container tokenContainer">
      <Grid container spacing={2}
          style={{ paddingRight: "18px" }}
        >
        <Grid item sm={12} sx={{ ".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "0px" }}}>
          <span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(0,1)} 
            >
              Blank Tokens Table
            </Button>
          </span>
          <span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(1,0)} 
            >
              Filled Assigned Tokens
            </Button>
          </span>
          <span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(0,0)} 
            >
              Filled Unassigned Tokens
            </Button>
          </span>
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
