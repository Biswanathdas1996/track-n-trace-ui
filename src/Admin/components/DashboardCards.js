// @mui
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

DashboardCards.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function DashboardCards({
  title,
  total,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6">{title}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
        {total}
      </Typography>
    </Card>
  );
}
