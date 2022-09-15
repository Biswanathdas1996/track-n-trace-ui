import React from "react";
import { Route, Routes } from "react-router-dom";
import PublishArt from "./Admin/PublishArt";
import PublishBulkArt from "./Admin/PublishBulkArt";
import Dashboard from "./Admin/Dashboard";
import Product from "./Admin/Product";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import AddTokenData from "./Admin/AddTokenData";
import Login from "./Admin/Login";
import CategoryDetails from "./AddCategory/Category-Details";
import AddSubCategory from "./AddSubCategory/Category-Details";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/user" element={<Dashboard />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Product />} />
        <Route exact path="/category" element={<CategoryDetails />} />
        <Route exact path="/sub-category" element={<AddSubCategory />} />
        <Route exact path="/publishArt" element={<PublishArt />} />
        <Route exact path="/publishBulkArt" element={<PublishBulkArt />} />
        <Route
          exact
          path="/add-tracking-data/:token"
          element={<AddTracking />}
        />
        <Route exact path="/transctions/:token" element={<Transction />} />
        <Route exact path="/add-token-data/:token" element={<AddTokenData />} />

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
