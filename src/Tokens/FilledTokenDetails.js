import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import FilledAssignedTokens from "./FilledAssignedTokens";
import FilledUnassignedTokens from "./FilledUnassignedTokens"
import "../Styles/catFormFields.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";

export default function FilledTokenDetails() {
  const [assignedFlag, setAssignedFlag] = useState(0);

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item sm={8} />
        <Grid item sm={2}>
          <Button
            type="button"
            variant="contained"
            style={{ float: "right", padding: 8, borderRadius: 4 }}
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            onClick={() => setAssignedFlag(0)}
          >
            Filled & Unassigned Tokens
          </Button>
        </Grid>
        <Grid item sm={2}>
          <Button
            type="button"
            variant="contained"
            style={{ float: "right", padding: 8, borderRadius: 4 }}
            sx={{
              marginRight: "20px",
              textTransform: "none",
            }}
            onClick={() => setAssignedFlag(1)}
          >
            Filled & Assigned Tokens
          </Button>
        </Grid>

        {assignedFlag === 0 && (
            <Grid item sm={12}>
                <FilledUnassignedTokens />
            </Grid>
        )}
        {assignedFlag === 1 && (
            <Grid item sm={12}>
                <FilledAssignedTokens />
            </Grid>
        )}
      </Grid>
    </div>
  );
}
