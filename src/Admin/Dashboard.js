import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import AppWidgetSummary from "./components/DashboardCards";
import ThemeProvider from "../Theme/index";
import UserTable from "./components/UserTable";

import { convertToToken, coinName } from "../utils";
import AdminLayout from "./Layout";

function Dashboard() {
  const [usersData, setUsersData] = useState(null);
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {};

  return (
    <ThemeProvider>
      <AdminLayout>
        <div className="container">
          <Grid container spacing={2}>
            <Grid item sm={4}>
              <AppWidgetSummary
                title="Total Users"
                total={usersData?.length}
                color="warning"
                style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
              />
            </Grid>
            <Grid item sm={4}>
              <AppWidgetSummary
                title={`Total ${coinName()}`}
                total={balance}
                color="error"
                style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
              />
            </Grid>
            <Grid item sm={4}>
              <AppWidgetSummary
                title="Total Assets "
                total={10}
                color="warning"
                style={{ boxShadow: "0px 1px 12px 2px #8888884f" }}
              />
            </Grid>
            <Grid item sm={12}>
              <UserTable users={usersData} />
            </Grid>
          </Grid>
        </div>
      </AdminLayout>
    </ThemeProvider>
  );
}

export default Dashboard;
