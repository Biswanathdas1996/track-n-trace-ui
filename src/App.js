import React from "react";
import "./App.css";
import "./index.css";
import Routes from "./Routes";
import OfflineDetector from "./components/shared/OfflineDetector";
import "fontsource-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <>
      <OfflineDetector>
        <ScrollToTop />
        <CssBaseline />
        <Routes />
      </OfflineDetector>
    </>
  );
};

export default App;
