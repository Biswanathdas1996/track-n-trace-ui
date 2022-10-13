import React from "react";
import { Route, Routes } from "react-router-dom";
import PublishArt from "./Admin/PublishArt";
import PublishBulkArt from "./Admin/PublishBulkArt";
import UploadBulkData from "./Admin/UploadBulkData";
import Dashboard from "./Admin/Dashboard";
import Product from "./Admin/Product";
import ProductTable from "./Admin/ProductData";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import AddTokenData from "./Admin/AddTokenData";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import CategoryDetails from "./AddCategory/Category-Details";
import AddSubCategory from "./AddSubCategory/Category-Details";
import TopBar from "./Layout/TopBar";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<><Login /></>} />
        <Route exact path="/user" element={<><TopBar /><Dashboard /></>} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<><TopBar /><Product /></>} />
        <Route exact path="/products" element={<><TopBar /><ProductTable /></>} />
        <Route exact path="/category" element={<><TopBar /><CategoryDetails /></>} />
        <Route exact path="/sub-category" element={<><TopBar /><AddSubCategory /></>} />
        <Route exact path="/publishArt" element={<><TopBar /><PublishArt /></>} />
        <Route exact path="/publishBulkArt" element={<><TopBar /><PublishBulkArt /></>} />
        <Route exact path="/uploadBulkData" element={<><TopBar /><UploadBulkData /></>} />
        <Route exact path="/add-tracking-data/:token" element={<><TopBar /><AddTracking /></>} />
        <Route exact path="/transctions/:token" element={<><TopBar /><Transction /></>} />
        <Route exact path="/add-token-data/:token" element={<><TopBar /><AddTokenData /></>} />
        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Routes>
    );
  }
}

export default Routing;
