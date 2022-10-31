import { useState } from "react";
export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem("token");
  });
  const setToken = (newToken) => {
    if (newToken === 0) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", newToken);
      setTokenInternal(newToken);
    }
  };
  return [token, setToken];
};
