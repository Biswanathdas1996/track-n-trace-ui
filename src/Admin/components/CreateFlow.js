import React, { useState } from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CreateFlow = () => {
  const [value, setValue] = useState("1");
  const changeHandler = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Breadcrumbs
        aria-label="breadcrumbs"
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
          Order Token
        </Link>
      </Breadcrumbs>
    </Box>
  );
};

export default CreateFlow;
