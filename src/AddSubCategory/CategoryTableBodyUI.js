import React, { useState, useContext } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryContext } from "../Context/CategoryContext";

export default function CategoryTableBodyUI({ category, id }) {
  const [categoryDataArray, setCategoryDataArray] = useContext(CategoryContext);
  const [categoryInputBool, setCategoryInputBool] = useState(false);
  const [cateoryText, setCategoryText] = useState(category);

  const handleEditCategory = () => {
    setCategoryInputBool(true);
  };

  const handleUpdateCategory = (id) => {
    let categoryArr = categoryDataArray;
    categoryArr[id - 1] = cateoryText;
    setCategoryDataArray(categoryArr);
    setCategoryInputBool(false);
  };

  const handleDeleteCategory = (id) => {
    let categoryName = categoryDataArray[id - 1];
    console.log("--->", categoryName, "-->", categoryDataArray);
    let categoryArr = categoryDataArray?.filter(
      (element) => element !== categoryName
    );
    console.log("after--->", categoryArr);

    setCategoryDataArray(categoryArr);
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
              onClick={() => handleUpdateCategory(id)}
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
          onClick={() => handleDeleteCategory(id)}
        />
      </TableCell>
    </TableRow>
  );
}
