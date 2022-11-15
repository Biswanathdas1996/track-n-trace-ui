import React, { useState } from "react";
// import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { getAuthDataPost } from "../functions/apiClient";
import sampleCSV from "../sample/SampleFormat.csv";

const Mint = () => {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  let history = useNavigate();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    let fileData = e.target.files[0];
    setFile(fileData);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let csvOutput;
    if (file) {
      fileReader.onload = function (event) {
        csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    saveBulkData(array);
  };

  const saveBulkData = async (array) => {
    let metaData;

    for (let i = 0; i < array.length; i++) {
      metaData = {
        name: array[i].title,
        product: array[i].category,
        image: null,
        description: array[i].description,
        attributes: array[i].attributes,
      };

      await getAuthDataPost(
        `/initiate-token-info?token=${array[i].token}`,
        metaData
      );
    }
    // history("/dashboard");
  };

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `SampleFormat.csv`;
    link.href = sampleCSV;
    link.click();
  };

  const handleBack = () => {
    history("/dashboard");
  };

  //   const modalClose = () => {
  //     setStart(false);
  //     setResponse(null);
  //     history("/dashboard");
  //   };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <>
      {/* {start && <TransctionModal response={response} modalClose={modalClose} />} */}

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <div style={{ margin: 20 }}>
            <Card>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    style={{
                      padding: "20px",
                      background: "white",
                    }}
                  >
                    <h4>Upload Bulk Data</h4>
                    <form>
                      <input
                        type={"file"}
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={(e) => {
                          handleOnChange(e);
                        }}
                      />

                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                        onClick={(e) => {
                          handleOnSubmit(e);
                        }}
                        sx={{
                          marginRight: "20px",
                          textTransform: "none",
                        }}
                      >
                        IMPORT CSV
                      </Button>

                      <Button
                        onClick={onDownload}
                        variant="contained"
                        color="primary"
                        component="label"
                        sx={{
                          marginRight: "20px",
                          textTransform: "none",
                        }}
                      >
                        DOWNLOAD SAMPLE CSV
                      </Button>

                      <Button
                        onClick={handleBack}
                        variant="contained"
                        color="primary"
                        component="label"
                        sx={{
                          marginRight: "20px",
                          textTransform: "none",
                        }}
                      >
                        GO BACK
                      </Button>
                    </form>
                    <br />
                    <table>
                      <thead>
                        <tr key={"header"}>
                          {headerKeys.map((key) => (
                            <th>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {array.map((item) => (
                          <tr key={item.id}>
                            {Object.values(item).map((val) => (
                              <td>{val}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  );
};
export default Mint;
