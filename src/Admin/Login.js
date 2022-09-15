import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TransctionModal from "../components/shared/TransctionModal";
import { postData } from "../functions/apiClient";

const Mint = () => {
  const [start, setStart] = useState(false);
  const [bulkNumber, setBulkNumber] = useState(null);

  let history = useNavigate();

  const saveBulkData = async () => {
    history("/dashboard");
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <h4>Login</h4>
                    <Formik
                      initialValues={{
                        bulkNumber: 0,
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        saveBulkData(values);
                        setSubmitting(false);
                      }}
                    >
                      {({ touched, errors, isSubmitting, values }) => (
                        <Form>
                          <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label for="title" className="my-2">
                                  Password{0}
                                  <span className="text-danger">*</span>
                                </label>

                                <Field
                                  type="text"
                                  name="title"
                                  onChange={(e) =>
                                    setBulkNumber(e.target.value)
                                  }
                                  autoComplete="false"
                                  placeholder="Enter Password"
                                  className={`form-control text-muted ${
                                    touched.title && errors.title
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                />
                              </div>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{
                                  marginLeft: 10,
                                  marginTop: 10,
                                  float: "right",
                                }}
                              >
                                <span className="input-group-btn">
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                      marginRight: "20px",
                                      textTransform: "none",
                                    }}
                                  >
                                    Login{" "}
                                  </Button>
                                </span>
                              </div>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Mint;
