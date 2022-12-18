import { Link as RouterLink, Navigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/Logo";
// sections
import { RegisterForm } from "../sections/auth/register";
import { useToken } from "../Context/token";
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

export default function Register() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");
  const [token, setToken] = useToken();

  return (
    <div title="Register" style={{
      backgroundColor: "#F3F3F3",
      backgroundImage: `url(${BackImg})`,
      backgroundSize: "54%",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "48vw",
      backgroundPositionY: "1vh",
      backgroundAttachment: "fixed",
    }}>
      <RootStyle>
        {token && <Navigate to="/dashboard" />}
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography
              variant="body2"
              sx={{ mt: { md: -2 } }}
              alignContent="right"
            >
              Already have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/">
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Tracking and Tracing Products Digitally
            </Typography>
            <img
              alt="register"
              src="/static/illustrations/illustration_register.jpg"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Register to Track And Trace
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Please enter your details below.
            </Typography>

            <RegisterForm setToken={setToken} />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to the Track and Trace Terms and
              Conditions
              <Link underline="always" color="text.primary" href="#">
                <br />
                Terms of Service
              </Link>
              {""} and {""}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account?{" "}
                <Link variant="subtitle2" to="/" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </div>
  );
}
