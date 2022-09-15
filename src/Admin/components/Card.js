import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ token }) {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Token count
        </Typography>
        <Typography variant="h5" component="div">
          {token}
        </Typography>
      </CardContent>
    </Card>
  );
}
