import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const authenticated = sessionStorage.getItem("token");

  const handleLogout = () => {
    console.log("Logout");
    sessionStorage.clear("token");
    window.location.href = "/";
  };
  return (
    <div>
      <div className="sidebar-list">
        <div className="sidebar-container">
          <div className="sidebar">
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text">
                  <Link to="/">Home</Link>
                </div>
              </div>
            </div>
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text">
                  <Link to="/topic">Topics</Link>
                </div>
              </div>
            </div>
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text">
                  <Link to="/myprofil">My Profile</Link>
                </div>
              </div>
            </div>
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text" onClick={authenticated && handleLogout}>
                  <Link to="/login">Logout</Link>
                </div>
              </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
