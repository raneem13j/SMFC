import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Post.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";

function Post() {
  const userId = sessionStorage.getItem("Id");
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [cardCount, setCardCount] = useState("");
  const [topicId, setTopicId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/topic");
        setTopics(response.data);
     // console.log("decks", response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/category");
        setCategories(response.data);
        // console.log("decks", response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/subcategory");
        setSubcategories(response.data);
      // console.log("decks", response.data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    // Create deck
    const deckData = {
      name: formData.get("name"),
      level: formData.get("level"),
      card_count: formData.get("card_count"),
      // user_id: userId,
      topic_id: formData.get("topic_id"),
      category_id: formData.get("category_id"),
      subcategory_id: formData.get("subcategory_id"),
    };
    const deckResponse = await axios.post(`http://localhost:5000/deck/${userId}`, deckData);
    const deckId = deckResponse.data._id;

    // Create cards
    const cards = [];
    for (let i = 1; i <= deckData.card_count; i++) {
      const cardData = {
        deck_id: deckId,
        front: formData.get(`front${i}`),
        back: formData.get(`back${i}`),
      };
      const cardResponse = await axios.post("http://localhost:5000/card", cardData);
      cards.push(cardResponse.data);
      console.log("Card created:", cardResponse.data);
    }

    console.log("Deck created:", deckResponse.data);
  };
 

  return (
    <div>
      <div id="H-navbar">
        <Navbar />
      </div>
      <div id="H-wrapper">
        <div id="H-sidebar">
          <Sidebar />
        </div>
        <div id="H-content3">
          <div className="deckIfno">
            <div className="deck-info-first">
              <p className="userdet1">Title:</p>
              <input className="deckInput" name="name"
              placeholder="The title for your deck"
              value={name}
              onChange={(e) => setName(e.target.value)}
   />
              <p className="userdet1">level:</p>
              <input className="deckInput" name="level"
              placeholder="The level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
  />
              <p className="userdet1">Cards count:</p>
              <input className="deckInput" name="card_count"
              placeholder="How many cards?"
              value={cardCount}
              onChange={(e) => setCardCount(e.target.value)}
   />
              <div>
                <button className="userButton" onClick={handleSubmit}>Create</button>
              </div>
            </div>
            <div className="deck-info-second">
              <div className="username">
                <label className="userdet1">Topic:</label> <br />
                <select id="category" name="topic_id"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)} 
                 >
                  
                  <option value="">Select a topic...</option>
                  {topics.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.topic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="userdet1">Category:</label> <br />
                <select id="category" name="category_id" 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)} 
                >
                  <option value="">Select a category...</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="username">
                <label className="userdet1">Subcategory:</label> <br />
                <select id="category" name="subcategory_id" 
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)} 
               >
                  <option value="">Select a subcategory...</option>
                  {subcategories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.subcategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <hr />
          <div className="deck-info-third">
            <div className="cardsInput-section">
              <textarea  autoComplete="off"
                        type="text"
                        className="cardTextL"
                        placeholder="Front..."
                        name="front"
                        value={front}
                onChange={(e) => setFront(e.target.value)} 
                       
                        />

              <textarea  autoComplete="off"
                        type="text"
                        className="cardTextR"
                        placeholder="Back..."
                        name="back" 
                        value={back}
                onChange={(e) => setBack(e.target.value)}   
                       />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
