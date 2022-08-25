import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import { postData } from "../functions/apiClient";

const Mint = () => {
  const [start, setStart] = useState(false);
  // const [product, setProduct] = useState(null);
  // const [category, setCategory] = useState(null);
  // const [subCategory, setSubCategory] = useState(null);
  const [description, setDescription] = useState(null);
  // eslint-disable-next-line
  const [response, setResponse] = useState(null);

  const history = useNavigate();
  // { product, category, subCategory }
  // eslint-disable-next-line
  const saveAddProductData = async ( product, category, subCategory, attributes ) => {
    setStart(true);
    // let responseData;

    const metaData = {
      product,
      category,
      subCategory,
      image: null,
      description,
      attributes: [],
    };

    setResponse(metaData);
    console.log("AddProductData response==>",metaData);
    await postData(`/create`, metaData);
    history("/");
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/");
  };

  return (
    <>
      {start && <TransctionModal modalClose={modalClose} />}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12} />
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
                    <h4>Add Product Data</h4>
                    <Formik
                      initialValues={{
                        product: "",
                        category: "",
                        subCategory: "",
                        attributes: [],
                        description: "",
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        saveAddProductData(values);
                        setSubmitting(false);
                      }}
                    >
                      {/* eslint-disable-next-line */}
                      {({ touched, errors, isSubmitting, values }) => (
                        <Form>
                          <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                {/* eslint-disable-next-line */}
                                <label for="title" className="my-2">
                                  {/* <input type="none"/> */}
                                  Product
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="product"
                                  component="select"
                                  className={`form-control text-muted ${
                                    touched.product && errors.product
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // onChange={(e) =>
                                  //   setProduct(e.target.value)
                                  // }
                                  style={{ marginRight: 10, padding: 9 }}
                                >
                                  <option>-- Please select Product --</option>
                                  <option value="Product A">Product A</option>
                                  <option value="Product B">Product B</option>
                                  <option value="Product C">Product C</option>
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                {/* eslint-disable-next-line */}
                                <label for="title" className="my-2">
                                  {/* <input type="none"/> */}
                                  Category
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
                                  // onChange={(e) =>
                                  //   setCategory(e.target.value)
                                  // }
                                  style={{ marginRight: 10, padding: 9 }}
                                >
                                  <option>-- Please select Category --</option>

                                  <option value="Category A">Category A</option>
                                  <option value="Category B">Category B</option>
                                  <option value="Category C">Category C</option>
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                {/* eslint-disable-next-line */}
                                <label for="title" className="my-2">
                                  {/* <input type="none"/> */}
                                  Sub-Category
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="subCategory"
                                  component="select"
                                  className={`form-control text-muted ${
                                    touched.subCategory && errors.subCategory
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  // onChange={(e) =>
                                  //   setSubCategory(e.target.value)
                                  // }
                                  style={{ marginRight: 10, padding: 9 }}
                                >
                                  <option>-- Please select Sub-Category --</option>

                                  <option value="Sub-Category A">Sub-Category A</option>
                                  <option value="Sub-Category B">Sub-Category B</option>
                                  <option value="Sub-Category C">Sub-Category C</option>
                                </Field>
                              </div>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                {/* eslint-disable-next-line */}
                                <label for="title" className="my-2">
                                  Description{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <TextareaAutosize
                                  aria-label="minimum height"
                                  minRows={3}
                                  name="text"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  placeholder="Please enter some descriptions"
                                  style={{ width: "100%" }}
                                  className={`form-control text-muted ${
                                    touched.text && errors.text
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              </div>
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <FieldArray
                                  name="attributes"
                                  render={(arrayHelpers) => (
                                    <div>
                                      {values.attributes && values.attributes.length > 0 ? (
                                        values.attributes.map((attribut, index) => (
                                            <div
                                              style={{
                                                border: "1px solid #c7c9cc",
                                                borderRadius: 5,
                                                padding: 12,
                                                marginTop: 15,
                                              }}
                                              key={index}
                                            >
                                              <DeleteOutlineIcon
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                                sx={{ color: pink[500] }}
                                                style={{
                                                  marginBottom: 10,
                                                  float: "right",
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <Grid container>
                                                <Grid item lg={5} md={5} sm={12} xs={12} style={{ marginRight: 20 }} >
                                                  <Field
                                                    name={`attributes.${index}.trait_type`}
                                                    autoComplete="false"
                                                    placeholder="Enter Properties name"
                                                    className={`form-control text-muted `}
                                                    style={{
                                                      marginTop: 10,
                                                      padding: 9,
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={12} xs={12} >
                                                  <Field
                                                    name={`attributes.${index}.value`}
                                                    autoComplete="false"
                                                    placeholder="Enter value"
                                                    className={`form-control text-muted`}
                                                    style={{
                                                      marginTop: 10,
                                                      padding: 9,
                                                    }}
                                                  />
                                                </Grid>
                                              </Grid>
                                            </div>
                                          )
                                        )
                                      ) : (
                                        <Button
                                          variant="outlined"
                                          size="medium"
                                          type="button"
                                          onClick={() => arrayHelpers.push("")}
                                        >
                                          {/* show this when user has removed all attributes from the list */}
                                          Add attributes
                                        </Button>
                                      )}
                                      {values.attributes.length !== 0 && (
                                        <Button
                                          variant="outlined"
                                          size="medium"
                                          type="button"
                                          onClick={() => arrayHelpers.insert(values.attributes.length + 1,"" )}
                                          style={{ marginTop: 10, }}
                                        >
                                          + Add
                                        </Button>
                                      )}
                                    </div>
                                  )}
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
                                    Submit{" "}
                                  </Button>
                                  <Button
                                    type="goBack"
                                    variant="contained"
                                    sx={{
                                      marginRight: "20px",
                                      textTransform: "none",
                                    }}
                                    onClick={() => modalClose()}
                                  >
                                    Go Back{" "}
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
        <Grid item lg={3} md={3} sm={12} xs={12} />
      </Grid>
    </>
  );
};
export default Mint;
