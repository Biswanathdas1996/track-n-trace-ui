import React, { useState, useContext } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SubCategoryContext } from "../Context/SubCategoryContext";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";

export default function SubCategoryTableBodyUI({ category, subCategory, id, subCatIdData, catIdData }) {
  const [subCategoryDataArray, setSubCategoryDataArray] = useContext(SubCategoryContext);
  const [subCategoryInputBool, setSubCategoryInputBool] = useState(false);
  const [subCategoryText, setSubCategoryText] = useState(subCategory);
  const categoryText = category;

  console.log('subCategoryDataArray',subCategoryDataArray);
  console.log(category, subCategory, id, subCatIdData, catIdData);

  const handleEditSubCategory = () => {
    setSubCategoryInputBool(true);
  };

  const getSubCategoryList = async () => {
    const res = await getRequestLoggedIn("/sub_categoryList");
    if (res?.status_code === "200") {
      return res.sub_categoryList.map((obj) => {
        return (
          obj,
          console.log('obj',obj)
          );
      });
    }
    return null;
  };

  const handleUpdateSubCategory = async (id) => {
    const data = {
      category_id: catIdData,
      sub_category_id: id,
      sub_category_name: subCategoryText,
    }
    const res = await postRequestLoggedIn("/add_edit_subcategory", data);
    if (res?.status_code === "200") {
      const resData = await getSubCategoryList();
      const subCategoryNameArray =
        resData &&
        resData.sub_categoryList &&
        resData.sub_categoryList.map((obj) => obj);
      setSubCategoryDataArray(subCategoryNameArray);
      setSubCategoryInputBool(false);
      window.location.reload();
    }
  };

  const handleDeleteSubCategory = async (id) => {
    const data = {
      subcategory_id: id,
    }
    console.log('data',data);
    const res = await postRequestLoggedIn("/deleteSubCategory", data);
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
    <TableRow hover tabIndex={-1}>
      <TableCell align="center"><b>{id}</b></TableCell>
      <TableCell align="center"><b>{categoryText}</b></TableCell>

      <TableCell align="center">
        {subCategoryInputBool ? (
          <div>
            <TextField
              label="Enter SubCategory"
              value={subCategoryText}
              onChange={(e) => setSubCategoryText(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ width: 10, height: 25, marginTop: 14, marginLeft: 3 }}
              onClick={() => handleUpdateSubCategory(subCatIdData)}
            >
              Update
            </Button>
          </div>
        ) : (
          <b>{subCategoryText}</b>
        )}
      </TableCell>
      <TableCell align="center">
        <EditIcon onClick={() => handleEditSubCategory()} />
        <DeleteIcon
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => handleDeleteSubCategory(subCatIdData)}
        />
      </TableCell>
    </TableRow>
  );
}
