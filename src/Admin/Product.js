import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import ProductTable from "./components/ProductTable";
import DashboardButtonCard from "./components/DashboardButtonCard";
import Card from "./components/Card";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getData } from "../functions/apiClient";

function Dashboard() {
  const [data, setData] = useState([]);
  let history = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  async function fetchAllPosts() {
    const data = await getData(`/get-all-token`);
    setData(data);
  }

  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Card token={data?.length} />
          </Grid>
          <Grid item sm={4}>
            <DashboardButtonCard text="Create token" link="/publishArt" />
          </Grid>
          <Grid item sm={4}>
            <DashboardButtonCard text="Create bulk token" link="/publishBulkArt" />
          </Grid>
          <Grid item sm={4}>
            <DashboardButtonCard text="Upload Bulk Data" link="/uploadBulkData" />
          </Grid>

          <Grid item sm={12}>
            {data && <ProductTable tokens={data} />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
