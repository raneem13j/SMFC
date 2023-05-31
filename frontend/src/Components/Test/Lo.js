import React from 'react'
import "./Lo.css"
import { Link } from "react-router-dom";


function Lo() {
  const authenticated = sessionStorage.getItem("token");

  const handleLogout = () => {
    console.log("Logout");
    sessionStorage.clear("token");
    window.location.href = "/";
  };
  return (
    <div className='loSidebar'>
      <p className='loSidebarLogo'>CARDSY</p>
      <Link className='loSidebarLink' to="/home">Home</Link>
      <Link className='loSidebarLink' to="/topic">Topics</Link>
      <Link className='loSidebarLink' to="/myprofil">My Profile</Link>
      <Link className='loSidebarLink' onClick={authenticated && handleLogout} to="/">Logout</Link>
    </div>
  )
}

export default Lo
