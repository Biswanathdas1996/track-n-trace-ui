import * as React from "react";
import Typography from "@mui/material/Typography";

export default function TextError(props) {
  return (
    <div>
      <Typography style={{ color: "red" }}>{props.children}</Typography>
    </div>
  );
}
