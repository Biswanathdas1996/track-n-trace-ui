/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";

import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
import { postRequestLoggedIn } from "../functions/apiClient";
import { addTransaction } from "../endpoint";
import swal from "sweetalert";

const AddTracking = () => {
  const { token } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLocation(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
  }

  const saveData = async ({ status }) => {
    // setSubmitting(true);
    const metaData = {
      tokenId: token,
      location: location,
      message: status,
    };
    console.log('metaData',metaData);
    const res = await postRequestLoggedIn(addTransaction, metaData);
    if (res.status_code === "200") {
      setSubmitting(true);
      swal("Success !", "Data successfully added", "success");
    } else {
      // swal({ icon: "warning", dangerMode: true, text: res.message });
      swal({ icon: "warning", dangerMode: true, text: "Transaction Failed! Please Try Again." });
    }
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {!submitting ? (
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
                      <h4> #Token {token}</h4>

                      <small> Add transction data</small>
                      <Formik
                        initialValues={{
                          location: location,
                          status: "",
                        }}
                        // validationSchema={VendorSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          saveData(values);
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
                                    Status{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="status"
                                    component="select"
                                    className={`form-control text-muted ${
                                      touched.status && errors.status
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: 9 }}
                                  >
                                    <option>-- Please select --</option>

                                    <option value="Order Placed">
                                      Order Placed
                                    </option>
                                    <option value="Order Picked up">
                                      Order Picked up
                                    </option>
                                    <option value="Order In Transit">
                                      Order In Transit
                                    </option>
                                    <option value="Order Out for delivery">
                                      Order Out for delivery
                                    </option>
                                    <option value="Order delivered">
                                      Order delivered
                                    </option>
                                  </Field>
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 10 }}
                                >
                                  <label for="title" className="my-2">
                                    Place <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    type="text"
                                    name="location"
                                    autoComplete="flase"
                                    placeholder="Enter Location"
                                    className={`form-control text-muted ${
                                      touched.location && errors.location
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    value={location}
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
                                        marginTop: "20px",
                                        textTransform: "none",
                                      }}
                                    >
                                      Add{" "}
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
          ) : (
            <div style={{ margin: 20 }}>
              <Card>
                <Grid container>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    style={{ padding: 20, marginTop: 30 }}
                  >
                    <b>Response recorded</b>
                  </Grid>
                </Grid>
              </Card>
            </div>
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default AddTracking;
