import React, { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../Images/Screenshot from 2023-05-09 16-57-12.png";
import search from "./icons8-search-50.png"
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";

const Input = styled("input")(({ theme }) => ({
  height: 40,
  width: 700,
  outline: "none",
  color: "#2c6487",
  backgroundColor: "rgb(240, 240, 240)",
  border: "none",
  borderRadius: 50,
  paddingLeft: 30,
  fontSize: 18,
  marginTop: 12,
  marginLeft: 750,
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 660,
  color: "#2c6487",
  borderRadius: "0 0 15px 15px",
  marginLeft: 775,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  boxShadow: "8px 8px 20px rgb(128, 128, 128)",
  overflow: "auto",
  maxHeight: 250,
  // border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#2c6487",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#f4b31a",
    color: "white",
  },
}));

function Navbar() {
  // const userId = sessionStorage.getItem("Id");
  const [decks, setDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/deck`);
        setDecks(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    searchDecks();
  }, [searchTerm]); // Trigger searchDecks() whenever searchTerm changes

  function searchDecks() {
    const filteredDecks = decks.filter((deck) =>
      deck.name.includes(searchTerm)
    );
    setSearchResults(filteredDecks);
  }

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: decks,
    getOptionLabel: (option) => option.name,
  });

  return (
    <div className="navbar">
      <div>
        <img src={logo} alt="#" className="navbar-logo" />
      </div>
      <div>
        <div {...getRootProps()}>
          <Input
            {...getInputProps({
              onChange: (event) => setSearchTerm(event.target.value),
            })}
            placeholder="Search posts..."
          />
         
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <Link className="cardLink" to={`/deck/${option._id}`}>
                <li {...getOptionProps({ option, index })}>{option.name}</li>
              </Link>
            ))}
          </Listbox>
        ) : null}
      </div>
      <div>
        <img src={search} alt="#" className="search-logo1" />
      </div>
      
    </div>
  );
}

export default Navbar;
