import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import { getAuthDataPost, getRequestLoggedIn } from "../functions/apiClient";

// const validationSchema = Yup.object().shape({
//   batchNumber: Yup.string().required("Batch Number is required"),
//   title: Yup.string().required("Title is required"),
//   description: Yup.string().required("Description is required"),
//   attributes: Yup.string().required("Attributes are required"),
// });

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [cat, setCat] = useState();
  const [subCat, setSubCat] = useState();

  const [catArray, setCatArray] = useState([]);
  const [subCatArray, setSubCatArray] = useState([]);
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    const catDetails = async () => {
      const res = await getCategoryList();
      setCatArray(res);
    };
    catDetails();
  }, []);
  let history = useNavigate();

  const saveData = async ({
    title,
    product,
    attributes,
    batchNumber,
    description,
  }) => {
    setStart(true);
    let responseData;

    const metaData = {
      name: title,
      category: cat,
      subCategory: subCat,
      product: product,
      image: null,
      description: description,
      attributes: attributes,
      batchNumber: batchNumber,
      transction: [],
    };
    await getAuthDataPost(`/create`, metaData);
    history("/dashboard");

    setResponse(responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/dashboard");
  };
  const getCategoryList = async () => {
    const res = await getRequestLoggedIn("/categoryList");
    if (res?.status_code === "200") {
      return res.categoryList.map((obj) => obj);
    }
    return null;
  };

  const getSubCategoryList = async (catId) => {
    const res = await getRequestLoggedIn(`/sub_categoryList?cat_id=${catId}`);
    if (res?.status_code === "200") {
      return (
        res && res.sub_categoryList && res.sub_categoryList.map((obj) => obj)
      );
    }
    return null;
  };

  const getProductList = async (catId, subCatId) => {
    const res = await getRequestLoggedIn(
      `/productList?cat_id=${catId}&subcat_id=${subCatId}`
    );
    if (res?.status_code === "200") {
      return res && res.productList && res.productList.map((obj) => obj);
    }
    return null;
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

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
                    <h4>Create Tokens</h4>
                    <Formik
                      initialValues={{
                        title: "",
                        text: "",
                        category: "",
                        attributes: [],
                      }}
                      // validationSchema={validationSchema}
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
                                <label htmlFor="title" className="my-2">
                                  Category{" "}
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
                                  onChange={async (e) => {
                                    setCat(e.target.value);
                                    const res = await getSubCategoryList(
                                      e.target.value
                                    );
                                    setSubCatArray(res);
                                  }}
                                  value={cat}
                                >
                                  <option>-- Please select --</option>
                                  {catArray &&
                                    catArray.map((item) => (
                                      <option value={item.category_id}>
                                        {item.category_name}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label htmlFor="title" className="my-2">
                                  sub category{" "}
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
                                  style={{ marginRight: 10, padding: 9 }}
                                  onChange={async (e) => {
                                    setSubCat(e.target.value);
                                    const res = await getProductList(
                                      cat,
                                      e.target.value
                                    );
                                    setProductArray(res);
                                  }}
                                  disabled={!cat}
                                  value={subCat}
                                >
                                  <option>-- Please select --</option>
                                  {subCatArray &&
                                    subCatArray.map((item) => (
                                      <option value={item.sub_category_id}>
                                        {item.subcategory_name}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label htmlFor="title" className="my-2">
                                  Product <span className="text-danger">*</span>
                                </label>
                                <Field
                                  name="product"
                                  component="select"
                                  className={`form-control text-muted ${
                                    touched.product && errors.product
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                  disabled={!subCat}
                                >
                                  <option>-- Please select --</option>

                                  {productArray &&
                                    productArray.map((item) => (
                                      <option value={item.productid}>
                                        {item.product_name}
                                      </option>
                                    ))}
                                </Field>
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label htmlFor="title" className="my-2">
                                  Batch Number{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="batchNumber"
                                  autoComplete="false"
                                  placeholder="Enter Batch Number"
                                  className={`form-control text-muted ${
                                    touched.batchNumber && errors.batchNumber
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                />
                                {/* <ErrorMessage name={"batchNumber"} /> */}
                              </div>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label htmlFor="title" className="my-2">
                                  Item Title{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <Field
                                  type="text"
                                  name="title"
                                  autoComplete="false"
                                  placeholder="Enter title"
                                  className={`form-control text-muted ${
                                    touched.title && errors.title
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  style={{ marginRight: 10, padding: 9 }}
                                />
                              </div>
                              {/* <ErrorMessage name={"title"} /> */}
                            </Grid>

                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <div
                                className="form-group"
                                style={{ marginLeft: 10, marginTop: 10 }}
                              >
                                <label htmlFor="description" className="my-2">
                                  Description{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <TextareaAutosize
                                  type="text"
                                  aria-label="minimum height"
                                  minRows={3}
                                  name="description"
                                  placeholder="Please enter some descriptions"
                                  style={{ width: "100%" }}
                                  className={`form-control text-muted ${
                                    touched.description && errors.description
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                                {/* <ErrorMessage name="description" /> */}
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
                                      {values.attributes &&
                                      values.attributes.length > 0 ? (
                                        values.attributes.map(
                                          (attribut, index) => (
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
                                                <Grid
                                                  item
                                                  lg={5}
                                                  md={5}
                                                  sm={12}
                                                  xs={12}
                                                  style={{ marginRight: 20 }}
                                                >
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
                                                <Grid
                                                  item
                                                  lg={6}
                                                  md={6}
                                                  sm={12}
                                                  xs={12}
                                                >
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
                                              {/* <ErrorMessage
                                                name={"attribute"}
                                              /> */}
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
                                          onClick={() =>
                                            arrayHelpers.insert(
                                              values.attributes.length + 1,
                                              ""
                                            )
                                          }
                                          style={{
                                            marginTop: 10,
                                          }}
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
