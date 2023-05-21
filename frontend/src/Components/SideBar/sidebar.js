import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
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
                  <Link to="/notifi">Notifications</Link>
                </div>
              </div>
            </div>
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text">
                  <Link to="/profil">My Profil</Link>
                </div>
              </div>
            </div>
            <div className="dashboard_main">
              <div className="dashboard">
                <div className="text">
                  <Link to="/logout">Logout</Link>
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
