import React from "react";
import { Route, Routes } from "react-router-dom";

import PublishArt from "./Admin/PublishArt";
import PublishBulkArt from "./Admin/PublishBulkArt";

import Dashboard from "./Admin/Dashboard";
import Product from "./Admin/Product";
import AddTracking from "./Admin/AddTracking";
import Transction from "./Admin/Transction";
import CategoryDetails from "./AddCategory/Category-Details";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/user" element={<Dashboard />} />
        <Route exact path="/" element={<Product />} />
        <Route exact path="/category" element={<CategoryDetails />} />
        <Route exact path="/publishArt" element={<PublishArt />} />
        <Route exact path="/publishBulkArt" element={<PublishBulkArt />} />
        <Route
          exact
          path="/add-tracking-data/:token"
          element={<AddTracking />}
        />
        <Route exact path="/transctions/:token" element={<Transction />} />

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
