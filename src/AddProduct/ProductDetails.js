import React, { useState, useContext } from "react";
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import ProductTable from "./ProductTable";
import { ProductContext } from "../Context/ProductContext";
import { CategoryContext } from "../Context/CategoryContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";

export default function ProductDetails() {
  const [productBool, setProductBool] = useState(false);
  const [subCategoryDataArray, setSubCategoryDataArray] = useState([]);
  const [productData, setProductData] = useState({
    categoryId: "",
    subcategory_id: "",
    product_id: "",
    productName: "",
  });
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const [productDataArray, setProductDataArray] = useContext(ProductContext);
  console.log('categoryDataArray',categoryDataArray);
  console.log('subCategoryDataArray',subCategoryDataArray);
  console.log('productDataArray',productDataArray);

  const getProductList = async () => {
    const res = await getRequestLoggedIn("/productList");
    if (res?.status_code === "200") {
      return res.productList.map((obj) => obj);
    }
    return null;
  }

  const handleChange = async (event) => {
    let name = event.target.name;
    let val = event.target.value;

    console.log('name', name);
    console.log('val', val);

    if (name === "categoryId") {
      const subCategoryArr = await getSubCategoryList(val);
      setSubCategoryDataArray(subCategoryArr);
    }
    setProductData ((prevalue) => {
      console.log('prevalue',prevalue);
      return {
        ...prevalue,
        [name] : val,
      }
    })
  }
  
  const getSubCategoryList = async (val) => {
    const res = await getRequestLoggedIn(`/sub_categoryList?cat_id=${val}`);
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => obj);
    }
    return null;
  }

  const handleAddProduct = async () => {
    setProductBool(false);
    const data = {
      category_id: productData.categoryId,
      subcategory_id: productData.subcategory_id,
      product_id: "",
      product_name: productData.productName,
      product_image: "",
      product_attributes: [],
    }
    console.log('data',data);
    const res = await postRequestLoggedIn("/add_edit_product", data);
    if (res.status_code === "200") {
      const productArr = await getProductList();
      setProductDataArray(productArr);
      window.location.reload();
    }
  };

  // console.log("------>", setData);

  return (
    <div className="container">
      <Grid container spacing={2}>
        {productBool && (
          <Card
            sx={{
              boxShadow: 0,
              height: "305px",
              width: "100%",
              backgroundColor: "rgb(241 247 253)",
            }}
          >
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <FormControl sx={{ width: "74%" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  id="fullWidth"
                  onChange={(e) => handleChange(e)}
                  value={productData.categoryId}
                  name='categoryId'
                >
                  {categoryDataArray.map(cat =>
                    (<MenuItem key={cat.category_id} value={cat.category_id}>{cat.category_name}</MenuItem>)
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <FormControl sx={{ width: "74%" }}>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  label="Sub Category"
                  id="fullWidth"
                  onChange={(e) => handleChange(e)}
                  value={productData.subcategory_id}
                  name='subcategory_id'
                >
                  {subCategoryDataArray.map(subCat =>
                    (<MenuItem key={subCat.sub_category_id} value={subCat.sub_category_id}>{subCat.subcategory_name}</MenuItem>)
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <TextField
                sx={{ width: "74%" }}
                label="Product"
                id="fullWidth"
                // onChange={(e) => setProductName(e.target.value)}
                onChange={(e) => handleChange(e)}
                name='productName'
              />
            </Grid>
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <Button
                type="button"
                variant="contained"
                style={{ margin: 9, padding: 8, borderRadius: 4 }}
                onClick={() => handleAddProduct()}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="outlined"
                style={{
                  padding: 8,
                  borderRadius: 4,
                }}
                className="cancel-button"
                onClick={() => setProductBool(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Card>
        )}
        {!productBool && (
          <Grid item sm={12}>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => setProductBool(true)}
            >
              Add New
            </Button>
          </Grid>
        )}

        <Grid item sm={12}>
          {productDataArray?.length > 0 && (
            <ProductTable productData={productDataArray} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
