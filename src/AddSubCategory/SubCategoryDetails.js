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
import { useSearchParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SubCategoryTable from "./SubCategoryTable";
import { ApplicationContext } from "../Context/ApplicationContext";
import "../Styles/catFormFields.css";
import {
  postRequestLoggedIn,
  getRequestLoggedIn,
} from "../functions/apiClient";

export default function SubCategoryDetails() {
  const [defaultCat, setDefaultCat] = useState();
  const [subCategoryBool, setSubCategoryBool] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState({
    categoryId: "",
    subCategoryName: "",
    subCategoryId: "",
    edit: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryDataArray, subCategoryDataArray, setSubCategoryDataArray } =
    useContext(ApplicationContext);
  useEffect(() => {
    const idParam = searchParams.get("catId");
    const getCatDetail = async () => {
      const res = await getRequestLoggedIn(
        `/categoryDetails?cat_id=${idParam}`
      );

      if ((res.state_code = "200")) {
        setSubCategoryBool(true);
        setDefaultCat(res.data);
        setSearchParams({});
      }
    };
    idParam && getCatDetail();
  }, []);

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn("/sub_categoryList");
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => obj);
    }
    return null;
  };

  const handleChange = (event) => {
    if (event.target.name === "categoryId") {
      setDefaultCat({ ...defaultCat, category_id: "" });
    }
    console.log("event", event);
    let name = event.target.name;
    let val = event.target.value;

    console.log("name", name);
    console.log("val", val);

    setSubCategoryData((prevalue) => {
      console.log("prevalue", prevalue);
      return {
        ...prevalue,
        [name]: val,
      };
    });
  };

  const handleAddSubCategory = async () => {
    setSubCategoryBool(false);
    const data = {
      category_id: defaultCat?.category_id || subCategoryData.categoryId,
      sub_category_id: "",
      sub_category_name: subCategoryData.subCategoryName,
    };
    console.log("dataAdded", data);
    const res = await postRequestLoggedIn("/add_edit_subcategory", data);
    if (res.status_code === "200") {
      const subCategoryArr = await getSubCategoryList();
      setSubCategoryDataArray(subCategoryArr);
      window.location.reload();
    }
  };
  const cancelFun = () => {
    if (subCategoryData.edit) {
      setSubCategoryData({ ...subCategoryData, edit: false });
    } else {
      setSubCategoryBool(false);
    }
  };

  const handleUpdateSubCategory = async () => {
    const data = {
      category_id: subCategoryData.categoryId,
      sub_category_id: subCategoryData.subCategoryId,
      sub_category_name: subCategoryData.subCategoryName,
    };
    const res = await postRequestLoggedIn("/add_edit_subcategory", data);
    if (res?.status_code === "200") {
      const resData = await getSubCategoryList();
      const subCategoryNameArray =
        resData &&
        resData.sub_categoryList &&
        resData.sub_categoryList.map((obj) => obj);
      setSubCategoryDataArray(subCategoryNameArray);
      window.location.reload();
    }
  };
  return (
    <div className="container">
      <Grid container spacing={2}>
        {(subCategoryBool || subCategoryData.edit) && (
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
              onClick={() => setSubCategoryBool(true)}
            >
              Add New
            </Button>
          </Grid>
        )}

        {!subCategoryData.edit && (
          <Grid item sm={12}>
            {subCategoryDataArray?.length > 0 && (
              <SubCategoryTable
                subCategoryData={subCategoryDataArray}
                subCategoryDetails={subCategoryData}
                setSubCategoryDetails={setSubCategoryData}
              />
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
