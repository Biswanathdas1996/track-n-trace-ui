import { Link as RouterLink, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/Logo";
// sections
import { LoginForm } from "../sections/auth/login";
import { useToken } from "../Context/token";
import { getData } from "./../functions/apiClient";
import { verifyUser } from "../endpoint";
import BackImg from "../trkNdTrcIcons/BackImg.png";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");
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
    <div title="Login" style={{
      backgroundColor: "#F3F3F3",
      backgroundImage: `url(${BackImg})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "48vw",
      backgroundPositionY: "1vh",
      backgroundAttachment: "fixed",
    }}>
      <RootStyle>
        {currentStep === "1" && <Navigate to="/dashboard" />}
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome to Track and Trace
            </Typography>
            <img
              src="/static/illustrations/illustration_login.jpg"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to Track and Trace
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Please enter your details below.
            </Typography>

            <LoginForm setToken={setToken} />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
}
