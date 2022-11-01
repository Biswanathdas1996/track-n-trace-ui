import React, { useState, useEffect, createContext } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";

export const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  const [subCategoryDataArray, setSubCategoryDataArray] = useState([]);
  const [productDataArray, setProductDataArray] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn("/categoryList");
      if (res?.status_code === "200") {
        const categoryNameArray = res.categoryList.map((obj) => obj);
        setCategoryDataArray(categoryNameArray);
      } else {
        setCategoryDataArray([]);
      }
    };
    const getProductList = async () => {
      const res = await getRequestLoggedIn("/productList");
      if (res?.status_code === "200") {
        const productArray = res.productList.map((obj) => obj);
        setProductDataArray(productArray);
      } else {
        setProductDataArray([]);
      }
    };
    const getSubCategoryList = async () => {
      const res = await getRequestLoggedIn("/sub_categoryList");
      if (res?.status_code === "200") {
        const subCategoryArray = res.sub_categoryList.map((obj) => obj);
        setSubCategoryDataArray(subCategoryArray);
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
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};
