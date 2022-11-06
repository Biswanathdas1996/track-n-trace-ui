import React, { useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../Context/ApplicationContext";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";
import {
  deleteSubCategory,
  subCategoryDetailsEp,
  subCategoryList,
} from "../endpoint";

export default function SubCategoryTableBodyUI({
  category,
  subCategory,
  subCatIdData,
  catIdData,
  setSubCategoryDetails,
  subCategoryImage,
  setSubCategoryBool,
}) {
  const { setSubCategoryDataArray } = useContext(ApplicationContext);

  const navigation = useNavigate();

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn(subCategoryList);
    if (res?.status_code === "200") {
      return res.sub_categoryList;
    }
    return null;
  };
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

  const handleDeleteSubCategory = async (id) => {
    const data = {
      subcategory_id: id,
    };
    const res = await postRequestLoggedIn(deleteSubCategory, data);
    if (res?.status_code === "200") {
      const resData = await getSubCategoryList();
      setSubCategoryDataArray(resData);
      //window.location.reload();
    }
  };

  return (
    <Grid item sx={{ padding: "10px" }}>
      <Box width="300px">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardActions sx={{ height: "300px" }}>
            <CardMedia
              component="img"
              width="160"
              image={subCategoryImage}
              onClick={() =>
                navigation(
                  `/product?catId=${catIdData}&subCatId=${subCatIdData}`
                )
              }
            />
          </CardActions>
          <CardActions>
            <Grid sx={{ fontSize: "15px", fontWeight: "bold" }}>
              <Grid>Category - {category}</Grid>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                <Button
                  size="large"
                  onClick={() =>
                    navigation(
                      `/product?catId=${catIdData}&subCatId=${subCatIdData}`
                    )
                  }
                >
                  {subCategory}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => handleDeleteSubCategory(subCatIdData)}
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
