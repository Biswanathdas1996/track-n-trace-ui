import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import {
  Container,
} from "reactstrap";
import DistributerTable from "./DistributerTable";
import "../Styles/catFormFields.css";
import { getRequestLoggedIn } from "../functions/apiClient";
import AddDistributer from "./AddDistributer";
import { useToken } from "../Context/token";
import { SelectColumnFilter } from "../common/filters";
import "bootstrap/dist/css/bootstrap.min.css";
import "./distributers.css";
import { distributerList } from "../endpoint";

export default function DistributerDetails() {
  const [distributerBool, setDistributerBool] = useState(false);
  const [token, setToken] = useToken();
  const [distributerListArray, setDistributerList] = useState([]);

  useEffect(() => {
    const getDistributerList = async () => {
      const res = await getRequestLoggedIn(distributerList);
      if (res?.status_code === "200") {
        const dList = res.distributerList.map((obj) => obj);
        setDistributerList(dList);
        setDistributerList((distributerList) => {
          return distributerList;
        });
      }
    };
    getDistributerList();
  }, [distributerBool]);

  const dListArray = distributerListArray.map((dist) => ({ ...dist, action: dist }));
  const renderRowSubComponent = (row) => {
    const {
      user_fname,
      user_lname,
      user_email,
      user_phone,
      state_name,
      zone,
    } = row.original;
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item sm={3}>
          <Card style={{ width: "380px" }}>
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                padding: "15px",
                background: "#ebecf0",
                boxShadow: "8px 8px 4px #000000",
              }}
            >
              <Grid item sm={12}>
                <Typography variant="h5">
                  <strong>Associate Information </strong>
                </Typography>
              </Grid>
              <Grid item sx={{ paddingTop: "20px" }}>
                <Typography variant="h6">
                  <strong>Name : </strong>
                  {`${user_fname} ${user_lname}`}
                  <br />
                  <strong> Phone : </strong>
                  {user_phone} <br />
                  <strong>Email : </strong> {user_email}
                  <br />
                  <strong>State : </strong> {state_name}
                  <br />
                  <strong>Zone : </strong> {zone}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const columns = useMemo(
    () => [
      {
        // Header: () => null,
        // Header: "Expand Rows",
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            Expand Rows <br />
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
        ),
        width: "2vw",
        minWidth: "2vw",
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "First Name",
        accessor: "user_fname",
      },
      {
        Header: "Last Name",
        accessor: "user_lname",
      },
      {
        Header: "Email ID",
        accessor: "user_email",
        filter: "equals",
      },
      {
        Header: "Phone No",
        accessor: "user_phone",
      },
      {
        Header: "State",
        accessor: "state_name",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Zone",
        accessor: "zone",
        Filter: SelectColumnFilter,
        filter: "equals",
      },
    ],
    []
  );

  return (
    <div className="container distributorContainer">
      <Grid container spacing={2}>
        {distributerBool && (
          <Card
            sx={{
              boxShadow: 0,
              width: "120%",
              backgroundColor: "rgb(241 247 253)",
            }}
          >
            <AddDistributer
              setToken={setToken}
              setDistributerBool={setDistributerBool}
              distributerBool={distributerBool}
            />
          </Card>
        )}
        {!distributerBool && (
          <>
            <Grid item sm={8} sx={{ marginTop: "5px" }}>
              <h3 style={{ marginLeft: "10px" }}>Distributor Table</h3>
            </Grid>

            <Grid item sm={4}>
              <span className="input-group-btn">
                <Button type="button" variant="outlined" 
                  sx={{ marginRight: "20px", textTransform: "none", "&:hover": { backgroundColor: "#C52A1A !important", color: "#FFFFFF !important" } }} 
                  style={{ minWidth: "4vw", float: "right", padding: 8, borderRadius: 4 }} 
                  onClick={() => setDistributerBool(true)} 
                >
                  ADD NEW
                </Button>
              </span>
            </Grid>

            <Grid item sm={12}>
              <Container
                style={{ marginTop: 10, maxWidth: "120vw !important" }}
              >
                {dListArray.length > 0 && (
                  <DistributerTable
                    columns={columns}
                    data={dListArray}
                    renderRowSubComponent={renderRowSubComponent}
                  />
                )}
              </Container>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
