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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import "./product.css";

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
  const [selectedFilter, setSelectedFilter] = useState(false);
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
        setDefaultSubCat(res.data);
        setCategoryFilter(res.data.category_name);
        setSubCategoryFilter(res.data.subcategory_name);
        setSelectedFilter(true);
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
    setProductBool(true);
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

  const handleChangeCatFilter = (event) => {
    let nameEvent = event.target.name;
    let valEvent = event.target.value;
    let filterCat = categoryDataArray.find((cat) => cat.category_name === valEvent);
    let filterCatId = filterCat.category_id;
    setCategoryFilter(valEvent);
    if (nameEvent === "categoryFilter") {
      getSubCategoryList(filterCatId);
    }
  }

  const handleChange = async (event) => {
    let nameEvent = event.target.name;
    let valEvent = event.target.value;
    if (nameEvent === "categoryId") {
      setDefaultSubCat({ ...defaultSubCat, category_id: "" });
      setDefault(false);
      getSubCategoryList(valEvent);
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
      console.log('getSubCategoryList res',res); //==================review: check for the conditional dropdown
      setSubCategoryDataArray(res.sub_categoryList);
    }
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
    !selectedFilter && setFilterState(false);
    !selectedFilter && setCategoryFilter("");
    !selectedFilter && setSubCategoryFilter("");
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
    <span className="input-group-btn">
      <Button type="button" variant="outlined" 
        sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }} 
        style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
        onClick={() => setFilterState(true)} 
      >
        FILTERS
      </Button>
    </span>
  );
  return (
    <div className="container prodContainer">
      <Grid container spacing={2}>
        {(productBool || isEditForm) && (
          <Dialog open={productBool || isEditForm} onClose={cancelFun}>
            <DialogTitle
              sx={{ paddingBottom: "0px", fontWeight: 800}}
            >Add New Product</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ color: "#000000"}}
              >
                Please enter the details below to create a Product
              </DialogContentText>
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please select a Category from available options below
              </DialogContentText>
              <FormControl sx={{ width: "100%",
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  id="fullWidth"
                  onChange={(e) => handleChange(e)}
                  value={defaultSubCat?.category_id || productData?.categoryId}
                  name="categoryId"
                >
                  {categoryDataArray && categoryDataArray.map((cat) => (
                    <MenuItem key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please select a Sub-Category from available options below
              </DialogContentText>
              <FormControl sx={{ width: "100%",
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                >
                <InputLabel>Sub-Category</InputLabel>
                <Select
                  label="Sub Category"
                  id="fullWidth"
                  onChange={(e) => handleChange(e)}
                  value={(isDefault && defaultSubCat?.sub_category_id) || productData?.sub_category_id}
                  name="sub_category_id"
                >
                  {subCategoryDataArr && subCategoryDataArr.map((subCat) => (
                    <MenuItem
                      key={subCat.sub_category_id}
                      value={subCat.sub_category_id}
                    >
                      {subCat.subcategory_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please enter Product Name
              </DialogContentText>
              <TextField
                sx={{ 
                  width: "100%",
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                }}
                label="Product"
                id="fullWidth"
                value={productData?.productName}
                required
                name="productName"
                onChange={(e) => handleChange(e)}
              />
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please upload a Product Image
              </DialogContentText>
              <TextField
                type="file"
                id="fullWidth"
                required
                onChange={(e) => changeHandler(e)}
                name="fileUpload"
                sx={{
                  width: "100%",
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px 12px 14px"},
                  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                }}
              />
            </DialogContent>
            <DialogActions>
            <Button
              type="button"
              variant="outlined"
              style={{
                padding: "2px 16px",
                borderRadius: 4,
              }}
              className="cancel-button"
              onClick={cancelFun}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              style={{ margin: 10, padding: "3px 16px", borderRadius: 4 }}
              onClick={productData.edit ? editProd : () => handleAddProduct()}
            >
              Submit
            </Button>
            </DialogActions>
          </Dialog>
        )}
        {(productDataArray.length>0) && !(productBool || productData.edit) && (
          <Grid item sm={12}>
            <span className="input-group-btn">
              <Button type="button" variant="outlined" 
                sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }} 
                style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
                onClick={addNewHandler} 
              >
                ADD NEW
              </Button>
            </span>
            {filterState ? (
              <Grid container>
                {!selectedFilter && (
                  <Grid
                    item
                    sm={3}
                    style={{ paddingLeft: "17px", marginLeft: "14px", }}
                  >
                    <FormControl sx={{ width: "100%",
                      ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                      ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                      ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                    >
                      <InputLabel>Category Filter</InputLabel>
                      <Select
                        label="Choose the Category"
                        id="fullWidth"
                        onChange={(e) => {
                          handleChangeCatFilter(e);
                        }}
                        // onChange={(e) => {
                        //   setCategoryFilter(e.target.value);
                        // }}
                        name="categoryFilter"
                        value={categoryFilter}
                      >
                        {categoryDataArray &&
                          categoryDataArray.map((cat) => (
                            <MenuItem
                              key={cat.category_id}
                              value={cat.category_name}
                            >
                              {cat.category_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {!selectedFilter && (
                  <Grid
                    item
                    sm={3}
                    style={{ paddingLeft: "17px" }}
                  >
                    <FormControl sx={{ width: "100%",
                      ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                      ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                      ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                    >
                      <InputLabel>Sub-Category Filter</InputLabel>

                      <Select
                        label="Choose the Sub Category"
                        id="fullWidth"
                        onChange={(e) => setSubCategoryFilter(e.target.value)}
                        name="subCategoryFilter"
                        value={subCategoryFilter}
                      >
                        {categoryFilter === "" && subCategoryDataArray &&
                          subCategoryDataArray.map((subCat) => (
                            <MenuItem
                              key={subCat.sub_category_id}
                              value={subCat.subcategory_name}
                            >
                              {subCat.subcategory_name}
                            </MenuItem>
                          ))}
                          {categoryFilter !== "" && subCategoryDataArr &&
                            subCategoryDataArr.map((subCat) => (
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
                )}
                <Grid
                  item
                  sm={3}
                  style={{ paddingLeft: "17px" }}
                >
                  <TextField
                    sx={{ width: "100%",
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                      ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                      ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"} 
                    }}
                    label="Product Filter"
                    id="fullWidth"
                    // onChange={(e) => setProductName(e.target.value)}
                    onChange={(e) => setProductFilter(e.target.value)}
                    name="productFilter"
                    value={productFilter}
                  />
                </Grid>
                <Grid style={{ paddingLeft: "17px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setFilterState(false);
                      !selectedFilter && setCategoryFilter("");
                      !selectedFilter && setSubCategoryFilter("");
                      setProductFilter("");
                    }}
                    sx={{ lineHeight: 1.5, borderRadius: "8px" }}
                  >
                    Remove Filter
                  </Button>
                </Grid>
              </Grid>
            ) : (
              applyFilter
            )}
          </Grid>
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
                selectedFilter={selectedFilter}
                setProductBool={setProductBool}
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
                    No Products added !!!!
                  </Typography>
                  <Typography variant="h5">
                    Please click on Add New to add your products
                  </Typography>
                  <span className="input-group-btn">
                    <Button type="button" variant="outlined" 
                      sx={{ marginRight: "20px", marginTop: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }}
                      style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
                      onClick={addNewHandler} 
                    >
                      ADD NEW
                    </Button>
                  </span>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
