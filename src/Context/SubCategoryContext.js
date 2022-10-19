import React, { useState, useEffect, createContext } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";

export const SubCategoryContext = createContext();

export const SubCategoryProvider = (props) => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  useEffect(() => {
    const getSubCategoryList = async () => {
      const res = await getRequestLoggedIn("/sub_categoryList");
      if (res?.status_code === "200") {
        const subCategoryArray = res.sub_categoryList.map((obj) => obj);
        setSubCategoryData(subCategoryArray);
      } else {
        setSubCategoryData([]);
      }
    };
    getSubCategoryList();
  }, []);

  return (
    <SubCategoryContext.Provider value={[subCategoryData, setSubCategoryData]}>
      {props.children}
    </SubCategoryContext.Provider>
  );
};
