import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { verifyUser } from "../src/endpoint";
import NotFoundPage from "./components/shared/NotFoundComponent";
import { ApplicationProvider } from "./Context/ApplicationContext";
import { useToken } from "./Context/token";
import { getData } from "./functions/apiClient";
import TopBar from "./Layout/TopBar";
import TopBar2 from "./Layout/TopBar2";

export const ProtectedRoute = (props) => {
  const [token] = useToken();
  const [currentStep, setCurrentStep] = useState("0");
  const [role, setRole] = useState("");
  const allowedRoutesForManufacturer = [
    "/",
    "/Register",
    "/dashboard",
    "/distributer",
    "/products",
    "/category",
    "/sub-category",
    "/product",
    "/createWorkflow",
    "/profile",
    "/tokens",
    "/publishArt",
    "/publishBulkArt",
    "/uploadBulkData",
    "/add-tracking-data",
    "/transctions",
    "/add-token-data",
    "/resetPassword",
  ];
  const allowedRoutesForDistributor = [
    "/",
    "/Register",
    "/dashboard",
    "/profile",
    // "/viewAssignedTokens",
    "/add-tracking-data",
    "/transctions",
    "/tokens",
    "/resetPassword",
    "/distributer",
  ];
  useEffect(() => {
    const prevRoute = window.location.pathname;
    window.sessionStorage.setItem("prevRoute", prevRoute);
    const getVerification = async () => {
      const res = await getData(verifyUser(token), null, true);
      if (res.status_code === "200") {
        setRole(res.data.user_role);
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
    const matchManufacturerArray = allowedRoutesForManufacturer.filter(
      (path) => window.location.pathname.startsWith(path) === true
    );
    const matchDistributorArray = allowedRoutesForDistributor.filter(
      (path) => window.location.pathname.startsWith(path) === true
    );

    if (role === "1") {
      if (matchManufacturerArray.length > 1) {
        return (
          <div className="contaier-class">
            <TopBar2 role={role} props={props}/>
            {/* <TopBar role={role} /> */}
            {/* <ApplicationProvider>{props.children}</ApplicationProvider> */}
          </div>
        );
      } else return <NotFoundPage />;
    } else if (role === "2") {
      if (matchDistributorArray.length > 1) {
        return (
          <div>
            <TopBar2 role={role} props={props}/>
            {/* <TopBar role={role} /> */}
            {/* <ApplicationProvider>{props.children}</ApplicationProvider> */}
          </div>
        );
      } else return <NotFoundPage />;
    }
  } else if (currentStep === "2") {
    return <Navigate to="/" />;
  }
};
