import React, { useState, useEffect } from "react";
import './TopBar.css';
import { ApplicationProvider } from "../Context/ApplicationContext";
import TopBar from "../Layout/TopBar";

const TopBar2 = ({role, props}) => {
    
  useEffect(() => {
    // console.log('window.location.href',window.location.href);
    var url = window.location.href.split("/");
    var navLinks = document.getElementsByTagName("div")[0].getElementsByTagName("a");
    // console.log('url',url);
    // console.log('navLinks',navLinks);
    // console.log('document.links',document.links);
    var i=0;
    var currentPage = url[url.length - 1];
    // console.log('currentPage',currentPage);
      for(i;i<navLinks.length;i++){
        var lb = navLinks[i].href.split("/");
        // console.log('lb===>>>',lb);
        if(lb[lb.length-1] == currentPage) {
         navLinks[i].className = "current";
        }
      }
  }, []);

    return(
        <>
            {/* <Navbar role={role} /> */}

            <div className="w3-sidebar w3-bar-block w3-card" style={{ width: "200px", marginTop: "85px", borderRadius: "8px", backgroundColor: "#DDDDDD" }}>
            {/* <h3 className="w3-bar-item menu-title">Menu</h3> */}
              <a href="/dashboard" className="w3-bar-item w3-button">Dashboard</a>
              <div className="w3-dropdown-hover">
                <a href="/createWorkflow" className="w3-bar-item w3-sub-menu-link">
                  <button className="w3-sub-menu-button">{"Initiate Workflow "}
                    <i className="fa fa-caret-down"></i>
                  </button>
                </a>
                <div className="w3-dropdown-content w3-bar-block">
                  <a href="/category" className="w3-bar-item w3-button">Category</a>
                  <a href="/sub-category" className="w3-bar-item w3-button">Sub Category</a>
                  <a href="/product" className="w3-bar-item w3-button">Product</a>
                  <a href="/publishArt" className="w3-bar-item w3-button">Create Order Tokens</a>
                </div>
              </div>
              <div className="w3-dropdown-hover">
                <a className="w3-bar-item w3-sub-menu-link">
                  <button className="w3-sub-menu-button">{"Bulk Order Tokens "}
                    <i className="fa fa-caret-down"></i>
                  </button>
                </a>
                <div className="w3-dropdown-content w3-bar-block">
                  <a href="/publishBulkArt" className="w3-bar-item w3-button">Create Bulk Order Token</a>
                  <a href="/uploadBulkData" className="w3-bar-item w3-button">Upload Bulk Data</a>
                </div>
              </div>
              <a href="/tokens" className="w3-bar-item w3-button">Order Token Tables</a>
              <a href="/distributer" className="w3-bar-item w3-button">Distributers</a>
            </div>

            {/* <div style={{ marginLeft: "200px" }}> */}
            {/* <div> */}
            {/* <div className="w3-container w3-teal"> */}
                <div style={{ position: "fixed", width: "100%" }}>
                  {/* <h1>My Page</h1> */}
                  <TopBar role={role} />
                </div>
            {/* </div> */}
                <div className="w3-container" style={{ marginLeft: "200px" }}>
                <ApplicationProvider>{props.children}</ApplicationProvider>
                </div>
        </>
    );
};

export default TopBar2;