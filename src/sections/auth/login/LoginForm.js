import * as Yup from "yup";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// form
import { useFormik } from "formik";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { postData } from "../../../functions/apiClient";
// components
import Iconify from "../../../components/Iconify";
import { login } from "../../../endpoint";

// ----------------------------------------------------------------------

const loginData = {
  email: "",
  password: "",
  remember: true,
};

export default function LoginForm({ setToken }) {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .max(12, "Password can be maximum of 12 characters")
      .required("Password is required")
      .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
      .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
      .matches(/^(?=.*[0-9])/, "Must contain at least one number")
      .matches(
        /^(?=.*[!@#$%&])/,
        "Must contain at least one special character"
      ),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginData,
      validationSchema: LoginSchema,
      onSubmit: async () => {
        const res = await postData(login, values, null, true);
        if (res.status_code === "200") {
          setToken(res.data.user_token);
          const prevRoute = sessionStorage.getItem("prevRoute") || "/dashboard";
          const addTrack = prevRoute.startsWith("/add-tracking-data");
          console.log('prevRoute',prevRoute);
          console.log('addTrack',addTrack);
          addTrack ? Navigate(prevRoute) : Navigate("/dashboard");
        } else alert("something went wrong");
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          sx={{ 
            width: "100%",
            ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
            ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
            ".css-1x5jdmq": { padding: "6px 14px"},
            ".css-p0rm37": {top: "-8px"},
            ".css-1bp1ao6": {borderRadius: "8px"},
          }}
          id="email"
          label="Email"
          fullWidth
          value={values.email}
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email && touched.email}
          helperText={errors.email && touched.email ? errors.email : ""}
        />

        <TextField
          sx={{ 
            width: "100%",
            ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
            ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
            ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
            ".css-1uvydh2": { padding: "6px 14px"},
            ".css-p0rm37": {top: "-9px"},
            ".css-segi59": {borderRadius: "8px"},
          }}
          id="password"
          label="Enter Password"
          fullWidth
          value={values.password}
          name="password"
          autoComplete="off"
          placeholder="Enter Password"
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.password && touched.password}
          helperText={
            errors.password && touched.password ? errors.password : ""
          }
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked onChange={handleChange} />}
            name="remember"
            label="Remember me"
          />
        </FormGroup>
        <Link variant="subtitle2" component={RouterLink} to="/resetPassword" sx={{ fontWeight: 800 }}>
        Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        style={{ padding: "5px 5px" }}
      >
        Login
      </LoadingButton>
    </form>
  );
}
