import React, { useState, useEffect, createContext } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categoryDataArray, setCategoryDataArray] = useState([]);
  useEffect(() => {
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn("/categoryList");
      if (res?.status_code === "200") {
        setCategoryDataArray(res.categoryList);
      }
      setCategoryDataArray(null);
    };
    getCategoryList();
  }, []);

  return (
    <CategoryContext.Provider value={[categoryDataArray, setCategoryDataArray]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
