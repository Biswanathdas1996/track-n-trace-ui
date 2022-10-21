import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CategoryProvider } from "./Context/CategoryContext";
import { ProductProvider } from "./Context/ProductContext";
import { SubCategoryProvider } from "./Context/SubCategoryContext";
import { TokenDetailsProvider } from "./Context/TokensDetailsContext";
import { useToken } from "./Context/token";
import { getData } from "./functions/apiClient";
import TopBar from "./Layout/TopBar";
export const ProtectedRoute = (props) => {
  const [token] = useToken();
  const [currentStep, setCurrentStep] = useState("0");

  useEffect(() => {
    const getVerification = async () => {
      const res = await getData(`/verifyUser?auth_token=${token}`, null, true);
      if (res.status_code === "200") {
        setCurrentStep("1");
      } else {
        setCurrentStep("2");
      }
    };
    getVerification();
  }, []);
  if (currentStep === "0") {
    return null; //show loader
  } else if (currentStep === "1") {
    return (
      <div>
        <TopBar />
        <TokenDetailsProvider>
          <CategoryProvider>
            <SubCategoryProvider>
              <ProductProvider>{props.children}</ProductProvider>
            </SubCategoryProvider>
          </CategoryProvider>
        </TokenDetailsProvider>
      </div>
    );
  } else if (currentStep === "2") {
    return <Navigate to="/" />;
  }
};
