import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import ProductTable from "./components/ProductTable";
import DashboardButtonCard from "./components/DashboardButtonCard";
import Card from "./components/Card";
import Tree from "./components/Tree";
import { ApplicationContext } from "../Context/ApplicationContext";
function Dashboard() {
  const { tokenDetailsArray } = useContext(ApplicationContext);
  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <DashboardButtonCard text="Create token" link="/publishArt" />
          </Grid>
          <Grid item sm={4}>
            <DashboardButtonCard
              text="Create bulk token"
              link="/publishBulkArt"
            />
          </Grid>
          <Grid item sm={4}>
            <DashboardButtonCard
              text="Upload Bulk Data"
              link="/uploadBulkData"
            />
          </Grid>

          <Grid item sm={6}>
            <Tree />
          </Grid>
          <Grid item sm={6}>
            <Card token={tokenDetailsArray?.length} text="Token Count" />
            <Card token={10} text="Product Count" />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
