import React, { useState, useContext } from "react";
import { Button, Card, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import CategoryTable from "./CategoryTable";
import "../Styles/catFormFields.css";
import { CategoryContext } from "../Context/CategoryContext";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";

export default function CategoryDetails() {
  const [categoryBool, setCategoryBool] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const getCategoryList = async () => {
    const res = await getRequestLoggedIn("/categoryList");
    if (res?.status_code === "200") {
      return res.categoryList.map((obj) => obj);
    }
    return null;
  };

  const handleAddCategory = async () => {
    setCategoryBool(false);
    const data = {
      category_name: categoryName,
      category_id: "",
    };
    const res = await postRequestLoggedIn("/add_edit_category", data);
    if (res.status_code === "200") {
      const categoryArr = await getCategoryList();
      setCategoryDataArray(categoryArr);
      window.location.reload();
    }
  };
  return (
    <div className="container">
      <Grid container spacing={2}>
        {categoryBool && (
          <Card
            sx={{
              boxShadow: 0,
              height: "100px",
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
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button
                type="button"
                variant="contained"
                style={{ margin: 9, padding: 8, borderRadius: 4 }}
                onClick={() => handleAddCategory()}
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
                onClick={() => setCategoryBool(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Card>
        )}
        {!categoryBool && (
          <Grid item sm={12}>
            <Button
              type="button"
              variant="contained"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
              onClick={() => setCategoryBool(true)}
            >
              Add New
            </Button>
          </Grid>
        )}

        <Grid item sm={12}>
          {categoryDataArray?.length > 0 && (
            <CategoryTable categoryData={categoryDataArray} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
