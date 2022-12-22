import { Link as RouterLink, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, Typography } from "@mui/material";
// components
import Logo from "../components/Logo";
// sections
import { ResetPasswordForm } from "../sections/auth/resetPassword";
import { useToken } from "../Context/token";
import { getData } from "./../functions/apiClient";
import { verifyUser } from "../endpoint";
import BackImgHD from "../trkNdTrcIcons/BackImgHD.png";
// ----------------------------------------------------------------------

export default function Login() {
  const [currentStep, setCurrentStep] = useState("0");
  const [token, setToken] = useToken();
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

  return (
    <div title="ResetPswd" style={{
      backgroundColor: "#F3F3F3",
      backgroundImage: `url(${BackImgHD})`,
      backgroundSize: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right bottom",
      backgroundAttachment: "fixed",
      height: "100vh",
    }}>
      {currentStep === "1" && <Navigate to="/dashboard" />}
      <Logo />
      <div style={{ width: "400px", margin: "80px 0px 0px 100px"}}>
        <Typography variant="h5" gutterBottom>
          Reset Track and Trace Password
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Please enter your details below.
        </Typography>

        <ResetPasswordForm setToken={setToken} />

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          {"Don’t have an account? "}
          <Link variant="subtitle2" component={RouterLink} to="/register" sx={{ fontWeight: 800 }}>
            Get started
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          {" Already have an account? "}
          <Link variant="subtitle2" component={RouterLink} to="/" sx={{ fontWeight: 800 }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}
