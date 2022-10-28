import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ProductTable from "./ProductTable";
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { CategoryContext } from "../Context/CategoryContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";

export default function ProductDetails({ editFormObject }) {
  const [defaultSubCat, setDefaultSubCat] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productBool, setProductBool] = useState(false);
  const [isDefault, setDefault] = useState(true);
  const [subCategoryDataArray, setSubCategoryDataArray] = useState([]);
  const [productData, setProductData] = useState({
    categoryId: "",
    sub_category_id: "",
    product_id: "",
    productName: "",
    edit: false,
  });
  const isEditForm = productData.edit;
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const [productDataArray, setProductDataArray] = useContext(ProductContext);

  useEffect(() => {
    const idParam = searchParams.get("subCatId");
    const getSubCatDetail = async () => {
      const res = await getRequestLoggedIn(
        `/subcategoryDetails?subcat_id=${idParam}`
      );

      if ((res.state_code = "200")) {
        setProductBool(true);
        setDefaultSubCat(res.data);
        setSearchParams({});
      }
    };
    idParam && getSubCatDetail();
  }, []);

  const getProductList = async () => {
    const res = await getRequestLoggedIn("/productList");
    if (res?.status_code === "200") {
      return res.productList.map((obj) => obj);
    }
    return null;
  };
  const editProd = async () => {
    const data = {
      category_id: productData?.categoryId,
      subcategory_id: productData?.sub_category_id,
      product_id: productData?.product_id,
      product_name: productData?.productName,
      product_image: "",
      product_attributes: [],
    };
    const res = await postRequestLoggedIn("/add_edit_product", data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      const productNameArray =
        resData && resData.productList && resData.productList.map((obj) => obj);
      setProductDataArray(productNameArray);
      window.location.reload();
    }
  };

  const handleChange = async (event) => {
    let nameEvent = event.target.name;
    let valEvent = event.target.value;
    if (nameEvent === "categoryId") {
      setDefaultSubCat({ ...defaultSubCat, category_id: "" });
      setDefault(false);
      const subCategoryArr = await getSubCategoryList(valEvent);
      setSubCategoryDataArray(subCategoryArr);
    }
    if (nameEvent === "sub_category_id") {
      setDefault(false);
    }
    setProductData((prevalue) => {
      return {
        ...prevalue,
        [nameEvent]: valEvent,
      };
    });
  };

  const getSubCategoryList = async (val) => {
    const res = await getRequestLoggedIn(`/sub_categoryList?cat_id=${val}`);
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => obj);
    }
    return null;
  };

  const cancelFun = () => {
    if (productData.edit) {
      setProductData({ ...productData, edit: false });
    } else {
      setProductBool(false);
    }
  };

  const handleAddProduct = async () => {
    setProductBool(false);
    const data = {
      category_id: defaultSubCat?.category_id || productData?.categoryId,
      subcategory_id:
        (isDefault && defaultSubCat?.sub_category_id) ||
        productData?.sub_category_id,
      product_id: "",
      product_name: productData?.productName,
      product_image: "",
      product_attributes: [],
    };
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
        {(productBool || isEditForm) && (
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
                  value={defaultSubCat?.category_id || productData?.categoryId}
                  name="categoryId"
                >
                  {categoryDataArray &&
                    categoryDataArray.map((cat) => (
                      <MenuItem key={cat.category_id} value={cat.category_id}>
                        {cat.category_name}
                      </MenuItem>
                    ))}
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
                  value={
                    (isDefault && defaultSubCat?.sub_category_id) ||
                    productData?.sub_category_id
                  }
                  name="sub_category_id"
                >
                  {isDefault && (
                    <MenuItem value={defaultSubCat?.sub_category_id}>
                      {defaultSubCat?.subcategory_name}
                    </MenuItem>
                  )}
                  {subCategoryDataArray.map((subCat) => (
                    <MenuItem
                      key={subCat.sub_category_id}
                      value={subCat.sub_category_id}
                    >
                      {subCat.subcategory_name}
                    </MenuItem>
                  ))}
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
                name="productName"
                value={productData?.productName}
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
                onClick={productData.edit ? editProd : () => handleAddProduct()}
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
                onClick={cancelFun}
              >
                Cancel
              </Button>
            </Grid>
          </Card>
        )}
        {!(productBool || productData.edit) && (
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

        {!isEditForm && (
          <Grid item sm={12}>
            {productDataArray?.length > 0 && (
              <ProductTable
                productData={productDataArray}
                prodDetails={productData}
                setProdDetails={setProductData}
              />
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
