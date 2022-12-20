import React, { useState, useEffect } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import { getRequestLoggedIn } from "../functions/apiClient";
import { getTokenDetails } from "../endpoint";
import Roles from "../_mock/userRole";
import { useNavigate } from "react-router-dom";

export default function CustomizedTimeline() {
  const { token } = useParams();
  const [tokenData, setTokenData] = useState(null);
  let history = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      const ep = getTokenDetails(token);
      const res = await getRequestLoggedIn(ep);
      if (res?.status_code === "200") {
        setTokenData(res);
        setTokenData((tokenData) => {
          return tokenData;
        });
      }
    };

    getDetails();
  }, []);

  const getRole = (roleId) => {
    const userRole = Roles.find(({ id }) => id == roleId);
    console.log('userRole',userRole);
    return userRole.roleName;
  };

  const handleBack = () => {
    history("/tokens");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item lg={12} md={12} sx={{ marginRight: 12, marginBottom: 2}}>
            <span>
              <Button type="button" variant="outlined" 
                sx={{ marginRight: "20px", textTransform: "none", fontWeight: 800, "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" },
                  ".css-16ssjge-MuiButtonBase-root-MuiButton-root": {fontWeight: 800, fontSize: "0.8rem", lineHeight: "0.6em" }
                }}
                style={{ minWidth: "4vw", float: "right", padding: "1px 8px", borderRadius: 4 }} 
                onClick={handleBack} 
              >
                GO BACK
              </Button>
            </span>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card style={{ margin: "0px 20px 0px 20px", width: 225, marginBottom: 2, height: 450, overflowY: "scroll" }}>
              <Grid
                container
                flexDirection="column"
                sx={{ padding: "15px" }}
              >
                {tokenData?.tokenDetails?.productImage && (
                  <Grid item sm={12}>
                    <CardMedia
                      component="img"
                      style={{
                        height: "190px",
                        width: "190px",
                      }}
                      image={tokenData?.tokenDetails?.productImage}
                      alt="green iguana"
                    />
                  </Grid>
                )}
                <Grid item sm={12}>
                  <Typography
                    gutterBottom
                    component="div"
                    variant="h6"
                    color="text.secondary"
                    paddingTop="15px"
                    sx={{ fontWeight: 800}}
                  >
                    #Token {token}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Batch: </strong>{" "}
                    {tokenData?.tokenDetails?.batch_no}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Category: </strong>{" "}
                    {tokenData?.tokenDetails?.categoryName}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Sub-Category: </strong>{" "}
                    {tokenData?.tokenDetails?.subcategoryName}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Product: </strong>{" "}
                    {tokenData?.tokenDetails?.productName}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Title: </strong>{" "}
                    {tokenData?.tokenDetails?.title}
                  </Typography>
                  <Typography gutterBottom component="div">
                    <strong>Description: </strong>{" "}
                    {tokenData?.tokenDetails?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card sx={{ backgroundColor: "transparent", height: 450, overflowY: "scroll"}}>
              <center>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 800 }}>
                  Tracking
                </Typography>
              </center>
              {tokenData?.transactions?.length > 0 ? (
                <Timeline position="alternate" sx={{ padding: "5px 5px" }}>
                  {tokenData &&
                    tokenData?.transactions?.map((data, index) => {
                      return (
                        <TimelineItem key={index}>
                          <TimelineOppositeContent
                            sx={{ m: "auto 0" }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                          >
                            {data?.created}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">
                              <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent sx={{ py: "8px", px: 2 }}>
                            <Typography variant="subtitle2" component="span">
                              <strong>{data?.message}</strong> <br />
                            </Typography>
                            <Typography variant="subtitle2" component="span">
                              <strong>Transaction By: </strong>
                            </Typography>
                            <Typography variant="subtitle2" component="span">
                              {getRole(data?.userRole)}
                              <br />
                            </Typography>
                            <Typography variant="subtitle2" component="span">
                              <EmailOutlinedIcon />
                              {data?.userEmail} <br />
                            </Typography>
                            <Typography variant="subtitle2" component="span">
                              <LocationOnOutlinedIcon />
                              {data?.location} <br />
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
                </Timeline>
              ) : (
                <center>
                  <Typography variant="subtitle1" component="span">
                    <strong>No transaction done for the token. </strong>
                  </Typography>
                </center>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
