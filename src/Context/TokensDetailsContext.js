import React, { useState, createContext, useEffect } from "react";
import { getAuthData } from "../functions/apiClient";

export const TokenDetailsContext = createContext();

export const TokenDetailsProvider = (props) => {
  const [tokenDetailsArray, setTokenDetailsArray] = useState([]);
  useEffect(() => {
    async function fetchAllPosts() {
      const data = await getAuthData(`/get-all-token`);
      setTokenDetailsArray(data);
    }
    fetchAllPosts();
  }, []);

  return (
    <TokenDetailsContext.Provider
      value={[tokenDetailsArray, setTokenDetailsArray]}
    >
      {props.children}
    </TokenDetailsContext.Provider>
  );
};
