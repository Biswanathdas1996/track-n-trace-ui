import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import ProductTable from "./components/ProductTable";
import { ApplicationContext } from "../Context/ApplicationContext";

function Dashboard() {
  const { tokenDetailsArray } = useContext(ApplicationContext);

  return (
    <ThemeProvider>
      <div className="container">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            {tokenDetailsArray && <ProductTable />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
