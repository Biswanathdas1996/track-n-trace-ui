import React, { useState, useEffect, createContext } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categoryDataArray, setCategoryDataArray] = useState([
    "Electronics",
    "Grocery",
    "Appliances",
  ]);
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn("/categoryList");
      if (res?.status_code === "200") {
        return res.categoryList;
      }
      return null;
    };
    getCategoryList();
  }, []);

  return (
    <CategoryContext.Provider value={[categoryDataArray, setCategoryDataArray]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
