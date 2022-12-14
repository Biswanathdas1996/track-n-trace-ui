import React, { useState, useEffect } from "react";
import { Button, TableRow, TableCell, Typography } from "@mui/material";

export default function TableBodyUI({ user }) {
  const [usersData, setUsersData] = useState({});

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = async () => {
    await fetch(user?.uri)
      .then((response) => response.json())
      .then((data) => {
        setUsersData(data);
      });
  };

  const { addressId } = user;
  const { name, guid, employeeID } = usersData;
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align="center">{name}</TableCell>
      <TableCell align="center">{guid}</TableCell>
      <TableCell align="center">{employeeID}</TableCell>
      <TableCell align="center">
        <Typography
          style={{ fontSize: 14, cursor: "pointer" }}
          variant="body2"
          paragraph
          item
          fontWeight="600"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "10rem",
          }}
          title={addressId}
        >
          {addressId}
        </Typography>
      </TableCell>
      <TableCell align="center">ll</TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          size="small"
          style={{ float: "right", borderRadius: 4 }}
          sx={{
            marginRight: "0px",
            textTransform: "none",
          }}
        >
          Send Coins
        </Button>
      </TableCell>
    </TableRow>
  );
}
