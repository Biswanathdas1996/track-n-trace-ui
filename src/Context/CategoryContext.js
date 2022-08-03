import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categoryDataArray, setCategoryDataArray] = useState([]);

  return (
    <CategoryContext.Provider value={[categoryDataArray, setCategoryDataArray]}>
      {props.children}
    </CategoryContext.Provider>
  );
};
