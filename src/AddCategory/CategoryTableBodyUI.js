import React, { useState, useContext } from "react";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Stack,
  Grid,
} from "@mui/material";
import { ApplicationContext } from "../Context/ApplicationContext";
import { useNavigate } from "react-router-dom";

import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";
import { categoryDetailsEp, categoryList, deleteCategory } from "../endpoint";

export default function CategoryTableBodyUI({
  category,
  idData,
  setCategoryDetails,
  categoryImage,
}) {
  const { categoryDataArray, setCategoryDataArray } =
    useContext(ApplicationContext);
  const navigation = useNavigate();

  const getCategoryList = async () => {
    const res = await getRequestLoggedIn(categoryList);
    if (res?.status_code === "200") {
      return res;
    }
    return null;
  };
  const getCategoryDetail = async (id) => {
    const response = await getRequestLoggedIn(categoryDetailsEp(id));
    if ((response.state_code = "200")) {
      setCategoryDetails({
        categoryName: response?.data?.category_name,
        categoryId: id,
        edit: true,
        categoryImage: response?.data?.category_image,
      });
    }
    return null;
  };

  const handleDeleteCategory = async (id) => {
    const data = {
      category_id: id,
    };
    const res = await postRequestLoggedIn(deleteCategory, data);
    if (res?.status_code === "200") {
      const resData = await getCategoryList();
      const catArr = resData?.categoryList;
      setCategoryDataArray([...catArr]);
    }
  };

  return (
    <Grid item sx={{ padding: "15px" }}>
      <Box width="220px">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px",
            background: "#ebecf0",
            boxShadow: "8px 8px 4px #d3d3d3",
          }}
        >
          <CardActions sx={{ height: "190px" }}>
            <CardMedia
              component="img"
              image={categoryImage}
              onClick={() => navigation(`/sub-category?catId=${idData}`)}
            />
          </CardActions>
          <CardActions>
            <Grid sx={{ fontSize: "20px", fontWeight: "bold" }}>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  onClick={() => navigation(`/sub-category?catId=${idData}`)}
                >
                  {category}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions sx={{ padding: 0 }}>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => handleDeleteCategory(idData)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button
                onClick={() => getCategoryDetail(idData)}
                variant="contained"
                color="error"
              >
                Edit
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
}
