import React, { useState, useEffect, createContext } from "react";
import { categoryList, productList, subCategoryList } from "../endpoint";
import { getRequestLoggedIn } from "../functions/apiClient";

export const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  const [subCategoryDataArray, setSubCategoryDataArray] = useState([]);
  const [productDataArray, setProductDataArray] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [subCategoryStatus, setSubCategoryStatus] = useState(false);
  const [productStatus, setProductStatus] = useState(false);

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn(categoryList);
      if (res?.status_code === "200") {
        setCategoryStatus(true);
        setCategoryDataArray(res.categoryList);
      } else {
        setCategoryDataArray([]);
      }
    };
    const getProductList = async () => {
      const res = await getRequestLoggedIn(productList);
      if (res?.status_code === "200") {
        setProductStatus(true);
        setProductDataArray(res.productList);
      } else {
        setProductDataArray([]);
      }
    };
    const getSubCategoryList = async () => {
      const res = await getRequestLoggedIn(subCategoryList);
      if (res?.status_code === "200") {
        setSubCategoryStatus(true);
        setSubCategoryDataArray(res.sub_categoryList);
      } else {
        setSubCategoryDataArray([]);
      }
    };

    getCategoryList();
    getSubCategoryList();
    getProductList();
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        categoryDataArray,
        setCategoryDataArray,
        subCategoryDataArray,
        setSubCategoryDataArray,
        productDataArray,
        setProductDataArray,
        categoryStatus,
        subCategoryStatus,
        productStatus,
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};
