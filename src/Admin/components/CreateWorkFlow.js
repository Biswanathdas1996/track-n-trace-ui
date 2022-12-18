import React from "react";
import { Box, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavLink } from "react-router-dom";
import './CreateWorkFlow.css';

const CreateWorkFlow = () => {

  let current = "current";
  let general = "general";

  return (
    <Box m={2}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <NavLink to="/category" className={({ isActive }) => isActive ? current : general} >
          Category
        </NavLink>
        <NavLink to="/sub-category" className={({ isActive }) => isActive ? current : general} >
          Sub Category
        </NavLink>
        <NavLink to="/product" className={({ isActive }) => isActive ? current : general} >
          Product
        </NavLink>
        <NavLink to="/publishArt" className={({ isActive }) => isActive ? current : general} >
          Create Order Tokens
        </NavLink>
        <NavLink to="/tokens" className={({ isActive }) => isActive ? current : general} >
          Order Token Tables
        </NavLink>
      </Breadcrumbs>
    </Box>
  );
};

export default CreateWorkFlow;
