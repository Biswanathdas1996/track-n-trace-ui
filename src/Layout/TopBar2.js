import React from "react";
import './TopBar.css';
import { ApplicationProvider } from "../Context/ApplicationContext";
import TopBar from "../Layout/TopBar";
import { NavLink } from "react-router-dom";

import BulkMenuIcon from "../trkNdTrcIcons/BulkMenuIcon.png";
import DashMenuIcon from "../trkNdTrcIcons/DashMenuIcon.png";
import DistMenuIcon from "../trkNdTrcIcons/DistMenuIcon.png";
import TableMenuIcon from "../trkNdTrcIcons/TableMenuIcon.png";
import FlowMenuIcon from "../trkNdTrcIcons/FlowMenuIcon.png";
import BackImg from "../trkNdTrcIcons/BackImg.png";

const TopBar2 = ({role, props}) => {

  let current = "current";
  let currentDD = "currentDD";
  let general = "w3-bar-item w3-button";
  let generalDD = "w3-bar-item w3-sub-menu-link";
  console.log('role',role);

    return(
        <>
            <div className="w3-sidebar w3-bar-block w3-card" style={{ width: "200px", marginTop: "85px", borderRadius: "8px", backgroundColor: "#DDDDDD" }}>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? current : general} >
              <img src={DashMenuIcon} style={{ width: "15px", marginBottom: "5px", marginRight: "5px"}} />Dashboard
              </NavLink>
              {(role === 1) && (<div className="w3-dropdown-hover">
                <NavLink to="/createWorkflow" className={({ isActive }) => isActive ? currentDD : generalDD} end>
                  <button className="w3-sub-menu-button"><img src={FlowMenuIcon} style={{ width: "15px", marginBottom: "5px", marginRight: "5px"}} />{"Initiate Workflow "}
                    <i className="fa fa-caret-down"></i>
                  </button>
                </NavLink>
                  <div className="w3-dropdown-content w3-bar-block">
                  <NavLink to="/category" className={({ isActive }) => isActive ? current : general} >
                    Category
                  </NavLink>
                  <NavLink to="/sub-category" className={({ isActive }) => isActive ? current : general} >
                    Sub Category
                  </NavLink>
                  <NavLink to="/product" className={({ isActive }) => isActive ? current : general} >
                    Product
                  </NavLink>
                  <NavLink to="/publishArt" className={({ isActive }) => isActive ? current : general} >
                    Create Order Tokens
                  </NavLink>
                </div>
              </div>)}
              {(role === 1) && (<div className="w3-dropdown-hover">
                <a className="w3-bar-item w3-sub-menu-link">
                  <button className="w3-sub-menu-button"><img src={BulkMenuIcon} style={{ width: "15px", marginBottom: "5px", marginRight: "5px"}} />{"Bulk Order Tokens "}
                    <i className="fa fa-caret-down"></i>
                  </button>
                </a>
                <div className="w3-dropdown-content w3-bar-block">
                  <NavLink to="/publishBulkArt" className={({ isActive }) => isActive ? current : general} >
                    Create Bulk Order Token
                  </NavLink>
                  <NavLink to="/uploadBulkData" className={({ isActive }) => isActive ? current : general} >
                    Upload Bulk Data
                  </NavLink>
                </div>
              </div>)}
              <NavLink to="/tokens" className={({ isActive }) => isActive ? current : general} >
                <img src={TableMenuIcon} style={{ width: "15px", marginBottom: "5px", marginRight: "5px"}} />Order Token Tables
              </NavLink>
              <NavLink to="/distributer" className={({ isActive }) => isActive ? current : general} >
                <img src={DistMenuIcon} style={{ width: "16px", marginBottom: "2px", marginRight: "4px"}} />Distributors
              </NavLink>
            </div>

            <div style={{ position: "fixed", width: "100%" }}>
              <TopBar role={role} />
            </div>

            <div className="w3-container" style={{ marginLeft: "200px", height: "86vh",
              backgroundColor: "#F3F3F3",
              backgroundImage: `url(${BackImg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPositionX: "41vw", backgroundPositionY: "1vh"
            }}>
              <ApplicationProvider>{props.children}</ApplicationProvider>
            </div>
        </>
    );
};

export default TopBar2;