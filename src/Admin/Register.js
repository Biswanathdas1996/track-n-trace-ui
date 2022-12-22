import { Link as RouterLink, Navigate } from "react-router-dom";
import { Link, Typography } from "@mui/material";
// components
import Logo from "../components/Logo";
// sections
import { RegisterForm } from "../sections/auth/register";
import { useToken } from "../Context/token";
import BackImgHD from "../trkNdTrcIcons/BackImgHD.png";
// ----------------------------------------------------------------------

export default function Register() {
  const [token, setToken] = useToken();

  return (
    <div title="Register" style={{
      backgroundColor: "#F3F3F3",
      backgroundImage: `url(${BackImgHD})`,
      backgroundSize: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right bottom",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      height: "auto",
    }}>
      {token && <Navigate to="/dashboard" />}
      <Logo />

      <div style={{ width: "400px", margin: "40px 0px 0px 100px"}}>
        <Typography variant="h5" gutterBottom>
          Register to Track And Trace
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 2 }}>
          Please enter your details below.
        </Typography>

        <RegisterForm setToken={setToken} />

        <Typography variant="body2" align="center" sx={{ color: "text.secondary", mt: 3 }}>
          By registering, I agree to the Track and Trace Terms and
          Conditions
          <Link underline="always" href="#" sx={{ fontWeight: 800 }}>
            <br />
            Terms of Service
          </Link>
          {""} and {""}
          <Link underline="always" href="#" sx={{ fontWeight: 800 }}>
            Privacy Policy
          </Link>
          .
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
          Already have an account?{" "}
          <Link variant="subtitle2" to="/" component={RouterLink} sx={{ fontWeight: 800 }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}
