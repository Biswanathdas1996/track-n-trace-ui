import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useFormik } from "formik";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ErrorModal from "../../../components/shared/ErrorModal";
// components
import Iconify from "../../../components/Iconify";
import States from "../../../_mock/stateZones";
import Roles from "../../../_mock/userRole";
import { postData } from "../../../functions/apiClient";
// ----------------------------------------------------------------------

const registerData = {
  user_fname: "",
  user_lname: "",
  user_email: "",
  user_phoneno: "",
  state_code: "",
  role: "",
  user_password: "",
};

export default function RegisterForm({ setToken }) {
  const [modalView, setModalView] = useState(false);
  const [errorRegister, setErrorRegister] = useState("");
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    user_fname: Yup.string()
      .min(2, "First Name is too short")
      .max(25, "First Name cannot be more than 25 characters")
      .required("First name is required"),
    user_lname: Yup.string()
      .min(2, "Last Name is too short")
      .max(25, "Last Name cannot be more than 25 characters")
      .required("Last name is required"),
    user_email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    user_phoneno: Yup.string()
      .length(10, "Phone Number must be of 10 Digits")
      .required("Phone Number is required"),
    state_code: Yup.string().required("State is required"),
    role: Yup.string().required("Role is required"),
    user_password: Yup.string()
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
    confirmPassword: Yup.string()
      .required("Confirm Password is a required field")
      .oneOf([Yup.ref("user_password"), null], "Passwords must match"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: registerData,
      validationSchema: RegisterSchema,

      onSubmit: async () => {
        const {
          user_fname,
          user_lname,
          user_email,
          user_phoneno,
          state_code,
          role,
          user_password,
        } = values;
        const payLoad = {
          user_fname,
          user_lname,
          user_email,
          user_phoneno,
          state_code,
          role,
          user_password,
        };
        const res = await postData("/registration", payLoad, null, true);
        if (res.status_code === "200") {
          setToken(res.data.user_token);
          navigate("/dashboard");
        } else if (res.status_code === "500") {
          console.log("res", res);
          setModalView(true);
          setErrorRegister(res.message);
        }
      },
    });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  return (
    <div>
      {modalView && (
        <ErrorModal
          open={modalView}
          setOpen={setModalView}
          errorText={errorRegister}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              id="user_fname"
              label="First name"
              fullWidth
              value={values.user_fname}
              name="user_fname"
              autoComplete="off"
              placeholder="First name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.user_fname && touched.user_fname}
              helperText={
                errors.user_fname && touched.user_fname ? errors.user_fname : ""
              }
            />
            <TextField
              id="user_lname"
              label="Last name"
              fullWidth
              value={values.user_lname}
              name="user_lname"
              autoComplete="off"
              placeholder="Last name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.user_lname && touched.user_lname}
              helperText={
                errors.user_lname && touched.user_lname ? errors.user_lname : ""
              }
            />
          </Stack>

          <TextField
            id="user_email"
            label="Email"
            fullWidth
            value={values.user_email}
            type="user_email"
            name="user_email"
            autoComplete="off"
            placeholder="email"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.user_email && touched.user_email}
            helperText={
              errors.user_email && touched.user_email ? errors.user_email : ""
            }
          />
          <TextField
            id="user_phoneno"
            label="Phone Number"
            fullWidth
            value={values.user_phoneno}
            type="number"
            name="user_phoneno"
            autoComplete="off"
            placeholder="Phone Number"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.user_phoneno && touched.user_phoneno}
            helperText={
              errors.user_phoneno && touched.user_phoneno
                ? errors.user_phoneno
                : ""
            }
          />
          <TextField
            id="state_code"
            select
            label="State/UT"
            fullWidth
            value={values.state_code}
            name="state_code"
            autoComplete="off"
            placeholder="State/UT"
            onChange={handleChange}
            // zone needs to be handled from the API
            onBlur={handleBlur}
            error={!!errors.state_code && touched.state_code}
            helperText={
              errors.state_code && touched.state_code ? errors.state_code : ""
            }
          >
            {States.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.stateName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="role"
            select
            label="User role"
            fullWidth
            value={values.role}
            name="role"
            autoComplete="off"
            placeholder="User role"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.role && touched.role}
            helperText={errors.role && touched.role ? errors.role : ""}
          >
            {Roles.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.roleName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="user_password"
            label="Enter Password"
            fullWidth
            value={values.user_password}
            name="user_password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.user_password && touched.user_password}
            helperText={
              errors.user_password && touched.user_password
                ? errors.user_password
                : ""
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
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            fullWidth
            value={values.confirmPassword}
            name="confirmPassword"
            autoComplete="off"
            placeholder="Confirm Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.confirmPassword && touched.confirmPassword}
            helperText={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : ""
            }
            type={showConfPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfPassword(!showConfPassword)}
                  >
                    <Iconify
                      icon={
                        showConfPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            style={{ padding: "14px 22px" }}
          >
            Register
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
