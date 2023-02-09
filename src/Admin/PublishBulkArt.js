import React, { useState, useEffect } from "react";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BulkTransctionModal from "../components/shared/BulkTransctionModal";
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
  const [responseState, setResponseState] = useState();

  let history = useNavigate();

  useEffect(() => {
    const getTotalBlnkTokens = async () => {
      const res = await getRequestLoggedIn(totalBlankTokens);
      if (res?.status_code === "200") {
        setTotalBlnkTokens(res.totalBlankTokens);
      } else {
        setTotalBlnkTokens(0);
      }
    };
    const getBulkTokenUploadHistory = async () => {
      const res = await getRequestLoggedIn(bulkTokenUploadHistory);
      if (res?.status_code === "200") {
        // console.log('res uploadHistory',res.uploadHistory);
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
  }, [start]);

  const incDecBulkNum = (e) => {
    let newNum = e.target.value;
    setBulkNumber(toNumber(newNum));
    setBulkNumber ((bulkNumber) => {
      return bulkNumber;
    });
  }

  const addBulkNumber = (num) => {
    let newBulkNum = bulkNumber + num;
    setBulkNumber(newBulkNum);
    setBulkNumber ((bulkNumber) => {
      return bulkNumber;
    });
  };

  const saveBulkData = async () => {
    setStart(true);
    const resData = await postRequestLoggedIn(createBulkToken, {
      total_tokens: bulkNumber,
    });
    // console.log('saveBulkData resData', resData);
    setResponseState(resData);
    // history("/dashboard");
  };

  const handleReset = () => {
    setStart(false);
    setBulkNumber(0);
    setBulkNumber ((bulkNumber) => {
      return bulkNumber;
    });
  }

  const modalClose = () => {
    setStart(false);
    handleReset();
    // history("/tokens");
  };
  return (
    <>
      {start && <BulkTransctionModal modalClose={modalClose} response={responseState} />}

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
                          style={{ marginLeft: 10, marginTop: 0 }}
                        >
                          <label htmlFor="title" className="bulkArtLabel" >
                            Bulk Token Number
                            <span className="text-danger">*</span>
                          </label>
                          
                          <TextField
                            type="number"
                            name="totalTokens"
                            onChange={(e) => incDecBulkNum(e)}
                            autoComplete="false"
                            placeholder="Enter Bulk Number"
                            error={bulkNumber <= 0}
                            required
                            value={bulkNumber}
                            style={{ marginRight: 10, paddingTop: 5, paddingLeft: 10 }}
                            sx={{
                              ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": { padding: "6px 14px"},
                              ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {top: "-8px"},
                              ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {borderRadius: "8px"},
                              ".css-1x5jdmq": { padding: "6px 14px"},
                              ".css-p0rm37": {top: "-8px"},
                              ".css-1v4ccyo": {borderRadius: "8px"},
                            }}
                            InputProps = {{ inputProps: { min: 0 } }}
                          />
                          <div
                            style={{
                              padding: "4px 0px",
                              background: "white",
                              float: "right",
                            }}
                          >
                            <span className="input-group-btn">
                              <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                onClick={handleReset}
                                sx={{ marginRight: "20px", lineHeight: 1.5, borderRadius: "8px" }}
                              >
                                RESET
                              </Button>
                            </span>
                            <span className="input-group-btn">
                              <Button
                                variant="contained"
                                color="primary"
                                component="label"
                                disabled={bulkNumber <= 0}
                                onClick={saveBulkData}
                                sx={{ marginRight: "20px", lineHeight: 1.5, borderRadius: "8px" }}
                              >
                                SUBMIT
                              </Button>
                            </span>
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
                          <h5>{"Quick Action (Add Token Buttons)"}</h5>
                        </div>
                        <Grid container>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(100)} >
                                  + 100{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(1000)} >
                                  + 1000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(10000)} >
                                  + 10000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(500)}
                                >
                                  + 500{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(5000)} >
                                  + 5000{" "}
                                </Button>
                              </span>
                            </div>
                          </Grid>
                          <Grid item sm={2}>
                            <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                              <span className="input-group-btn">
                                <Button
                                  type="button"
                                  variant="outlined"
                                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                    ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                  }}
                                  style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                  onClick={() => addBulkNumber(50000)} >
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
                        </div>
                        <Grid container>
                          {bulkTokenUpldHistory.map((bulkHistory, i) => (
                            <Grid item sm={12}>
                              <div className="form-group" style={{ marginLeft: 10, marginTop: 10, float: "left", }} >
                                <span className="input-group-btn">
                                <Grid container>
                                  <Grid item sm={1}>
                                    <div style={{  paddingTop: "5px", width: "28vw" }}>{i+1}. </div>
                                  </Grid>
                                  <Grid item sm={2}>
                                    <Button
                                      type="button"
                                      variant="outlined"
                                      sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                                        ".css-1pqxanb-MuiButtonBase-root-MuiButton-root": { lineHeight: 1 },
                                      }}
                                      style={{ minWidth: "70px", maxWidth: "80px", float: "left", padding: 2, borderRadius: 8 }}
                                      onClick={() => setBulkNumber(toNumber(bulkHistory.total_tokens))} 
                                    >
                                      {bulkHistory.total_tokens}
                                    </Button>
                                  </Grid>
                                  <Grid item sm={9}>
                                    <div style={{  paddingTop: "5px", width: "28vw" }}>Tokens Created on: {bulkHistory.created}</div>
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
