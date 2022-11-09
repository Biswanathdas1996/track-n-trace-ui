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
  const applySubCatFilter = !subCategoryBool &&
    subCategoryDataArray.length > 0 && (
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
    <div className="container">
      <Grid container spacing={2}>
        {(subCategoryBool || subCategoryData.edit) && (
          <Card
            sx={{
              boxShadow: 0,
              height: "310px",
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
            </Grid>
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <TextField
                sx={{ width: "74%" }}
                label="Sub Category"
                id="fullWidth"
                // onChange={(e) => setSubCategoryName(e.target.value)}
                onChange={(e) => handleChange(e)}
                name="subCategoryName"
                value={subCategoryData?.subCategoryName}
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
                onClick={
                  subCategoryData?.edit
                    ? handleUpdateSubCategory
                    : () => handleAddSubCategory()
                }
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
        {!(subCategoryBool || subCategoryData.edit) && (
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
            {!selectedFilter && (
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
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <TextField
                sx={{ width: "100%" }}
                label="Sub Category Filter"
                id="fullWidth"
                // onChange={(e) => setProductName(e.target.value)}
                onChange={(e) => setSubCategoryFilter(e.target.value)}
                name="subCategoryFilter"
                value={subCategoryFilter}
              />
            </Grid>
            <Grid style={{ marginTop: "18px", paddingLeft: "17px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setFilterState(false);
                  !selectedFilter && setCategoryFilter("");
                  setSubCategoryFilter("");
                }}
                sx={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                Remove Filter
              </Button>
            </Grid>
          </Grid>
        ) : (
          applySubCatFilter
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
                    No Sub Categories added!!!!
                  </Typography>
                  <Typography variant="h5">
                    Please click on Add New to add your sub categories
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
