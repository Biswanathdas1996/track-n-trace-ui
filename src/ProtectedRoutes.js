import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../src/endpoint";
import { ApplicationProvider } from "./Context/ApplicationContext";
import { useToken } from "./Context/token";
import { getData } from "./functions/apiClient";
import TopBar from "./Layout/TopBar";
export const ProtectedRoute = (props) => {
  const [token] = useToken();
  const [currentStep, setCurrentStep] = useState("0");

  useEffect(() => {
    const getVerification = async () => {
      const res = await getData(verifyUser(token), null, true);
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
        <ApplicationProvider>{props.children}</ApplicationProvider>
      </div>
    );
  } else if (currentStep === "2") {
    return <Navigate to="/" />;
  }
};
