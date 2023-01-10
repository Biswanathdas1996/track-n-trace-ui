import React, { useState, useContext } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CategoryTable from "./CategoryTable";
import "../Styles/catFormFields.css";
import { ApplicationContext } from "../Context/ApplicationContext";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";
import { addEditCategory, categoryList } from "../endpoint";
import SkeletonComponent from "../Admin/components/SkeletonComponent";
import "./category.css";

export default function CategoryDetails() {
  const [categoryBool, setCategoryBool] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: "",
    categoryId: "",
    edit: false,
    categoryImage: "",
  });

  const { categoryDataArray, setCategoryDataArray, subCategoryStatus } =
    useContext(ApplicationContext);
  const [base64Image, setBase64Image] = useState("");
  const getCategoryList = async () => {
    const res = await getRequestLoggedIn(categoryList);
    if (res?.status_code === "200") {
      return res.categoryList.map((obj) => obj);
    }
    return null;
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

  const handleAddCategory = async () => {
    setCategoryBool(false);
    const data = {
      category_name: categoryDetails.categoryName,
      category_id: "",
      category_image: base64Image,
    };
    const res = await postRequestLoggedIn(addEditCategory, data);
    if (res.status_code === "200") {
      const categoryArr = await getCategoryList();
      setCategoryDataArray(categoryArr);
      //window.location.reload();
    }
  };
  const cancelFun = () => {
    if (categoryDetails.edit) {
      setCategoryDetails({ ...categoryDetails, edit: false });
    } else {
      setCategoryBool(false);
    }
  };

  const handleUpdateCategory = async () => {
    const data = {
      category_name: categoryDetails?.categoryName,
      category_id: categoryDetails?.categoryId,
      category_image: base64Image ? base64Image : "",
    };
    const res = await postRequestLoggedIn(addEditCategory, data);
    if (res?.status_code === "200") {
      const resData = await getCategoryList();
      setCategoryDetails({ ...categoryDetails, edit: false });
      setCategoryDataArray([...resData]);

      //window.location.reload();
    }
  };
  const addNewHandler = () => {
    setFilterState(false);
    setCategoryBool(true);
    setCategoryDetails({
      categoryName: "",
      categoryId: "",
      edit: false,
      categoryImage: "",
    });
  };
  const applyFilter = !categoryBool && categoryDataArray?.length > 0 && (
      <span className="input-group-btn">
        <Button type="button" variant="filled" 
          sx={{ marginRight: "20px", textTransform: "none",
            backgroundColor: "#FFFFFF !important", color: "#C52A1A !important",
            borderColor: "#C52A1A !important", border: "solid !important", borderWidth: "thin !important", 
            "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } 
          }} 
          style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
          onClick={() => setFilterState(true)} 
        >
          FILTERS
        </Button>
      </span>
  );

  return (
    <div className="container">
      <Grid container spacing={2}>
        {(categoryBool || categoryDetails.edit) && (
          <Dialog open={categoryBool || categoryDetails.edit} onClose={cancelFun}>
            <DialogTitle
              sx={{ paddingBottom: "0px", fontWeight: 800}}
            >Add New Category</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ color: "#000000"}}
              >
                Please enter the details below to create a Category
              </DialogContentText>
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please enter Category Name
              </DialogContentText>
              <TextField
                sx={{ 
                  width: "100%",
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
                  ".css-1x5jdmq": { padding: "6px 14px"},
                  ".css-p0rm37": {top: "-8px"},
                  ".css-1bp1ao6": {borderRadius: "8px"},
                }}
                label="Category"
                id="fullWidth"
                value={categoryDetails?.categoryName}
                required
                name="categoryName"
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    categoryName: e.target.value,
                  })
                }
              />
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please upload a Category Image
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
                  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
                  ".css-1x5jdmq": { padding: "6px 14px 12px 14px"},
                  ".css-1v4ccyo": {borderRadius: "8px"},
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
              onClick={
                categoryDetails.edit
                  ? handleUpdateCategory
                  : handleAddCategory
              }
            >
              Submit
            </Button>
            </DialogActions>
          </Dialog>
        )}
        {(categoryDataArray.length>0) && !(categoryBool || categoryDetails.edit) && (
          <Grid item sm={12} sx={{ marginRight: "55px", paddingTop: "0px !important"}}>
            <span className="input-group-btn">
              <Button type="button" variant="filled" 
                sx={{ marginRight: "20px", textTransform: "none",
                  backgroundColor: "#FFFFFF !important", color: "#C52A1A !important",
                  borderColor: "#C52A1A !important", border: "solid !important", borderWidth: "thin !important", 
                  "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" }
                }} 
                style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
                onClick={addNewHandler} 
              >
                ADD NEW
              </Button>
            </span>
            {filterState ? (
              <Grid container>
                <Grid
                  item
                  sm={3}
                  style={{ paddingLeft: "12px" }}
                >
                  <TextField
                    sx={{ width: "100%",
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
                    ".css-1x5jdmq": { padding: "6px 14px"},
                    ".css-p0rm37": {top: "-8px"},
                    ".css-1v4ccyo": {borderRadius: "8px"},
                    }}
                    label="Category Filter"
                    id="fullWidth"
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                    }}
                    name="categoryFilter"
                    value={categoryFilter}
                  />
                </Grid>
                <Grid style={{ paddingLeft: "17px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setFilterState(false);
                      setCategoryFilter("");
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

        {!categoryDetails.edit && (
          <Grid item sm={12}>
            {categoryDataArray?.length > 0 && (
              <CategoryTable
                categoryData={categoryDataArray}
                categoryDetails={categoryDetails}
                setCategoryDetails={setCategoryDetails}
                categoryFilter={categoryFilter}
              />
            )}
            {!subCategoryStatus ? (
              <SkeletonComponent number={10} />
            ) : (
              categoryDataArray?.length === 0 &&
              !categoryBool && (
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "100px",
                  }}
                >
                  <Grid>
                    <Typography variant="h3" color="error">
                      No Categories Added !!!!
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5">
                      Please click on Add New to add your categories
                    </Typography>
                  </Grid>
                  <span className="input-group-btn">
                    <Button type="button" variant="filled" 
                      sx={{ marginRight: "20px", marginTop: "20px", textTransform: "none",
                        backgroundColor: "#FFFFFF !important", color: "#C52A1A !important",
                        borderColor: "#C52A1A !important", border: "solid !important", borderWidth: "thin !important", 
                        "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" }
                      }} 
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
