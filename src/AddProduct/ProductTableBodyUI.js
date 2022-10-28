import React, { useState, useContext } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductContext } from "../Context/ProductContext";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";

export default function ProductTableBodyUI({
  category,
  subCategory,
  product,
  id,
  prodIdData,
  subCatIdData,
  catIdData,
}) {
  const [productDataArray, setProductDataArray] = useContext(ProductContext);
  const [productInputBool, setProductInputBool] = useState(false);
  const [productText, setProductText] = useState(product);
  const categoryText = category;
  const subCategoryText = subCategory;
  const navigation = useNavigate();
  const handleEditProduct = () => {
    setProductInputBool(true);
  };

  const getProductList = async () => {
    const res = await getRequestLoggedIn("/productList");
    if (res?.status_code === "200") {
      return res.productList.map((obj) => {
        return obj, console.log("obj", obj);
      });
    }
    return null;
  };

  const handleUpdateProduct = async (id) => {
    const data = {
      category_id: catIdData,
      subcategory_id: subCatIdData,
      product_id: id,
      product_name: productText,
      product_image: "",
      product_attributes: [],
    };
    const res = await postRequestLoggedIn("/add_edit_product", data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      const productNameArray =
        resData && resData.productList && resData.productList.map((obj) => obj);
      setProductDataArray(productNameArray);
      setProductInputBool(false);
      window.location.reload();
    }
  };

  const handleDeleteProduct = async (id) => {
    const data = {
      product_id: id,
    };
    const res = await postRequestLoggedIn("/deleteProduct", data);
    if (res?.status_code === "200") {
      const resData = await getProductList();
      const productNameArray =
        resData && resData.productList && resData.productList.map((obj) => obj);
      setProductDataArray(productNameArray);
      window.location.reload();
    }
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">
        <b>{categoryText}</b>
      </TableCell>
      <TableCell align="center">
        <b>{subCategoryText}</b>
      </TableCell>

      <TableCell align="center">
        {productInputBool ? (
          <div>
            <TextField
              label="Enter Product"
              value={productText}
              onChange={(e) => setProductText(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ width: 10, height: 25, marginTop: 14, marginLeft: 3 }}
              onClick={() => handleUpdateProduct(prodIdData)}
            >
              Update
            </Button>
          </div>
        ) : (
          <b>
            {" "}
            <Button
              onClick={() => {
                navigation(`/publishArt?prodId=${prodIdData}`);
              }}
            >
              {productText}
            </Button>
          </b>
        )}
      </TableCell>
      <TableCell align="center">
        <EditIcon onClick={() => handleEditProduct()} />
        <DeleteIcon
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => handleDeleteProduct(prodIdData)}
        />
      </TableCell>
    </TableRow>
  );
}
