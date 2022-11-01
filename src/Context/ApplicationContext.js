import React, { useState, useEffect, createContext } from "react";
import { categoryList, productList, subCategoryList } from "../endpoint";
import { getRequestLoggedIn } from "../functions/apiClient";
import { getAuthData } from "../functions/apiClient";

export const ApplicationContext = createContext();

export const ApplicationProvider = (props) => {
  const [tokenDetailsArray, setTokenDetailsArray] = useState([]);
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  const [subCategoryDataArray, setSubCategoryDataArray] = useState([]);
  const [productDataArray, setProductDataArray] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn(categoryList);
      if (res?.status_code === "200") {
        const categoryNameArray = res.categoryList.map((obj) => obj);
        setCategoryDataArray(categoryNameArray);
      } else {
        setCategoryDataArray([]);
      }
    };
    const getProductList = async () => {
      const res = await getRequestLoggedIn(productList);
      if (res?.status_code === "200") {
        const productArray = res.productList.map((obj) => obj);
        setProductDataArray(productArray);
      } else {
        setProductDataArray([]);
      }
    };
    const getSubCategoryList = async () => {
      const res = await getRequestLoggedIn(subCategoryList);
      if (res?.status_code === "200") {
        const subCategoryArray = res.sub_categoryList.map((obj) => obj);
        setSubCategoryDataArray(subCategoryArray);
      } else {
        setSubCategoryDataArray([]);
      }
    };
    async function fetchAllPosts() {
      const data = await getAuthData(`/get-all-token`);
      setTokenDetailsArray(data);
    }

    fetchAllPosts();
    getCategoryList();
    getSubCategoryList();
    getProductList();
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        tokenDetailsArray,
        setTokenDetailsArray,
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
