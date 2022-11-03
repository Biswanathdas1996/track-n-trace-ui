import React, { useContext } from "react";
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
import { ApplicationContext } from "../Context/ApplicationContext";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";
import { deleteProduct, productDetails, productList } from "../endpoint";

export default function ProductTableBodyUI({
  category,
  subCategory,
  product,
  id,
  prodIdData,
  subCatIdData,
  catIdData,
  prodDetails,
  setProdDetails,
  productImage,
}) {
  const { setProductDataArray } = useContext(ApplicationContext);
  const navigation = useNavigate();

  const getProductList = async () => {
    const res = await getRequestLoggedIn(productList);
    if (res?.status_code === "200") {
      return res.productList;
    }
    return null;
  };

  const getProdDetail = async (id) => {
    const response = await getRequestLoggedIn(productDetails(id));
    if ((response.state_code = "200")) {
      setProdDetails({
        categoryId: response?.data?.category_id,
        sub_category_id: response?.data?.subcategory_id,
        product_id: id,
        productName: product,
        edit: true,
        productImage: response?.data?.product_image,
      });
    }
    return null;
  };

  const handleDeleteProduct = async (id) => {
    const data = {
      product_id: id,
    };
    const res = await postRequestLoggedIn(deleteProduct, data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      setProductDataArray(resData);
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
              image={productImage}
              onClick={() => {
                navigation(`/publishArt?prodId=${prodIdData}`);
              }}
            />
          </CardActions>
          <CardActions>
            <Grid
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
                padding: "0",
              }}
            >
              <Grid> Category - {category}</Grid>
              <Grid>Sub Category - {subCategory}</Grid>
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
                  onClick={() => {
                    navigation(`/publishArt?prodId=${prodIdData}`);
                  }}
                >
                  {product}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => handleDeleteProduct(prodIdData)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button
                onClick={() => getProdDetail(prodIdData)}
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
