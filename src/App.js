import React from "react";
import "./App.css";
import "./index.css";
import Routes from "./Routes";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TopBar from "./Layout/TopBar";
import ScrollToTop from './components/ScrollToTop';

// import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
// import AdminLayout from "./Admin/Layout";

const App = () => {
  return (
    <>
      {/* <AdminLayout> */}
      <ScrollToTop />
      <CssBaseline />
      {/* <TopBar /> */}
      <Routes />
      {/* </AdminLayout> */}
      {/* <Footer /> */}
    </>
  );
};

export default App;
