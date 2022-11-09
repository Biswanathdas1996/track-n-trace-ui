import { Typography, Grid, Button } from "@mui/material";
import React from "react";
const NotFoundPage = () => {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ paddingTop: "100px" }}
    >
      <Grid item sm={12}>
        <Typography variant="h3" color="red">
          Page Not found
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h3" color="red">
          Or
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <Typography variant="h3" color="red">
          Invalid Access{" "}
        </Typography>
      </Grid>
      <Grid item sm={12} sx={{ paddingTop: "30px" }}>
        <Grid container>
          <Grid item>
            <Typography variant="h5">
              Click to navigate to the dashboard -
            </Typography>
          </Grid>
          <Button href="/dashboard">Navigate to Dashboard</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NotFoundPage;
