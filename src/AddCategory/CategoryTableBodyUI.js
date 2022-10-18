import React, { useState, useContext } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryContext } from "../Context/CategoryContext";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";

export default function CategoryTableBodyUI({ category, id, idData }) {
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const [categoryInputBool, setCategoryInputBool] = useState(false);
  const [cateoryText, setCategoryText] = useState(category);
  console.log("aaa", categoryDataArray);

  const handleEditCategory = () => {
    setCategoryInputBool(true);
  };

  const getCategoryList = async () => {
    const res = await getRequestLoggedIn("/categoryList");
    if (res?.status_code === "200") {
      return res.categoryList.map((obj) => {
        return obj.category_name;
      });
    }
    return null;
  };

  const handleUpdateCategory = async (id) => {
    const data = {
      category_name: cateoryText,
      category_id: id,
    };
    const res = await postRequestLoggedIn("/add_edit_category", data);
    if (res?.status_code === "200") {
      const resdata = await getCategoryList();
      setCategoryDataArray(resdata);
      let categoryArr = categoryDataArray;
      categoryArr[id - 1] = cateoryText;
      setCategoryDataArray(categoryArr);
      setCategoryInputBool(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    const data = {
      category_id: id,
    };
    const res = await postRequestLoggedIn("/deleteCategory", data);
    if (res?.status_code === "200") {
      const resData = await getCategoryList();
      setCategoryDataArray(resData);
      let categoryName = categoryDataArray[id - 1];
      let categoryArr = categoryDataArray?.filter(
        (element) => element !== categoryName
      );
      setCategoryDataArray(categoryArr);
    }
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align="center">{id}</TableCell>

      <TableCell align="center">
        {categoryInputBool ? (
          <div>
            <TextField
              label="Enter Category"
              value={cateoryText}
              onChange={(e) => setCategoryText(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ width: 10, height: 25, marginTop: 14, marginLeft: 3 }}
              onClick={() => handleUpdateCategory(idData)}
            >
              Update
            </Button>
          </div>
        ) : (
          <b>{cateoryText}</b>
        )}
      </TableCell>
      <TableCell align="center">
        <EditIcon onClick={() => handleEditCategory()} />
        <DeleteIcon
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => handleDeleteCategory(idData)}
        />
      </TableCell>
    </TableRow>
  );
}
