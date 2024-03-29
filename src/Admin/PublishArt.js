import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";
import TextError from "./components/ErrorComponent";
import {
  categoryList,
  createToken,
  addTokenData,
  productDetailForSubCat,
  productDetails,
  subCategoryListForCat,
} from "../endpoint";
import "./publishArt.css";

const validationSchema = Yup.object().shape({
  batchNumber: Yup.string()
    .required("Batch Number is required")
    .min(7, "Batch Number should be of 7 characters")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number"),
  title: Yup.string().required("Title is required").max(50, "Title can be maximum of 50 characters"),
  description: Yup.string().required("Description is required"),
  attributes: Yup.array().required("Attributes are required"),
  warranty: Yup.array().of(
    Yup.object().shape({
      trait_type: Yup.string().min(4, "Warranty Type should be of 4 characters at least"),
      value: Yup.number().min(0, "Minimum duration cannot be negative"),
    })
  ),
});

const Mint = ({ token }) => {
  // console.log('token',token);
  const [start, setStart] = useState(false);
  const [responseState, setResponseState] = useState(null);
  const [cat, setCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [product, setProduct] = useState("");
  const [defaultProd, setDefaultProd] = useState("");
  const [searchParams, setSearchParams] = useSearchParams("");
  const [catArray, setCatArray] = useState([]);
  const [subCatArray, setSubCatArray] = useState([]);
  const [productArray, setProductArray] = useState([]);
  // console.log('start,responseState,cat,subCat,product,catArray,subCatArray,defaultProd,productArray',start,responseState,cat,subCat,product,catArray,subCatArray,defaultProd,productArray);

  useEffect(() => {
    const catDetails = async () => {
      const res = await getCategoryList();
      setCatArray(res);
    };
    catDetails();
  }, []);
  useEffect(() => {
    const idParam = searchParams.get("prodId");
    const getProdDetail = async () => {
      const res = await getRequestLoggedIn(productDetails(idParam));
      if ((res.state_code = "200")) {
        setDefaultProd(res.data);
        setSearchParams({});
      }
    };
    idParam && getProdDetail();
  }, []);
  let history = useNavigate();

  const saveData = async ({ title, attributes, batchNumber, description, warranty }) => {
    setStart(true);
    // let responseData;

    let metaData = {
      category_id: defaultProd?.category_id || cat,
      subcategory_id: defaultProd?.subcategory_id || subCat,
      product_id: defaultProd?.product_id || product,
      image: null,
      title: title,
      description: description,
      token_attributes: attributes,
      batch_no: batchNumber,
      transction: [],
      warranty: warranty,
    };
    if (token) {
      metaData = { ...metaData, token_id: token };
    }
    console.log('metaData',metaData);
    let res = await postRequestLoggedIn(
      token ? addTokenData : createToken,
      metaData
    );
    // console.log('res',res);
    // console.log('res.status_code',res.status_code);
    // console.log('TypeError occurerd? ==>>',res.status_code === undefined);
    if (res.status_code !== undefined) {
      setResponseState(res);
      // history("/tokens");
    }
    if (res.status_code === undefined) {
      res.status_code = "504";
      res.message = "Network Error Occurred";
      // console.log('error res', res);
      setResponseState(res);
      // history("/tokens");
    }
  };

  // const handleReset = () => {
  //   setResponseState(null);
  //   setCat("");
  //   setSubCat("");
  //   setProduct("");
  //   setDefaultProd("");
  //   setSearchParams("");
  //   setSubCatArray([]);
  //   setProductArray([]);
  // };

  const modalClose = () => {
    setStart(false);
    setResponseState(null);
    if(responseState.status_code === "200") {
      // handleReset();
      // console.log('start,responseState,cat,subCat,product,catArray,subCatArray,defaultProd,productArray',start,responseState,cat,subCat,product,catArray,subCatArray,defaultProd,productArray);
      history("/tokens");
    }
  };

  const getCategoryList = async () => {
    const res = await getRequestLoggedIn(categoryList);
    if (res?.status_code === "200") {
      return res.categoryList.map((obj) => obj);
    }
    return null;
  };

  const getSubCategoryList = async (catId) => {
    const res = await getRequestLoggedIn(subCategoryListForCat(catId));
    if (res?.status_code === "200") {
      return (
        res && res.sub_categoryList && res.sub_categoryList.map((obj) => obj)
      );
    }
    return null;
  };

  const getProductList = async (catId, subCatId) => {
    const res = await getRequestLoggedIn(
      productDetailForSubCat(catId, subCatId)
    );
    if (res?.status_code === "200") {
      return res && res.productList && res.productList.map((obj) => obj);
    }
    return null;
  };

  return (
    <>
      {start && <TransctionModal response={responseState} modalClose={modalClose} />}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className={token === undefined ? "publishArtContainer" : "addTokenDataContainer"} style={{ margin: 20 }}>
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <h4>{token ? `Add info to #${token}` : "Create Order Tokens"}</h4>
                    <Formik
                      initialValues={{
                        title: "",
                        category: "",
                        description: "",
                        subCategory: "",
                        product: "",
                        batchNumber: "",
                        attributes: [],
                        warranty: [],
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values, { setSubmitting }) => {
                        saveData(values);
                        setSubmitting(false);
                      }}
                    >
                      {({
                        touched,
                        errors,
                        isSubmitting,
                        values,
                        dirty,
                        isValid,
                      }) => {
                        return (
                          <Form>
                            <Grid container>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
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
                                    style={{ marginRight: 10, padding: "2px 9px", borderRadius: "8px" }}
                                    onChange={async (e) => {
                                      setDefaultProd({
                                        ...defaultProd,
                                        category_id: "",
                                        subcategory_id: "",
                                        product_id: "",
                                      });
                                      setCat(e.target.value);
                                      const res = await getSubCategoryList(
                                        e.target.value
                                      );
                                      setSubCatArray(res);
                                    }}
                                    value={defaultProd?.category_id || cat}
                                  >
                                    <option>-- Please select --</option>
                                    {catArray &&
                                      catArray.map((item) => (
                                        <option value={item.category_id}>
                                          {item.category_name}
                                        </option>
                                      ))}
                                  </Field>
                                  <ErrorMessage
                                    name="category"
                                    component={TextError}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="title" className="my-2">
                                    Sub Category{" "}
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
                                    style={{ marginRight: 10, padding: "2px 9px", borderRadius: "8px"  }}
                                    onChange={async (e) => {
                                      setDefaultProd({
                                        ...defaultProd,
                                        subcategory_id: "",
                                        product_id: "",
                                      });

                                      setSubCat(e.target.value);
                                      const res = await getProductList(
                                        cat,
                                        e.target.value
                                      );
                                      setProductArray(res);
                                    }}
                                    disabled={
                                      !(defaultProd?.category_id || cat)
                                    }
                                    value={
                                      defaultProd?.subcategory_id || subCat
                                    }
                                  >
                                    {defaultProd?.subcategory_id && (
                                      <option
                                        value={defaultProd?.subcategory_id}
                                      >
                                        {defaultProd?.subcategory_name}
                                      </option>
                                    )}

                                    {!defaultProd?.subcategory_id && (
                                      <option>-- Please select --</option>
                                    )}
                                    {subCatArray &&
                                      subCatArray.map((item) => (
                                        <option value={item.sub_category_id}>
                                          {item.subcategory_name}
                                        </option>
                                      ))}
                                  </Field>
                                  <ErrorMessage
                                    name="subCategory"
                                    component={TextError}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="title" className="my-2">
                                    Product{" "}
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
                                    style={{ marginRight: 10, padding: "2px 9px", borderRadius: "8px" }}
                                    onChange={(e) => {
                                      setDefaultProd({
                                        ...defaultProd,
                                        product_id: "",
                                      });

                                      setProduct(e.target.value);
                                    }}
                                    disabled={
                                      !(defaultProd?.subcategory_id || subCat)
                                    }
                                    value={defaultProd?.product_id || product}
                                  >
                                    {defaultProd?.product_id && (
                                      <option value={defaultProd?.product_id}>
                                        {defaultProd?.product_name}
                                      </option>
                                    )}
                                    {!defaultProd?.product_id && (
                                      <option>-- Please select --</option>
                                    )}

                                    {productArray &&
                                      productArray.map((item) => (
                                        <option value={item.productid}>
                                          {item.product_name}
                                        </option>
                                      ))}
                                  </Field>
                                  <ErrorMessage
                                    name="product"
                                    component={TextError}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="title" className="my-2">
                                    Batch Number{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="batchNumber"
                                    autoComplete="false"
                                    placeholder="Enter Batch Number"
                                    className={`form-control text-muted 
                                        "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: "2px 9px", borderRadius: "8px" }}
                                    disabled={
                                      !(defaultProd?.product_id || product)
                                    }
                                  />
                                  <ErrorMessage
                                    name={"batchNumber"}
                                    component={TextError}
                                  />
                                </div>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="title" className="my-2">
                                    Item Title{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="title"
                                    autoComplete="false"
                                    placeholder="Enter title"
                                    className={`form-control text-muted ${
                                      touched.title && errors.title
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ marginRight: 10, padding: "2px 9px", borderRadius: "8px" }}
                                    disabled={
                                      !(defaultProd?.product_id || product)
                                    }
                                  />
                                  <ErrorMessage
                                    name={"title"}
                                    component={TextError}
                                  />
                                </div>
                              </Grid>

                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="description" className="my-2">
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    component={"textarea"}
                                    aria-label="minimum height"
                                    minRows={3}
                                    name="description"
                                    placeholder="Please enter some descriptions"
                                    style={{ width: "100%", borderRadius: "8px"  }}
                                    disabled={
                                      !(defaultProd?.product_id || product)
                                    }
                                    className={`form-control text-muted ${
                                      touched.description && errors.description
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  <ErrorMessage
                                    name="description"
                                    component={TextError}
                                  />
                                </div>
                              </Grid>

                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                <div
                                  className="form-group"
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                  <label htmlFor="warranty" className="my-2">
                                    Add Warranty{" "}
                                  </label>
                                  <FieldArray
                                    name="warranty"
                                    render={(arrayHelpers) => (
                                      <div>
                                        {values.warranty && values.warranty.length > 0 ? (
                                          values.warranty.map(
                                            (warr, index) => (
                                              <div
                                                style={{ border: "1px solid #c7c9cc", borderRadius: 5, padding: 12, marginTop: 2, marginBottom: 10 }}
                                                key={index}
                                              >
                                                <DeleteOutlineIcon
                                                  onClick={() => arrayHelpers.remove(index) }
                                                  sx={{ color: pink[500] }}
                                                  style={{ float: "right", cursor: "pointer" }}
                                                />
                                                <Grid container>
                                                  <Grid item lg={5} md={5} sm={12} xs={12} style={{ marginRight: 10 }} >
                                                    <Field
                                                      name={`warranty.${index}.trait_type`}
                                                      autoComplete="false"
                                                      placeholder="Warranty name"
                                                      className={`form-control text-muted `}
                                                      style={{ marginTop: 5, padding: "2px 9px", borderRadius: "8px" }}
                                                    />
                                                    <ErrorMessage
                                                      name={`warranty.${index}.trait_type`}
                                                      component={TextError}
                                                    />
                                                  </Grid>
                                                  <Grid item lg={4} md={4} sm={12} xs={12} style={{ marginRight: 10 }} >
                                                    <Field
                                                      type="number"
                                                      name={`warranty.${index}.value`}
                                                      autoComplete="false"
                                                      placeholder="Warranty duration"
                                                      className={`form-control text-muted`}
                                                      style={{ marginTop: 5, padding: "2px 9px", borderRadius: "8px"  }}
                                                    />
                                                    <ErrorMessage
                                                      name={`warranty.${index}.value`}
                                                      component={TextError}
                                                    />
                                                  </Grid>
                                                  <Grid item lg={2} md={2} sm={12} xs={12} style={{ marginRight: 10 }} >
                                                    <p style={{ marginTop: 10, marginBottom: 0, fontWeight: 800}}>Months</p>
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
                                            color="error"
                                            onClick={() => arrayHelpers.push("")}
                                            disabled={ !(defaultProd?.product_id || product) }
                                          >
                                            {/* show this when user has removed all warranty from the list */}
                                            Add warranty
                                          </Button>
                                        )}
                                        {values.warranty.length !== 0 && (
                                          <Button
                                            variant="outlined"
                                            size="medium"
                                            type="button"
                                            onClick={() => arrayHelpers.insert(values.warranty.length + 1, "")}
                                            style={{ marginTop: 10 }}
                                          >
                                            ADD WARRANTY
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
                                  style={{ marginLeft: 10, marginTop: 5 }}
                                >
                                <label htmlFor="attributes" className="my-2">
                                  Add Attributes{" "}
                                  {/* <span className="text-danger">*</span> */}
                                </label>
                                  <FieldArray
                                    name="attributes"
                                    render={(arrayHelpers) => (
                                      <div>
                                        {values.attributes && values.attributes.length > 0 ? (
                                          values.attributes.map(
                                            (attribut, index) => (
                                              <div
                                                style={{ border: "1px solid #c7c9cc", borderRadius: 5, padding: 12, marginTop: 2, marginBottom: 10 }}
                                                key={index}
                                              >
                                                <DeleteOutlineIcon
                                                  onClick={() => arrayHelpers.remove(index) }
                                                  sx={{ color: pink[500] }}
                                                  style={{ float: "right", cursor: "pointer" }}
                                                />
                                                <Grid container>
                                                  <Grid item lg={5} md={5} sm={12} xs={12} style={{ marginRight: 20 }} >
                                                    <Field
                                                      name={`attributes.${index}.trait_type`}
                                                      autoComplete="false"
                                                      placeholder="Enter Properties name"
                                                      className={`form-control text-muted `}
                                                      style={{ marginTop: 5, padding: "2px 9px", borderRadius: "8px" }}
                                                    />
                                                  </Grid>
                                                  <Grid item lg={6} md={6} sm={12} xs={12}
                                                  >
                                                    <Field
                                                      name={`attributes.${index}.value`}
                                                      autoComplete="false"
                                                      placeholder="Enter Value"
                                                      className={`form-control text-muted`}
                                                      style={{ marginTop: 5, padding: "2px 9px", borderRadius: "8px" }}
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
                                            color="error"
                                            onClick={() => arrayHelpers.push("")}
                                            disabled={ !(defaultProd?.product_id || product) }
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
                                            onClick={() => arrayHelpers.insert(values.attributes.length + 1, "")}
                                            style={{ marginTop: 10 }}
                                          >
                                            ADD ATTRIBUTES
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
                                      color="error"
                                      sx={{
                                        marginRight: "20px",
                                        textTransform: "none",
                                      }}
                                      disabled={!(dirty && isValid)}
                                    >
                                      Submit{" "}
                                    </Button>
                                  </span>
                                </div>
                              </Grid>
                            </Grid>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Mint;
