import React, { useState, useContext } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CategoryTable from "./CategoryTable";
import "../Styles/catFormFields.css";
import { ApplicationContext } from "../Context/ApplicationContext";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";
import { addEditCategory, categoryList } from "../endpoint";
import SkeletonComponent from "../Admin/components/SkeletonComponent";

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
        {(categoryBool || categoryDetails.edit) && (
          <Card
            sx={{
              boxShadow: 0,
              width: "100%",
              backgroundColor: "rgb(241 247 253)",
            }}
          >
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              <TextField
                sx={{ width: "74%" }}
                label="Category"
                id="fullWidth"
                value={categoryDetails?.categoryName}
                onChange={(e) =>
                  setCategoryDetails({
                    ...categoryDetails,
                    categoryName: e.target.value,
                  })
                }
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
                  categoryDetails.edit
                    ? handleUpdateCategory
                    : handleAddCategory
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
        {!(categoryBool || categoryDetails.edit) && (
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
              <TextField
                sx={{ width: "100%" }}
                label="Category Filter"
                id="fullWidth"
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                }}
                name="categoryFilter"
                value={categoryFilter}
              />
            </Grid>
            <Grid style={{ marginTop: "18px", paddingLeft: "17px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setFilterState(false);
                  setCategoryFilter("");
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
                      No Categories added!!!!
                    </Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h5">
                      Please click on to add new to add your categories
                    </Typography>
                  </Grid>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
