import React, { useState, createContext } from "react";

export const TokenDetailsContext = createContext();

export const TokenDetailsProvider = (props) => {
  const [tokenDetailsArray, setTokenDetailsArray] = useState([
    "Electronics",
    "Grocery",
    "Appliances",
  ]);
  return (
    <TokenDetailsContext.Provider
      value={[tokenDetailsArray, setTokenDetailsArray]}
    >
      {props.children}
    </TokenDetailsContext.Provider>
  );
};
