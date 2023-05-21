import React from 'react'
import "./Profil.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";

function Profil() {
  return (
    <div>
      <div id="H-navbar">
        <Navbar />
      </div>
      <div id="H-wrapper">
        <div id="H-sidebar">
          <Sidebar />
        </div>
        <div id="H-content">
            Hello Word

        </div>
        </div>
        </div>
  )
}

export default Profil
