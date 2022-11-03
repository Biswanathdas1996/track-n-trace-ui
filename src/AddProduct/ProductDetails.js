import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Skeleton,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import ProductTable from "./ProductTable";
import { useSearchParams } from "react-router-dom";
import { ApplicationContext } from "../Context/ApplicationContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";
import {
  addEditProduct,
  productList,
  subCategoryDetailsEp,
  subCategoryListForCat,
} from "../endpoint";
import SkeletonComponent from "../Admin/components/SkeletonComponent";

export default function ProductDetails() {
  const [defaultSubCat, setDefaultSubCat] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productBool, setProductBool] = useState(false);
  const [isDefault, setDefault] = useState(true);
  const [base64Image, setBase64Image] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [filterState, setFilterState] = useState(false);
  const [subCategoryDataArr, setSubCategoryDataArray] = useState([]);
  const [productData, setProductData] = useState({
    categoryId: "",
    sub_category_id: "",
    product_id: "",
    productName: "",
    edit: false,
    productImage: "",
  });
  const isEditForm = productData.edit;
  const {
    categoryDataArray,
    subCategoryDataArray,
    productDataArray,
    setProductDataArray,
    productStatus,
  } = useContext(ApplicationContext);
  useEffect(() => {
    const idParam = searchParams.get("subCatId");
    const getSubCatDetail = async () => {
      const res = await getRequestLoggedIn(subCategoryDetailsEp(idParam));

      if ((res.state_code = "200")) {
        setProductBool(true);
        setDefaultSubCat(res.data);
        setSearchParams({});
      }
    };
    idParam && getSubCatDetail();
  }, []);

  const getProductList = async () => {
    const res = await getRequestLoggedIn(productList);
    if (res?.status_code === "200") {
      return res.productList.map((obj) => obj);
    }
    return null;
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
      product_image: base64Image,
      product_attributes: [],
    };
    const res = await postRequestLoggedIn(addEditProduct, data);
    if (res.status_code === "200") {
      const productArr = await getProductList();
      setProductDataArray(productArr);
      //window.location.reload();
    }
  };
  const editProd = async () => {
    const data = {
      category_id: productData?.categoryId,
      subcategory_id: productData?.sub_category_id,
      product_id: productData?.product_id,
      product_name: productData?.productName,
      product_image: base64Image,
      product_attributes: [],
    };
    const res = await postRequestLoggedIn(addEditProduct, data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      setProductDataArray(resData);
      setProductData({ ...productData, edit: false });
      //window.location.reload();
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
    const res = await getRequestLoggedIn(subCategoryListForCat(val));
    if (res?.status_code === "200") {
      return res.sub_categoryList;
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

  const changeHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBase64Image(base64.substring(22));
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const addNewHandler = () => {
    setFilterState(false);
    setCategoryFilter("");
    setSubCategoryFilter("");
    setProductFilter("");
    setProductBool(true);
    setProductData({
      categoryId: "",
      sub_category_id: "",
      product_id: "",
      productName: "",
      edit: false,
      productImage: "",
    });
  };
  const applyFilter = !productBool && productDataArray.length > 0 && (
    <Grid sx={{ paddingLeft: "26px" }}>
      <Button
        variant="contained"
        color="error"
        onClick={() => setFilterState(true)}
        sx={{ padding: "10px" }}
      >
        Apply Filters
      </Button>
    </Grid>
  );
  return (
    <div className="container">
      <Grid container spacing={2}>
        {(productBool || isEditForm) && (
          <Card
            sx={{
              boxShadow: 0,
              height: "400px",
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
                  {subCategoryDataArr.map((subCat) => (
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
              <TextField
                type="file"
                id="fullWidth"
                // onChange={(e) => setProductName(e.target.value)}
                onChange={(e) => changeHandler(e)}
                name="fileUpload"
                sx={{
                  width: "74%",
                }}
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
              onClick={addNewHandler}
            >
              Add New
            </Button>
          </Grid>
        )}
        {filterState ? (
          <Grid container>
            <Grid
              item
              sm={3}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Category Filter</InputLabel>
                <Select
                  label="Choose the Category"
                  id="fullWidth"
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                  }}
                  name="categoryFilter"
                  value={categoryFilter}
                >
                  {categoryDataArray &&
                    categoryDataArray.map((cat) => (
                      <MenuItem key={cat.category_id} value={cat.category_name}>
                        {cat.category_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={3}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Sub Category Filter</InputLabel>

                <Select
                  label="Choose the Sub Category"
                  id="fullWidth"
                  onChange={(e) => setSubCategoryFilter(e.target.value)}
                  name="subCategoryFilter"
                  value={subCategoryFilter}
                >
                  {subCategoryDataArray &&
                    subCategoryDataArray.map((subCat) => (
                      <MenuItem
                        key={subCat.sub_category_id}
                        value={subCat.subcategory_name}
                      >
                        {subCat.subcategory_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sm={3}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <TextField
                sx={{ width: "100%" }}
                label="Product Filter"
                id="fullWidth"
                // onChange={(e) => setProductName(e.target.value)}
                onChange={(e) => setProductFilter(e.target.value)}
                name="productFilter"
                value={productFilter}
              />
            </Grid>
            <Grid style={{ marginTop: "18px", paddingLeft: "17px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setFilterState(false);
                  setCategoryFilter("");
                  setSubCategoryFilter("");
                  setProductFilter("");
                }}
                sx={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                Remove Filter
              </Button>
            </Grid>
          </Grid>
        ) : (
          applyFilter
        )}

        {!isEditForm && (
          <Grid item sm={12}>
            {productDataArray?.length > 0 && (
              <ProductTable
                productData={productDataArray}
                prodDetails={productData}
                setProdDetails={setProductData}
                categoryFilter={categoryFilter}
                subCategoryFilter={subCategoryFilter}
                productFilter={productFilter}
              />
            )}
            {!productStatus ? (
              <SkeletonComponent number={10} />
            ) : (
              productDataArray?.length === 0 &&
              !productBool && (
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "100px",
                  }}
                >
                  <Typography variant="h3" color="error">
                    No Products added!!!!
                  </Typography>
                  <Typography variant="h5">
                    Please click on to add new to add your products
                  </Typography>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
