import React from "react";
import { Box, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavLink } from "react-router-dom";
import { useUser } from "../../Context/user";
import './CreateWorkFlow.css';

const CreateWorkFlow = () => {

  let currentLink = "currentLink";
  let general = "general";
  const user = useUser();
  const role = user.user_role;

  return (
    <Box m={2}>
      {(role === '1') && (<Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <NavLink to="/category" className={({ isActive }) => isActive ? currentLink : general} >
          Category
        </NavLink>
        <NavLink to="/sub-category" className={({ isActive }) => isActive ? currentLink : general} >
          Sub Category
        </NavLink>
        <NavLink to="/product" className={({ isActive }) => isActive ? currentLink : general} >
          Product
        </NavLink>
        <NavLink to="/publishArt" className={({ isActive }) => isActive ? currentLink : general} >
          Create Order Tokens
        </NavLink>
        <NavLink to="/tokens" className={({ isActive }) => isActive ? currentLink : general} >
          Order Token Tables
        </NavLink>
      </Breadcrumbs>)}
    </Box>
  );
};

export default CreateWorkFlow;
