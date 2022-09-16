/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";

import Button from "@mui/material/Button";

import { useParams } from "react-router-dom";
import { postData } from "../functions/apiClient";
import swal from "sweetalert";

// const VendorSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   authorname: Yup.string().required("Authorname is required"),
//   price: Yup.string().required("Price is required"),
//   royelty: Yup.string().required("Royelty amount is required"),
// });

const Mint = () => {
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

  const saveData = async ({ title, category, attributes }) => {
    setSubmitting(true);
    const metaData = {
      place: title,
      status: category,
      date: "2022-08-02T13:19:34.122Z",
    };

    await postData(`/add-to-token?id=${token}`, metaData);
    swal("Success !", "Data successfully add", "success");
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
                          title: location,
                          category: "",
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
                                    name="category"
                                    component="select"
                                    className={`form-control text-muted ${
                                      touched.category && errors.category
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
                                    name="title"
                                    autoComplete="flase"
                                    placeholder="Enter title"
                                    className={`form-control text-muted ${
                                      touched.title && errors.title
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
export default Mint;
