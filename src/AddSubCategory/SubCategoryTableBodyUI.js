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
import { getRequestLoggedIn } from "../functions/apiClient";
import { subCategoryDetailsEp } from "../endpoint";
import "../App.css"

export default function SubCategoryTableBodyUI({
  category,
  subCategory,
  subCatIdData,
  catIdData,
  setSubCategoryDetails,
  subCategoryImage,
  setSubCategoryBool,
  setOpenDeleteModal,
  deleteModal,
}) {

  const navigation = useNavigate();

  const delSubCatFun = (id, subCat) => {
    setOpenDeleteModal(true);
    deleteModal(id, subCat)
  }

  const getSubCategoryDetail = async (id) => {
    setSubCategoryBool(true);
    const response = await getRequestLoggedIn(subCategoryDetailsEp(id));
    if ((response.state_code = "200")) {
      setSubCategoryDetails({
        categoryId: response?.data?.category_id,
        subCategoryId: id,
        subCategoryName: subCategory,
        edit: true,
        subCategoryImage: response?.data?.subcategory_image,
      });
    }
    return null;
  };

  return (
    <Grid item sx={{ padding: "1px 20px 20px 0px" }}>
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
              image={subCategoryImage}
              onClick={() =>
                navigation(
                  `/product?catId=${catIdData}&subCatId=${subCatIdData}`
                )
              }
            />
          </CardActions>
          <CardActions sx={{ padding: "2px !important" }}>
            <Grid
              sx={{ fontSize: "13px", fontWeight: "bold", textAlign: "center" }}
            >
              <Grid>Category - {category}</Grid>
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
                  size="large"
                  onClick={() => navigation(`/product?catId=${catIdData}&subCatId=${subCatIdData}`)}
                  sx= {{ 
                    color: "#AD1B02 !important", fontWeight: "600 !important", fontSize: "13px", padding: "2px 10px",
                    "&:hover": { color: "#F3BE26 !important" }
                  }}
                >
                  {subCategory}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions sx={{ padding: 0 }}>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => delSubCatFun(subCatIdData, subCategory)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button
                onClick={() => getSubCategoryDetail(subCatIdData)}
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
