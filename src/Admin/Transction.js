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
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
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
    return userRole.roleName;
  };

  const handleBack = () => {
    history("/tokens");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container style={{ marginTop: 30, marginBottom: 30 }}>
          <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card style={{ margin: 20 }}>
              <Grid
                container
                flexDirection="column"
                // justifyContent="center"
                // alignItems="center"
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
                    variant="h5"
                    component="div"
                    color="text.secondary"
                    paddingTop="15px"
                  >
                    #Token {token}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Batch Number: </strong>{" "}
                    {tokenData?.tokenDetails?.batch_no}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Category Name: </strong>{" "}
                    {tokenData?.tokenDetails?.categoryName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Sub-Category Name: </strong>{" "}
                    {tokenData?.tokenDetails?.subcategoryName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Product Name: </strong>{" "}
                    {tokenData?.tokenDetails?.productName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Token Title: </strong>{" "}
                    {tokenData?.tokenDetails?.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <strong>Description: </strong>{" "}
                    {tokenData?.tokenDetails?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <center>
              <Typography gutterBottom variant="h6" component="div">
                Tracking
              </Typography>
            </center>

            {tokenData?.transactions?.length > 0 ? (
              <Timeline position="alternate">
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
                        <TimelineContent sx={{ py: "12px", px: 2 }}>
                          <Typography variant="subtitle2" component="span">
                            <strong>{data?.trnxtn_details}</strong> <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <LocationOnOutlinedIcon />
                            {data?.trntxnLocation} <br />
                          </Typography>
                          <Typography variant="subtitle1" component="span">
                            <strong>Assigned By:- </strong>
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <strong>
                              {getRole(data?.tranxtnInitiaterRole)}
                            </strong>{" "}
                            <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <BadgeOutlinedIcon />
                            {data?.tranxtnInitiaterFname}{" "}
                            {data?.tranxtnInitiaterLname} <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <EmailOutlinedIcon />
                            {data?.tranxtnInitiaterEmail} <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <PhoneInTalkOutlinedIcon />
                            {data?.tranxtnInitiaterPhone} <br />
                          </Typography>
                          <Typography variant="subtitle1" component="span">
                            <strong>Assigned To:- </strong>
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <strong>{getRole(data?.tranxtnEndUserRole)}</strong>{" "}
                            <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <BadgeOutlinedIcon />
                            {data?.tranxtnEndUserFname}{" "}
                            {data?.tranxtnEndUserLname} <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <EmailOutlinedIcon />
                            {data?.tranxtnEndUserEmail} <br />
                          </Typography>
                          <Typography variant="subtitle2" component="span">
                            <PhoneInTalkOutlinedIcon />
                            {data?.tranxtnEndUserPhone} <br />
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
          </Grid>
          <Grid item lg={12} md={12}>
            <Button
              onClick={handleBack}
              variant="contained"
              color="primary"
              style={{ float: "right", padding: 8, borderRadius: 4 }}
              component="label"
              sx={{
                marginRight: "20px",
                textTransform: "none",
              }}
            >
              GO BACK
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
