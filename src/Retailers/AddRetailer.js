import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useFormik } from "formik";
// @mui
import { Stack, TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorModal from "../components/shared/ErrorModal";
// components
import States from "../_mock/stateZones";
import { postData } from "../functions/apiClient";
import { registration } from "../endpoint";
// ----------------------------------------------------------------------

const retailerData = {
  user_fname: "",
  user_lname: "",
  user_email: "",
  user_phoneno: "",
  state_code: "",
  role: "3",
  user_password: "",
  pswd_reqd: false,
};

export default function AddRetailer({ retailerBool, setRetailerBool }) {
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
  });

  const handleCancel = () => {
    setRetailerBool(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: retailerData,
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
          pswd_reqd,
        } = values;
        const payLoad = {
          user_fname,
          user_lname,
          user_email,
          user_phoneno,
          state_code,
          role,
          user_password,
          pswd_reqd,
        };
        const res = await postData(registration, payLoad, null, true);
        if (res.status_code === "200") {
          setRetailerBool(false);
          //   window.location.reload();
        } else if (res.status_code === "500") {
          setModalView(true);
          setErrorRegister(res.message);
        }
      },
      onCancel: () => {
        setRetailerBool(false);
      },
    });

  return (
    <div>
      <ErrorModal
        open={modalView}
        setOpen={setModalView}
        errorText={errorRegister}
      />

      <form
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        style={{
          padding: "2%",
          alignItems: "center",
        }}
      >
        <Dialog open={retailerBool} onClose={handleCancel} 
          sx={{ ".css-1t1j96h-MuiPaper-root-MuiDialog-paper" : { maxWidth: "800px", width: "800px" } }}
        >
          <DialogTitle
            sx={{ paddingBottom: "0px", fontWeight: 800}}
          >
            Add New Retailer
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "#000000"}}
            >
              Please enter the details below to add a Retailer
            </DialogContentText>
            <DialogContentText
              sx={{ color: "#C52A1A"}}
            >
              ( All fields are mandatory )
            </DialogContentText>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack sx={{ width: "368px" }}>
                <DialogContentText
                  sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                >
                  Please enter Retailer's First Name
                </DialogContentText>
                <TextField
                  sx={{ 
                    width: "100%",
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                  }}
                  id="user_fname"
                  label="First name"
                  value={values.user_fname}
                  name="user_fname"
                  autoComplete="off"
                  placeholder="First name"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.user_fname && touched.user_fname}
                  helperText={
                    errors.user_fname && touched.user_fname ? errors.user_fname : ""
                  }
                />
                </Stack>
                <Stack sx={{ width: "368px" }}>
                  <DialogContentText
                    sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                  >
                    Please enter Retailer's Last Name
                  </DialogContentText>
                  <TextField
                    sx={{ 
                      width: "100%",
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                      ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                      ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                    }}
                    id="user_lname"
                    label="Last name"
                    value={values.user_lname}
                    name="user_lname"
                    autoComplete="off"
                    placeholder="Last name"
                    required
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.user_lname && touched.user_lname}
                    helperText={
                      errors.user_lname && touched.user_lname ? errors.user_lname : ""
                    }
                  />
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack sx={{ width: "368px" }}>
                <DialogContentText
                  sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                >
                  Please enter Retailer's Email ID
                </DialogContentText>
                <TextField
                  sx={{ 
                    width: "100%",
                    ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                  }}
                  id="user_email"
                  label="Email"
                  value={values.user_email}
                  type="user_email"
                  name="user_email"
                  autoComplete="off"
                  placeholder="email"
                  required
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.user_email && touched.user_email}
                  helperText={
                    errors.user_email && touched.user_email ? errors.user_email : ""
                  }
                />
                </Stack>
                <Stack sx={{ width: "368px" }}>
                  <DialogContentText
                    sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                  >
                    Please enter Retailer's Phone Number
                  </DialogContentText>
                  <TextField
                    sx={{ 
                      width: "100%",
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                      ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                      ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"}
                    }}
                    id="user_phoneno"
                    label="Phone Number"
                    value={values.user_phoneno}
                    type="number"
                    name="user_phoneno"
                    autoComplete="off"
                    placeholder="Phone Number"
                    required
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!errors.user_phoneno && touched.user_phoneno}
                    helperText={
                      errors.user_phoneno && touched.user_phoneno
                        ? errors.user_phoneno
                        : ""
                    }
                  />
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack sx={{ width: "368px" }}>
                <DialogContentText
                  sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                >
                  Please select your State from the dropdown
                </DialogContentText>
                <FormControl sx={{ width: "100%",
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                >
                  <InputLabel>State/UT</InputLabel>
                  <Select
                    label="State/UT"
                    id="state_code"
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
                  </Select>
                </FormControl>
              </Stack>
              <Stack sx={{ width: "368px" }}>
                <DialogContentText
                  sx={{ color: "#000000", marginTop: "5px", marginBottom: "8px"}}
                >
                  User Role is auto-selected below
                </DialogContentText>
                <FormControl sx={{ width: "100%",
                  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                  ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                  ".css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {borderRadius: "8px"} }}
                >
                  <InputLabel>User role</InputLabel>
                  <Select
                    label="User role"
                    id="role"
                    fullWidth
                    value={values.role}
                    name="role"
                    autoComplete="off"
                    placeholder="User role"
                    inputProps={{
                      readOnly: true,
                    }}
                    disabled
                  >
                    <MenuItem key={2} value={2}>
                      {"Retailer"}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
          <Button
            type="cancel"
            variant="outlined"
            style={{
              padding: "2px 16px",
              borderRadius: 4,
            }}
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            style={{ margin: 10, padding: "3px 16px", borderRadius: 4 }}
          >
            Submit
          </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}
