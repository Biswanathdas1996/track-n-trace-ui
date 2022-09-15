import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function DashboardButtonCard({ text, link }) {
  let history = useNavigate();
  return (
    <Card style={{ padding: 30 }}>
      <CardContent>
        <Grid container justify="center">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            style={{ padding: 20 }}
            onClick={() => history(link)}
          >
            {text}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}
