import React, { useState, useEffect, createContext } from "react";
import { getRequestLoggedIn } from "../functions/apiClient";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const getProductList = async () => {
      const res = await getRequestLoggedIn("/productList");
      if (res?.status_code === "200") {
        const productArray = res.productList.map((obj) => obj);
        setProductData(productArray);
      } else {
        setProductData([]);
      }
    };
    getProductList();
  }, []);

  return (
    <ProductContext.Provider value={[productData, setProductData]}>
      {props.children}
    </ProductContext.Provider>
  );
};
