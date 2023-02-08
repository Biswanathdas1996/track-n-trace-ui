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
import { getRequestLoggedIn } from "../functions/apiClient";
import { productDetails } from "../endpoint";
import "../App.css"

export default function ProductTableBodyUI({
  category,
  subCategory,
  product,
  prodIdData,
  setProdDetails,
  productImage,
  setProductBool,
  setOpenDeleteModal,
  deleteModal,
}) {
  const navigation = useNavigate();

  const delProdFun = (id, prod) => {
    setOpenDeleteModal(true);
    deleteModal(id, prod)
  }

  const getProdDetail = async (id) => {
    setProductBool(true);
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
              image={productImage}
              onClick={() => {
                navigation(`/publishArt?prodId=${prodIdData}`);
              }}
            />
          </CardActions>
          <CardActions sx={{ padding: "2px !important" }}>
            <Grid
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                padding: "0",
                textAlign: "center",
              }}
            >
              <Grid> Category - {category}</Grid>
              <Grid>Sub-Cat - {subCategory}</Grid>
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
                  onClick={() => navigation(`/publishArt?prodId=${prodIdData}`)}
                  sx= {{ 
                    color: "#AD1B02 !important", fontWeight: "600 !important", fontSize: "13px", padding: "2px 10px",
                    "&:hover": { color: "#F3BE26 !important" }
                  }}
                >
                  {product}
                </Button>
              </CardActions>
            </Grid>
          </CardActions>
          <CardActions sx={{ padding: 0 }}>
            <Stack spacing={5} direction="row">
              <Button
                onClick={() => delProdFun(prodIdData, product)}
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
