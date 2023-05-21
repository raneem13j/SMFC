import React from 'react';
import "./navbar.css";
import logo from "../../Images/Screenshot from 2023-05-09 16-57-12.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function Navbar() {
  return (
    <div className="navbar">
     <div>
      <img src={logo} alt="#" className="navbar-logo" />
     </div>
     <div className="nav-searchbar">
        <input
          type="text"
          className='nav-input'
          // onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
        />
        <button className='search-logo1'>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="logo2" />
        </button>
      </div>
      {/* <div>
        <button className="nav-filter1">Filter</button>
      </div> */}
    </div>
  )
}

export default Navbar
