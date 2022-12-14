import React, { useState, useEffect } from "react";
// import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import TransctionModal from "../components/shared/TransctionModal";
import { getRequestLoggedIn, postRequestLoggedIn } from "../functions/apiClient";
import { createBulkToken } from "../endpoint";
import TextField from '@mui/material/TextField';
import './PublishBulkArt.css';
import { toNumber } from "lodash";
import { totalBlankTokens, bulkTokenUploadHistory } from "../endpoint";

const PublishBulkArt = () => {
  const [start, setStart] = useState(false);
  const [bulkNumber, setBulkNumber] = useState(0);
  const [totalBlnkTokens, setTotalBlnkTokens] = useState(0);
  const [bulkTokenUpldHistory, setBulkTokenUpldHistory] = useState([]);

  let history = useNavigate();

  useEffect(() => {
    const getTotalBlnkTokens = async () => {
      const res = await getRequestLoggedIn(totalBlankTokens);
      if (res?.status_code === "200") {
        setTotalBlnkTokens(res.totalBlankTokens);
        // setTokenHelperText("Please Enter a value between 1 to " + res.totalBlankTokens)
      } else {
        setTotalBlnkTokens(0);
      }
    };
    const getBulkTokenUploadHistory = async () => {
      const res = await getRequestLoggedIn(bulkTokenUploadHistory);
      if (res?.status_code === "200") {
        console.log('res uploadHistory',res.uploadHistory);
        setBulkTokenUpldHistory(res.uploadHistory);
        setBulkTokenUpldHistory ((bulkTokenUpldHistory) => {
          return bulkTokenUpldHistory;
        });
      } else {
        setBulkTokenUpldHistory([]);
      }
    };

    getTotalBlnkTokens();
    getBulkTokenUploadHistory();
  }, []);

  const incDecBulkNum = (e) => {
    // console.log('e.target.value',e.target.value);
    let newNum = e.target.value;
    setBulkNumber(toNumber(newNum));
    setBulkNumber ((bulkNumber) => {
      // console.log('incDecBulkNum bulkNumber',bulkNumber);
      return bulkNumber;
    });
  }

  const addBulkNumber = (num) => {
    let newBulkNum = bulkNumber + num;
    // console.log('num',num);
    // console.log('newBulkNum',newBulkNum);
    setBulkNumber(newBulkNum);
    setBulkNumber ((bulkNumber) => {
      // console.log('addBulkNumber bulkNumber',bulkNumber);
      return bulkNumber;
    });
  };

  const saveBulkData = async () => {
    setStart(true);
    // console.log('bulkNumber',bulkNumber);
    
    await postRequestLoggedIn(createBulkToken, {
      total_tokens: bulkNumber,
    });
    history("/dashboard");
  };

  const handleReset = () => {
    setStart(false);
    setBulkNumber(0);
    setBulkNumber ((bulkNumber) => {
      // console.log('handleReset bulkNumber',bulkNumber);
      return bulkNumber;
    });
  }

  const modalClose = () => {
    setStart(false);
    history("/dashboard");
  };
  return (
    <>
      {start && <TransctionModal modalClose={modalClose} />}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={2} md={2} sm={12} xs={12}></Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <div className="publishBulkArtContainer">
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "15px",
                      background: "white",
                    }}
                  >
                    <h4>Create Bulk Tokens</h4>
                    <hr/>
                    
                    <Grid container>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          style={{
                            paddingLeft: "10px",
                            background: "white",
                          }}
                        >
                          <h5>Blank order tokens available: <strong>{totalBlnkTokens}</strong></h5>
                        </div>
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          className="form-group"
                          style={{ marginLeft: 10, marginTop: 10 }}
                        >
                          <label htmlFor="title" className="bulkArtLabel" >
                            Bulk Item Number
                            <span className="text-danger">*</span>
                          </label>
                          
                          <TextField
                            // className="bulkTokenField" //<<<==============
                            type="number"
                            name="totalTokens"
                            onChange={(e) => incDecBulkNum(e)}
                            autoComplete="false"
                            placeholder="Enter Bulk Number"
                            // helperText={tokenHelperText}
                            // error={initial ? false : toNumber(bulkNumber) <= 0}
                            error={bulkNumber <= 0}
                            required
                            value={bulkNumber}
                            style={{ marginRight: 10, paddingTop: 5, paddingLeft: 10 }}
                            InputProps = {{ inputProps: { min: 0 } }}
                          />
                          <div
                            style={{
                              padding: "20px 0px",
                              background: "white",
                              float: "right",
                            }}
                          >
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
                              variant="contained"
                              color="primary"
                              component="label"
                              disabled={bulkNumber <= 0}
                              onClick={saveBulkData}
                              sx={{
                                marginRight: "20px",
                                textTransform: "none",
                              }}
                            >
                              SUBMIT
                            </Button>
                          </div>
                        </div>
                      </Grid>
                          
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          style={{
                            padding: "10px 0px 0px 10px",
                            background: "white",
                          }}
                        >
                          <h5>Add Token Helpers</h5>
                          {/* <h6>Order Tokens Quantity</h6> */}
                        </div>
                        <Grid container>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(100)} >
                                  + 100{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(500)} >
                                  + 500{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(1000)} >
                                  + 1000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(5000)} >
                                  + 5000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(10000)} >
                                  + 10000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button type="button" variant="outlined" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => addBulkNumber(50000)} >
                                  + 50000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}></Grid>
                        </Grid>
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div
                          style={{
                            padding: "10px 0px 0px 10px",
                            background: "white",
                          }}
                        >
                          <h5>Repeat Last Transaction</h5>
                          {/* <h6>Order Tokens Quantity</h6> */}
                        </div>
                        <Grid container>
                          {bulkTokenUpldHistory.map((bulkHistory, i) => (
                            <Grid item sm={12}>
                              <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                                <span className="input-group-btn">
                                <Grid container>
                                  <Grid item sm={1}>
                                    <div style={{  paddingTop: "10px", width: "28vw" }}>{i+1}. </div>
                                  </Grid>
                                  <Grid item sm={2}>
                                    <Button type="button" variant="contained" sx={{ marginRight: "20px", textTransform: "none" }} style={{ minWidth: "4vw", maxWidth: "5vw", float: "left", padding: 8, borderRadius: 4 }} onClick={() => setBulkNumber(toNumber(bulkHistory.total_tokens))} >
                                      {bulkHistory.total_tokens}
                                    </Button>
                                  </Grid>
                                  <Grid item sm={9}>
                                    <div style={{  paddingTop: "10px", width: "28vw" }}>Created on: {bulkHistory.created}</div>
                                  </Grid>
                                </Grid>
                                </span>
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
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
export default PublishBulkArt;
