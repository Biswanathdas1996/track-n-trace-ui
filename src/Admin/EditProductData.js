import React, { useState } from "react";
// import { Formik, Form, Field, FieldArray } from "formik";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import DeleteOutlineIcon from "@mui/icons-material/Delete";
// import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
// import { postData } from "../functions/apiClient";

const Mint = () => {
  const [start, setStart] = useState(false);
  // const [response, setResponse] = useState(null);

  let history = useNavigate();
  // { product, category, subCategory }
  // const saveAddProductData = async ( product, category, subCategory, attributes ) => {
  //   setStart(true);
  //   // let responseData;

    // const metaData = {
    //   product: "Product A",
    //   category: "Category B",
    //   subCategory: "Sub-Category C",
    //   image: null,
    //   description: "Test description",
    //   attributes: [],
    // };

  //   setResponse(metaData);
  //   console.log("AddProductData response==>",metaData);
  //   await postData(`/create`, metaData);
  //   history("/");
  // };

  const modalClose = () => {
    setStart(false);
    // setResponse(null);
    history("/");
  };

  return (
    <>
      {start && <TransctionModal modalClose={modalClose} />}

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
                    <h4>Update Product Data</h4>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-read-only-input"
                        select
                        label="Product"
                        value="Product A"
                        margin="normal"
                      >
                        <MenuItem value="Product A">Product A</MenuItem>
                        <MenuItem value="Product B">Product B</MenuItem>
                        <MenuItem value="Product C">Product C</MenuItem>
                      </TextField>
                      <TextField
                        id="outlined-read-only-input"
                        select
                        label="Category"
                        value="Category B"
                        margin="normal"
                      >
                        <MenuItem value="Category A">Category A</MenuItem>
                        <MenuItem value="Category B">Category B</MenuItem>
                        <MenuItem value="Category C">Category C</MenuItem>
                      </TextField>
                      <TextField
                        id="outlined-read-only-input"
                        select
                        label="Sub-Category"
                        value="Sub-Category C"
                        margin="normal"
                      >
                        <MenuItem value="Sub-Category A">Sub-Category A</MenuItem>
                        <MenuItem value="Sub-Category B">Sub-Category B</MenuItem>
                        <MenuItem value="Sub-Category C">Sub-Category C</MenuItem>
                      </TextField>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        multiline
                        maxRows={4}
                        value="Test Description"
                        variant="standard"
                        margin="normal"
                      />
                    </FormControl>
                  </div>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    className="form-group"
                    style={{
                      marginLeft: 10,
                      marginTop: 10,
                      marginBottom: 10,
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
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Mint;
