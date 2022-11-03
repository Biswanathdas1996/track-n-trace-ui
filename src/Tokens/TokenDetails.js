import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import FilledTokens from "./FilledTokens";
import BlankTokens from "./BlankTokens"
import "../Styles/catFormFields.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tokens.css";

export default function TokenDetails() {
  const [blankTokenFlag, setBlankTokenFlag] = useState(0);

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
            onClick={() => setBlankTokenFlag(0)}
          >
            Filled Tokens Table
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
            onClick={() => setBlankTokenFlag(1)}
          >
            Blank Tokens Table
          </Button>
        </Grid>

        {blankTokenFlag === 0 && (
            <Grid item sm={12}>
                <FilledTokens />
            </Grid>
        )}
        {blankTokenFlag === 1 && (
            <Grid item sm={12}>
                <BlankTokens />
            </Grid>
        )}
      </Grid>
    </div>
  );
}
