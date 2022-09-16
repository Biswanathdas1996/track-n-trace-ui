import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "../Styles/admin-styles.css";
import ThemeProvider from "../Theme/index";
import ProductTable from "./components/ProductTable";
import { getData } from "../functions/apiClient";

function Dashboard() {
  const [data, setData] = useState([]);

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
            {data && <ProductTable tokens={data} />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;
