import { useState, useEffect } from "react";
import { useToken } from "./token";
import { getData } from "../functions/apiClient";
import { verifyUser } from "../endpoint";

export const useUser = () => {
  const [token] = useToken();
  const getInformationFromToken = async (token) => {
    const res = await getData(verifyUser(token), null, true);
    if (res.status_code === "500") {
      return res.data;
    }
    return null;
  };

  const [user, setUser] = useState(async () => {
    if (!token) {
      return null;
    }
    const res = await getInformationFromToken(token);
    return res;
  });
  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      const getVerification = async () => {
        const res = await getData(verifyUser(token), null, true);
        setUser(res.data);
      };
      getVerification();
    }
  }, [token]);

  return user;
};
