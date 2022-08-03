import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import LaptopMacIcon from "@mui/icons-material/LaptopMac";

import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { getData } from "../functions/apiClient";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

export default function CustomizedTimeline() {
  const { token } = useParams();
  const [nftData, setNftData] = React.useState(null);

  React.useEffect(() => {
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetails = async () => {
    const data = await getData(`/get-token-data?id=${token}`);
    setNftData(data);
  };

  console.log("---nftData-->", nftData);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container style={{ marginTop: 30 }}>
          <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card style={{ margin: 20 }}>
              <CardMedia
                component="img"
                height="140"
                image={nftData?.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="text.secondary"
                >
                  #Token {token}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {nftData?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {nftData?.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <center>
              <Typography gutterBottom variant="h6" component="div">
                Tracking
              </Typography>
            </center>

            <Timeline position="alternate">
              {nftData &&
                nftData?.transction.map((data, index) => {
                  return (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent
                        sx={{ m: "auto 0" }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                      >
                        {data?.date}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color="primary">
                          <LaptopMacIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="h6" component="span">
                          {data?.status}
                        </Typography>
                        <Typography>{data?.place}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
            </Timeline>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
