import React from "react";
import { Route, Routes } from "react-router-dom";
import PublishArt from "./Admin/PublishArt";
import PublishBulkArt from "./Admin/PublishBulkArt";
import UploadBulkData from "./Admin/UploadBulkData";
// import Dashboard from "./Admin/Dashboard";
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
        {/* <Route
          exact
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route exact path="/" element={<Login />} />
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
        <Route
          exact
          path="/products"
          element={
            <ProtectedRoute>
              <ProductTable />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/category"
          element={
            <ProtectedRoute>
              <CategoryDetails />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/sub-category"
          element={
            <ProtectedRoute>
              <AddSubCategory />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/publishArt"
          element={
            <ProtectedRoute>
              <PublishArt />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/publishBulkArt"
          element={
            <ProtectedRoute>
              <PublishBulkArt />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/uploadBulkData"
          element={
            <ProtectedRoute>
              <UploadBulkData />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-tracking-data/:token"
          element={
            <ProtectedRoute>
              <AddTracking />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/transctions/:token"
          element={
            <ProtectedRoute>
              <Transction />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-token-data/:token"
          element={
            <ProtectedRoute>
              <AddTokenData />{" "}
            </ProtectedRoute>
          }
        />

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
