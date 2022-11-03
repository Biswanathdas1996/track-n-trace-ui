import React from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const CreateWorkFlow = () => {
  return (
    <Box m={2}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link underline="hover" href="/category">
          Category
        </Link>
        <Link underline="hover" href="/sub-category">
          Sub Category
        </Link>
        <Link underline="hover" href="/product">
          Product
        </Link>
        <Link underline="hover" href="/publishArt">
          Create Tokens
        </Link>
        <Link underline="hover" href="/tokens">
          Assign Tokens To Distributor
        </Link>
      </Breadcrumbs>
    </Box>
  );
};

export default CreateWorkFlow;
