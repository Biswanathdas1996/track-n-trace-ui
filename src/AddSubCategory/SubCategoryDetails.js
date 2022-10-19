import React, { useState, useContext } from "react";
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubCategoryTable from "./SubCategoryTable";
import { SubCategoryContext } from "../Context/SubCategoryContext";
import { CategoryContext } from "../Context/CategoryContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";

export default function SubCategoryDetails() {
  const [subCategoryBool, setSubCategoryBool] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    categoryId: "",
    subCategoryName: "",
  });
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const [subCategoryDataArray, setSubCategoryDataArray] = useContext(SubCategoryContext);
  console.log('categoryDataArray',categoryDataArray);
  console.log('subCategoryDataArray',subCategoryDataArray);

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn("/sub_categoryList");
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => obj);
    }
    return null;
  }

  const handleChange = (event) => {
    console.log('event.target', event.target);
    let name = event.target.name;
    let val = event.target.value;

    console.log('name', name);
    console.log('val', val);

    setSubCategoryData ((prevalue) => {
      console.log('prevalue',prevalue);
      return {
        ...prevalue,
        [name] : val,
      }
    })
  }

  const handleAddSubCategory = async () => {
    setSubCategoryBool(false);
    const data = {
      category_id: subCategoryData.categoryId,
      // category_name: subCategoryData.categoryName,
      sub_category_id: "",
      sub_category_name: subCategoryData.subCategoryName,
    }
    console.log('data',data);
    const res = await postRequestLoggedIn("/add_edit_subcategory", data);
    if (res.status_code === "200") {
      const subCategoryArr = await getSubCategoryList();
      setSubCategoryDataArray(subCategoryArr);
      window.location.reload();
    }
  };

  // console.log("------>", setData);

  return (
    <div className="container">
      <Grid container spacing={2}>
        {subCategoryBool && (
          <Card
            sx={{
              boxShadow: 0,
              height: "230px",
              width: "100%",
              backgroundColor: "rgb(241 247 253)",
            }}
          >
            <Grid
              item
              sm={12}
              style={{ marginTop: "18px", paddingLeft: "17px" }}
            >
              {/* <TextField
                sx={{ width: "74%" }}
                label="Category"
                id="fullWidth"
                // onChange={(e) => setCategoryName(e.target.value)}
                onChange={(e) => handleChange(e)}
                name='categoryName'
              /> */}
              <FormControl sx={{ width: "74%" }}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  id="fullWidth"
                  onChange={(e) => handleChange(e)}
                  value={subCategoryData.categoryId}
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
              <TextField
                sx={{ width: "74%" }}
                label="Sub Category"
                id="fullWidth"
                // onChange={(e) => setSubCategoryName(e.target.value)}
                onChange={(e) => handleChange(e)}
                name='subCategoryName'
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
                onClick={() => handleAddSubCategory()}
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
                onClick={() => setSubCategoryBool(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Card>
        )}
        {!subCategoryBool && (
          <Grid item sm={12}>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => setSubCategoryBool(true)}
            >
              Add New
            </Button>
          </Grid>
        )}

        <Grid item sm={12}>
          {subCategoryDataArray?.length > 0 && (
            <SubCategoryTable subCategoryData={subCategoryDataArray} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
