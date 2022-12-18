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
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SubCategoryTable from "./SubCategoryTable";
import { ApplicationContext } from "../Context/ApplicationContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";
import {
  addEditSubCategory,
  categoryDetailsEp,
  subCategoryList,
} from "../endpoint";
import SkeletonComponent from "../Admin/components/SkeletonComponent";
import "./subCat.css";

export default function SubCategoryDetails() {
  const [defaultCat, setDefaultCat] = useState();
  const [selectedFilter, setSelectedFilter] = useState(false);
  const [subCategoryBool, setSubCategoryBool] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    categoryId: "",
    subCategoryName: "",
    subCategoryId: "",
    edit: false,
    subCategoryImage: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [base64Image, setBase64Image] = useState("");
  const [filterState, setFilterState] = useState(false);
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const {
    categoryDataArray,
    subCategoryDataArray,
    setSubCategoryDataArray,
    subCategoryStatus,
  } = useContext(ApplicationContext);
  useEffect(() => {
    const idParam = searchParams.get("catId");
    const getCatDetail = async () => {
      const res = await getRequestLoggedIn(categoryDetailsEp(idParam));

      if ((res.state_code = "200")) {
        setDefaultCat(res.data);
        setCategoryFilter(res.data.category_name);
        setSearchParams({});
        setSelectedFilter(true);
      }
    };
    idParam && getCatDetail();
  }, []);
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

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn(subCategoryList);
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => obj);
    }
    return null;
  };

  const handleChange = (event) => {
    if (event.target.name === "categoryId") {
      setDefaultCat({ ...defaultCat, category_id: "" });
    }
    let name = event.target.name;
    let val = event.target.value;
    setSubCategoryData((prevalue) => {
      return {
        ...prevalue,
        [name]: val,
      };
    });
  };
  const addNewHandler = () => {
    !selectedFilter && setFilterState(false);
    !selectedFilter && setCategoryFilter("");
    setSubCategoryFilter("");
    setSubCategoryBool(true);
    setSubCategoryData({
      categoryName: "",
      categoryId: "",
      edit: false,
      categoryImage: "",
    });
  };

  const handleAddSubCategory = async () => {
    setSubCategoryBool(false);
    const data = {
      category_id: defaultCat?.category_id || subCategoryData.categoryId,
      sub_category_id: "",
      sub_category_name: subCategoryData.subCategoryName,
      sub_category_image: base64Image,
    };
    const res = await postRequestLoggedIn(addEditSubCategory, data);
    if (res.status_code === "200") {
      const subCategoryArr = await getSubCategoryList();
      setSubCategoryDataArray(subCategoryArr);
      //window.location.reload();
    }
  };
  const cancelFun = () => {
    if (subCategoryData.edit) {
      setSubCategoryData({ ...subCategoryData, edit: false });
    } else {
      setSubCategoryBool(false);
    }
  };
  const applySubCatFilter = !subCategoryBool && subCategoryDataArray.length > 0 && (
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

  const handleUpdateSubCategory = async () => {
    setSubCategoryBool(true);
    const data = {
      category_id: subCategoryData.categoryId,
      sub_category_id: subCategoryData.subCategoryId,
      sub_category_name: subCategoryData.subCategoryName,
      sub_category_image: base64Image,
    };
    const res = await postRequestLoggedIn(addEditSubCategory, data);
    if (res?.status_code === "200") {
      const resData = await getSubCategoryList();
      setSubCategoryDataArray(resData);
      setSubCategoryData({ ...subCategoryData, edit: false });
      //window.location.reload();
    }
  };
  return (
    <div className="container subCatContainer">
      <Grid container spacing={2}>
        {(subCategoryBool || subCategoryData.edit) && (
          <Dialog open={subCategoryBool || subCategoryData.edit} onClose={cancelFun}>
            <DialogTitle
              sx={{ paddingBottom: "0px", fontWeight: 800}}
            >Add New Sub-Category</DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{ color: "#000000"}}
              >
                Please enter the details below to create a Category
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
                  value={defaultCat?.category_id || subCategoryData.categoryId}
                  name="categoryId"
                >
                  {categoryDataArray.map((cat) => (
                    <MenuItem key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please enter Sub-Category Name
              </DialogContentText>
              <TextField
                sx={{ 
                  width: "100%",
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                }}
                label="Sub Category"
                id="fullWidth"
                value={subCategoryData?.subCategoryName}
                required
                name="subCategoryName"
                onChange={(e) => handleChange(e)}
              />
              <DialogContentText
                sx={{ color: "#000000", marginTop: "15px", marginBottom: "8px"}}
              >
                Please upload a Sub-Category Image
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
              onClick={
                subCategoryData?.edit
                  ? handleUpdateSubCategory
                  : () => handleAddSubCategory()
              }
            >
              Submit
            </Button>
            </DialogActions>
          </Dialog>
        )}
        {(subCategoryDataArray.length>0) && !(subCategoryBool || subCategoryData.edit) && (
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
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        name="categoryFilter"
                        value={categoryFilter}
                      >
                        <MenuItem value="">--Please Select--</MenuItem>

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
                    label="Sub-Category Filter"
                    id="fullWidth"
                    // onChange={(e) => setProductName(e.target.value)}
                    onChange={(e) => setSubCategoryFilter(e.target.value)}
                    name="subCategoryFilter"
                    value={subCategoryFilter}
                  />
                </Grid>
                <Grid style={{ paddingLeft: "17px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setFilterState(false);
                      !selectedFilter && setCategoryFilter("");
                      setSubCategoryFilter("");
                    }}
                    sx={{ lineHeight: 1.5, borderRadius: "8px" }}
                  >
                    Remove Filter
                  </Button>
                </Grid>
              </Grid>
            ) : (
              applySubCatFilter
            )}
          </Grid>
        )}
        {!subCategoryData.edit && (
          <Grid item sm={12}>
            {subCategoryDataArray?.length > 0 && (
              <SubCategoryTable
                subCategoryData={subCategoryDataArray}
                subCategoryDetails={subCategoryData}
                setSubCategoryDetails={setSubCategoryData}
                categoryFilter={categoryFilter}
                subCategoryFilter={subCategoryFilter}
                selectedFilter={selectedFilter}
                setSubCategoryBool={setSubCategoryBool}
              />
            )}
            {!subCategoryStatus ? (
              <SkeletonComponent number={10} />
            ) : (
              subCategoryDataArray?.length === 0 &&
              !subCategoryBool && (
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "100px",
                  }}
                >
                  <Typography variant="h3" color="error">
                    No Sub-Categories Added !!!!
                  </Typography>
                  <Typography variant="h5">
                    Please click on Add New to add your sub categories
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
