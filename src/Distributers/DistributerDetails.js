import React, { useState, useContext, useEffect, useMemo } from "react";
import { Button, Card, Grid } from "@mui/material";
import {
  Container,
  //   Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
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

//   console.log('distributerListArray',distributerListArray);
//   console.log('dListArray',dListArray);

  const renderRowSubComponent = (row) => {
    const {
      user_fname,
      user_lname,
      user_email,
      //   picture,
      user_phone,
      state_name,
      zone,
    } = row.original;
    return (
      <Card style={{ width: "18rem", margin: "0 auto" }}>
        {/* <CardImg top src={picture.large} alt='Card image cap' /> */}
        <CardBody>
          <CardTitle>
            <strong>{`${user_fname} ${user_lname}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {user_phone} <br />
            <strong>Email</strong>: {user_email} <br />
            <strong>Location</strong>: {`${zone} ${state_name}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

//   const handleEdit = (row) => {
//     console.log('handleEdit row',row);
//   };

//   const handleViewTxn = (row) => {
//     console.log('handleViewTxn row',row);
//   };

//   const handleAddTxn = (row) => {
//     console.log('handleAddTxn row',row);
//   };

//   const handleView = (row) => {
//     console.log('handleView row',row);
//   };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
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
    //   {
    //     Header: "Action",
    //     accessor: "action",
    //     width: "22vw",
    //     minWidth: "285px",
    //     Cell: ({ value }) => (
    //     //   <>
    //       <Grid container spacing={2}>
    //         <Grid item sm={3}>
    //           <Button
    //             type="button"
    //             variant="contained"
    //             // style={{ float: "right", padding: 8, borderRadius: 4 }}
    //             style={{ width: "5vw", borderRadius: 4 }}
    //             sx={{
    //             //   marginRight: "20px",
    //               textTransform: "none",
    //             }}
    //             onClick={() => handleEdit(value)}
    //           >
    //             Edit
    //           </Button>
    //         </Grid>
    //         <Grid item sm={3}>
    //           <Button
    //             type="button"
    //             variant="contained"
    //             // style={{ float: "right", padding: 8, borderRadius: 4 }}
    //             style={{ width: "5vw", borderRadius: 4 }}
    //             sx={{
    //             //   marginRight: "20px",
    //               textTransform: "none",
    //             }}
    //             onClick={() => handleViewTxn(value)}
    //           >
    //             ViewTxn
    //           </Button>
    //         </Grid>
    //         <Grid item sm={3}>
    //           <Button
    //             type="button"
    //             variant="contained"
    //             // style={{ float: "right", padding: 8, borderRadius: 4 }}
    //             style={{ width: "5vw", borderRadius: 4 }}
    //             sx={{
    //             //   marginRight: "20px",
    //               textTransform: "none",
    //             }}
    //             onClick={() => handleAddTxn(value)}
    //           >
    //             AddTxn
    //           </Button>
    //         </Grid>
    //         <Grid item sm={3}>
    //           <Button
    //             type="button"
    //             variant="contained"
    //             // style={{ float: "right", padding: 8, borderRadius: 4 }}
    //             style={{ width: "5vw", borderRadius: 4 }}
    //             sx={{
    //             //   marginRight: "20px",
    //               textTransform: "none",
    //             }}
    //             onClick={() => handleView(value)}
    //           >
    //             View
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     // </>
    //     )
    //   }
    ],
    []
  );

  return (
    <div className="container">
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
            />
          </Card>
        )}
        {!distributerBool && (
          <>
            <Grid item sm={12}>
              <Button
                type="button"
                variant="contained"
                style={{ float: "right", padding: 8, borderRadius: 4 }}
                sx={{
                  marginRight: "20px",
                  textTransform: "none",
                }}
                onClick={() => setDistributerBool(true)}
              >
                Add New
              </Button>
            </Grid>

            <Grid item sm={12}>
              <Container
                style={{ marginTop: 10, maxWidth: "120vw !important", overflow: "scroll" }}
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
