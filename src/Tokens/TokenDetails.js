import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import BlankTokens from "./BlankTokens"
import FilledAssignedTokens from "./FilledAssignedTokens";
import FilledUnassignedTokens from "./FilledUnassignedTokens"
import "../Styles/catFormFields.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";
import { useUser } from "../Context/user";

export default function TokenDetails() {
  const [blankTokenFlag, setBlankTokenFlag] = useState(0);
  const [assignedFlag, setAssignedFlag] = useState(0);
  const user = useUser();
  const role = user.user_role;

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
      <Grid container spacing={2} sx={{ width: "96%" }}>
        <Grid item sm={12} sx={{ ".css-mhc70k-MuiGrid-root>.MuiGrid-item": { paddingTop: "0px" }}}>
          {(role == 1) && (<span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(0,1)} 
            >
              Blank Tokens Table
            </Button>
          </span>)}
          <span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(1,0)} 
            >
              { (role == 1) ? "Filled Assigned Tokens" : "Assigned Tokens"}
            </Button>
          </span>
          <span className="input-group-btn">
            <Button type="button" variant="outlined" 
              sx={{ marginRight: "20px", fontWeight: 600, marginTop: "5px", letterSpacing: "0.1em", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
              style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
              onClick={() => setFlag(0,0)} 
            >
              { (role == 1) ? "Filled Unassigned Tokens" : "Received Tokens"}
              
            </Button>
          </span>
        </Grid>
      </Grid>

{(assignedFlag === 0 && blankTokenFlag === 0) && (
    <Grid item sm={12} sx={{ width: "96%" }}>
        <FilledUnassignedTokens />
    </Grid>
)}
{(assignedFlag === 1 && blankTokenFlag === 0) && (
    <Grid item sm={12} sx={{ width: "96%" }}>
        <FilledAssignedTokens />
    </Grid>
)}
{(role == 1) && (assignedFlag === 0 && blankTokenFlag === 1) && (
    <Grid item sm={12} sx={{ width: "96%" }}>
        <BlankTokens />
    </Grid>
)}
    </div>
  );
}
