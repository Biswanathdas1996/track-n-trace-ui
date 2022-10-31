import React, { useState, useContext, useEffect, useMemo } from "react";
import { Button, Card, Grid } from "@mui/material";
import {
  Container,
//   Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import DistributerTable from "./DistributerTable";
import "../Styles/catFormFields.css";
// import { DistributerContext } from "../Context/DistributerContext";
import {
  getRequestLoggedIn,
} from "../functions/apiClient";
import AddDistributer from "./AddDistributer";
import { useToken } from "../Context/token";
import { SelectColumnFilter } from './filters';
import "bootstrap/dist/css/bootstrap.min.css"
import "./distributers.css"


export default function DistributerDetails() {
  const [distributerBool, setDistributerBool] = useState(false);
  const [token, setToken] = useToken();
  const [distributerList, setDistributerList] = useState([]);
//   const [selectedDistributers, setSelectedDistributers] = useState([]);
//   const [masterChecked, setMasterChecked] = useState(false);

useEffect(() => {
    const getDistributerList = async () => {
      const res = await getRequestLoggedIn("/distributerList");
      if (res?.status_code === "200") {
        const dList = res.distributerList.map((obj) => obj);
        setDistributerList(dList);
        setDistributerList((distributerList) => {
            return distributerList;
        });
      }
    }
    getDistributerList();
  }, [distributerBool]);

  const renderRowSubComponent = (row) => {
    const {
      user_fname,
      user_lname,
      user_email,
    //   picture,
      user_phone,
      state_name,
      zone
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        {/* <CardImg top src={picture.large} alt='Card image cap' /> */}
        <CardBody>
          <CardTitle>
            <strong>{`${user_fname} ${user_lname}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {user_phone} <br />
            <strong>Email</strong>: {user_email} <br />
            <strong>Location</strong>:{' '}
            {`${zone} ${state_name}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
      () => [
        // ===============for checkbox==========
        //   {
        //     Header: () => (
        //         <input
        //           type="checkbox"
        //           className="form-check-input"
        //           checked={masterChecked}
        //           id="mastercheck"
        //           onChange={(e) => onMasterCheck(e)}
        //         />
        //       ),
        //     id: 'mastercheck', // 'id' is required
        //     accessor:"id",
        //     Cell: ({ row }) => console.log('row',row) && (
        //       <input
        //         type="checkbox"
        //         className="form-check-input"
        //         checked={row.selected}
        //         id="rowcheck{row.id}"
        //         onChange={(e) => onItemCheck(e, row)}
        //       />
        //     ),
        //   },
          {
            Header: () => null,
            id: 'expander', // 'id' is required
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </span>
            ),
          },
          {
              Header: "First Name",
              accessor:"user_fname",
          },
          {
              Header: "Last Name",
              accessor:"user_lname",
          },
          {
              Header: "Email ID",
              accessor:"user_email",
              filter: 'equals',
          },
          {
              Header: "Phone No",
              accessor:"user_phone",
          },
          {
              Header: "State",
              accessor:"state_name",
              Filter: SelectColumnFilter,
              filter: 'equals'
          },
          {
              Header: "Zone",
              accessor:"zone",
              Filter: SelectColumnFilter,
              filter: 'equals'
          },
      ],
      []
    );

//   // Select/ UnSelect Table rows
//   const onMasterCheck = (e) => {
//     let tempList = distributerList;
//     // Check/ UnCheck All Items
//     tempList.map((dist) => (dist.selected = e.target.checked));

//     // update state
//     setMasterChecked(e.target.checked);
//     console.log('e.target.checked',e.target.checked);
//     setMasterChecked((masterChecked) => {
//         console.log('onMasterCheck masterChecked',masterChecked);
//         return masterChecked;
//     });
//     setDistributerList(tempList);
//     console.log('tempList',tempList);
//     setDistributerList((distributerList) => {
//         console.log('onMasterCheck distributerList',distributerList);
//         return distributerList;
//     });
//     setSelectedDistributers(tempList.filter((e) => e.selected));
//     console.log('tempList.filter((e) => e.selected)',tempList.filter((e) => e.selected));
//     setSelectedDistributers((selectedDistributers) => {
//         console.log('onMasterCheck selectedDistributers',selectedDistributers);
//         return selectedDistributers;
//     });
//   }

//   // To update single item's state and master checkbox state
//   const onItemCheck = (e, item) => {
//     let tempList = distributerList;
//     tempList.map((dist) => {
//         if(dist.id === item.id) {
//             dist.selected = e.target.checked;
//         }
//         return dist;
//     });

//     //To Control Master Checkbox State
//     const totalRows = distributerList.length;
//     const totalChecked = tempList.filter((e) => e.selected).length;
//     console.log('totalRows',totalRows);
//     console.log('totalChecked',totalChecked);

//     // to Update State
//     setMasterChecked(totalRows === totalChecked);
//     console.log('totalRows === totalChecked',totalRows === totalChecked);
//     setMasterChecked((masterChecked) => {
//         console.log('onItemCheck masterChecked',masterChecked);
//         return masterChecked;
//     });
//     setDistributerList(tempList);
//     console.log('tempList',tempList);
//     setDistributerList((distributerList) => {
//         console.log('onItemCheck distributerList',distributerList);
//         return distributerList;
//     });
//     setSelectedDistributers(tempList.filter((e) => e.selected));
//     console.log('tempList.filter((e) => e.selected)',tempList.filter((e) => e.selected));
//     setSelectedDistributers((selectedDistributers) => {
//         console.log('onItemCheck selectedDistributers',selectedDistributers);
//         return selectedDistributers;
//     });
//   }

//   // Event to get selected rows
//   const getSelectedRows = () => {
//     setSelectedDistributers(distributerList.filter((e) => e.selected));
//     console.log('distributerList.filter((e) => e.selected)',distributerList.filter((e) => e.selected));
//     setSelectedDistributers((selectedDistributers) => {
//         console.log('onItemCheck selectedDistributers',selectedDistributers);
//         return selectedDistributers;
//     });
//   }

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
            <AddDistributer setToken={setToken} setDistributerBool={setDistributerBool}/>
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
              <Container style={{ marginTop: 10, maxWidth: "120vw !important" }}>
                {distributerList.length > 0 && (
                  <DistributerTable
                    columns={columns}
                    data={distributerList} 
                    renderRowSubComponent={renderRowSubComponent}
                  />
                )}
              </Container>
              {/* <Button
                type="button"
                variant="contained"
                style={{ float: "left", padding: 8, borderRadius: 4, marginLeft: "38%", }}
                sx={{
                //   marginLeft: "30vw",
                  marginTop: "20px",
                  textTransform: "none",
                }}
                onClick={getSelectedRows}
              >
                Get Selected Items {selectedDistributers.length}
              </Button> */}
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
