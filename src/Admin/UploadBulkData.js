import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  getRequestLoggedIn,
  postRequestLoggedIn,
} from "../functions/apiClient";
import {
  categoryList,
  subCategoryListForCat,
  productDetailForSubCat,
  totalBlankTokens,
  downloadCsv,
  uploadCsvData,
} from "../endpoint";
import "./UploadBulkData.css"
import { toNumber } from "lodash";

const UploadBulkData = () => {
  const hiddenFileInput = React.useRef(null);
  const [excelDataQuery, setExcelDataQuery] = useState({
    totalTokens: "",
    category_id: "",
    sub_category_id: "",
    productId: "",
  });
  const [totalBlnkTokens, setTotalBlnkTokens] = useState(0);
  const [tokenHelperText, setTokenHelperText] = useState("");
  const [catArray, setCatArray] = useState([]);
  const [subCatArray, setSubCatArray] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [file, setFile] = useState("");
  const [array, setArray] = useState([]);
  const [initial, setInitial] = useState(true);

  let history = useNavigate();

  useEffect(() => {
    const getTotalBlnkTokens = async () => {
      const res = await getRequestLoggedIn(totalBlankTokens);
      if (res?.status_code === "200") {
        setTotalBlnkTokens(res.totalBlankTokens);
        setTokenHelperText("Please Enter a value between 1 to " + res.totalBlankTokens)
      } else {
        setTotalBlnkTokens(0);
      }
    };
    const getCategoryList = async () => {
      const res = await getRequestLoggedIn(categoryList);
      if (res?.status_code === "200") {
        setCatArray(res.categoryList);
      } else {
        setCatArray([]);
      }
    };

    getTotalBlnkTokens();
    getCategoryList();
  }, []);

  const handleReset = () => {
    setExcelDataQuery({
      totalTokens: "",
      category_id: "",
      sub_category_id: "",
      productId: "",
    });
  }

  const getSubCategoryList = async (catId) => {
    const res = await getRequestLoggedIn(subCategoryListForCat(catId));
    if (res?.status_code === "200") {
      setSubCatArray(res.sub_categoryList);
    } else {
      setSubCatArray([]);
    }
  };

  const getProductList = async (catId, subCatId) => {
    const res = await getRequestLoggedIn(
      productDetailForSubCat(catId, subCatId)
    );
    if (res?.status_code === "200") {
      setProductArray(res.productList);
    } else {
      setProductArray([]);
    }
  };

  const handleChange = async (event) => {
    let nameEvent = event.target.name;
    let valEvent = event.target.value;

    if (nameEvent === "category_id") {
      setExcelDataQuery((prevalue) => {
        return {
          ...prevalue,
          sub_category_id: "",
          productId: "",
        };
      });
      getSubCategoryList(valEvent);
    }
    if (nameEvent === "sub_category_id") {
      setExcelDataQuery((prevalue) => {
        return {
          ...prevalue,
          productId: "",
        };
      });
      getProductList(excelDataQuery.category_id , valEvent);
    }

    setExcelDataQuery((prevalue) => {
      return {
        ...prevalue,
        [nameEvent]: valEvent,
      };
    });
    setInitial(false);
  };

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    let fileData = e.target.files[0];
    setFile(fileData);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let csvOutput;
    if (file) {
      fileReader.onload = function (event) {
        csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = async (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = (values[index] === undefined || values[index] === "" ) ? "" : values[index];
        return object;
      }, {});
      return obj;
    });

    console.log('array',array);

    setArray(array);
    
    await postRequestLoggedIn(uploadCsvData, {
      csvData: array,
    });
  };

  const onDownload = async () => {
    const res = await postRequestLoggedIn(downloadCsv, excelDataQuery);
    if (res.status_code === "200") {
      const link = res.csv;
      handleClick(link);
    }
  };

  const handleClick = (link) => {
    const clickLink = document.createElement("a");
    clickLink.download = link;
    clickLink.href = link;
    clickLink.click();
  };

  const handleFileUpload = (event) => {
    hiddenFileInput.current.click();
  };

  const handleBack = () => {
    history("/tokens");
  };

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card>
              <Grid container>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px 20px 0px 20px",
                      background: "white",
                    }}
                  >
                    <h3><center>Upload Bulk Data</center></h3>
                    <hr/>
                    <h4><strong>Generate Sample CSV</strong></h4>
                  </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px 0px 0px 20px",
                      background: "white",
                    }}
                  >
                    <h5>Blank order tokens available: <strong>{totalBlnkTokens}</strong></h5>
                  </div>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "10px 0px 0px 20px",
                      background: "white",
                    }}
                  >
                    <label htmlFor="title" style={{marginTop: "26px"}}>
                      Blank order tokens required for data entry
                      <span className="text-danger">*</span>
                    </label>

                    <TextField
                      type="number"
                      name="totalTokens"
                      onChange={(e) => handleChange(e)}
                      autoComplete="false"
                      placeholder="Enter Bulk Number"
                      helperText={tokenHelperText}
                      error={initial ? false : toNumber(excelDataQuery.totalTokens) <= 0}
                      required
                      value={excelDataQuery.totalTokens}
                      style={{ marginRight: 10, padding: 9, width: "15vw" }}
                      InputProps = {{ inputProps: { min: 0, max: totalBlnkTokens } }}
                    />
                  </div>
                </Grid>

                <Grid
                  item
                  sm={3}
                  style={{ marginTop: "18px", paddingLeft: "17px" }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Select Category </InputLabel>
                    <Select
                      label="Choose Category"
                      id="fullWidth"
                      onChange={(e) => handleChange(e)}
                      name="category_id"
                      autoWidth
                      required
                      value={excelDataQuery.category_id}
                      style={{ marginRight: 10, width: "14vw" }}
                    >
                      {catArray &&
                        catArray.map((cat) => (
                          <MenuItem
                            key={cat.category_id}
                            value={cat.category_id}
                          >
                            {cat.category_name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{"Please select a Category"}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  sm={3}
                  style={{ marginTop: "18px", paddingLeft: "17px" }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Select Sub-Category </InputLabel>
                    <Select
                      label="Choose Sub-Category"
                      id="fullWidth"
                      onChange={(e) => handleChange(e)}
                      name="sub_category_id"
                      autoWidth
                      required
                      disabled={excelDataQuery?.category_id === ""}
                      value={excelDataQuery.sub_category_id}
                      style={{ marginRight: 10, width: "14vw" }}
                    >
                      {subCatArray &&
                        subCatArray.map((subCat) => (
                          <MenuItem
                            key={subCat.sub_category_id}
                            value={subCat.sub_category_id}
                          >
                            {subCat.subcategory_name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{excelDataQuery?.category_id === "" ? "Please select Category to access this field" : "Please select a Sub-Category"}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  sm={3}
                  style={{ marginTop: "18px", paddingLeft: "17px" }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Select Product </InputLabel>
                    <Select
                      label="Choose Product"
                      id="fullWidth"
                      onChange={(e) => handleChange(e)}
                      name="productId"
                      autoWidth
                      required
                      disabled={excelDataQuery?.sub_category_id === ""}
                      value={excelDataQuery.productId}
                      style={{ marginRight: 10, width: "14vw" }}
                    >
                      {productArray &&
                        productArray.map((prod) => (
                          <MenuItem
                            key={prod.productid}
                            value={prod.productid}
                          >
                            {prod.product_name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{excelDataQuery?.sub_category_id === "" ? "Please select Sub-Category to access this field" : "Please select a Product"}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  sm={3}
                  style={{ marginTop: "18px", paddingLeft: "17px" }}
                >
                  <Button
                    onClick={onDownload}
                    variant="contained"
                    color="primary"
                    disabled={excelDataQuery?.productId === "" || (toNumber(excelDataQuery?.totalTokens)  <= 0)}
                    component="label"
                    sx={{
                      marginRight: "20px",
                      marginTop: "10px",
                      textTransform: "none",
                    }}
                  >
                    DOWNLOAD CSV {"{"}{toNumber(excelDataQuery?.totalTokens)} Rows{"}"}
                  </Button>
                </Grid>
                
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px 20px 0px 20px",
                      background: "white",
                    }}
                  >
                    <hr/>
                    <h4><strong>Upload CSV Data</strong></h4>
                  </div>
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        onClick={handleFileUpload}
                        sx={{
                          marginRight: "20px",
                          textTransform: "none",
                        }}
                      >
                        SELECT CSV FILE
                      </Button>
                      <form>
                        <input
                          type={"file"}
                          id={"csvFileInput"}
                          ref={hiddenFileInput}
                          accept={".csv"}
                          style={{display: 'none'}}
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                        />
                      </form>
                    </>
                  </div>
                </Grid>

                {file && file === "" ? (
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <div
                      style={{
                        padding: "20px",
                        background: "white",
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold' }}>No file selected yet.</Typography>
                    </div>
                  </Grid>
                ) : (
                  <Grid item lg={3} md={3} sm={12} xs={12}>
                    <div
                      style={{
                        padding: "20px",
                        background: "white",
                      }}
                    >
                      <Typography sx={{ fontWeight: 'bold' }}>Selected File: {file.name}</Typography>
                    </div>
                  </Grid>
                )}

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                      float: "right",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"
                      disabled={file === ""}
                      onClick={(e) => {
                        handleOnSubmit(e);
                      }}
                      sx={{
                        marginRight: "20px",
                        textTransform: "none",
                      }}
                    >
                      IMPORT CSV
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="contained"
                      color="primary"
                      component="label"
                      sx={{
                        marginRight: "20px",
                        textTransform: "none",
                      }}
                    >
                      RESET
                    </Button>
                    <Button
                      onClick={handleBack}
                      variant="contained"
                      color="primary"
                      component="label"
                      sx={{
                        marginRight: "20px",
                        textTransform: "none",
                      }}
                    >
                      GO BACK
                    </Button>
                  </div>
                </Grid>

              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default UploadBulkData;
