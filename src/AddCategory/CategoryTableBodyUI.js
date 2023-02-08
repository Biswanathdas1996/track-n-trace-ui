import React from "react";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardMedia,
  Stack,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getRequestLoggedIn,
} from "../functions/apiClient";
import { categoryDetailsEp } from "../endpoint";
import "../App.css"

export default function CategoryTableBodyUI({
  category,
  idData,
  setCategoryDetails,
  categoryImage,
  setOpenDeleteModal,
  deleteModal,
}) {
  const navigation = useNavigate();
  
  const delCatFun = (id, cat) => {
    setOpenDeleteModal(true);
    deleteModal(id, cat)
  }
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

  return (
    <Grid item sx={{ padding: "0px 20px 20px 0px" }}>
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
          <CardActions sx={{ padding: "2px !important" }}>
            <Grid sx={{ fontSize: "20px", fontWeight: "bold" }}>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "0px"
                }}
              >
                <Button
                  onClick={() => navigation(`/sub-category?catId=${idData}`)}
                  sx= {{ 
                    color: "#AD1B02 !important", fontWeight: "600 !important", fontSize: "13px",
                    "&:hover": { color: "#F3BE26 !important" }
                  }}
                >
                  {category}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions sx={{ padding: 0 }}>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => delCatFun(idData, category)}
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
