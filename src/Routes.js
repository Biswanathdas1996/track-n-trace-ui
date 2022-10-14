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
import { ProtectedRoute } from "./ProtectedRoutes";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route
          exact
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route exact path="/products" element={<ProductTable />} />
        <Route exact path="/category" element={<CategoryDetails />} />
        <Route exact path="/sub-category" element={<AddSubCategory />} />
        <Route exact path="/publishArt" element={<PublishArt />} />
        <Route exact path="/publishBulkArt" element={<PublishBulkArt />} />
        <Route exact path="/uploadBulkData" element={<UploadBulkData />} />
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
