import React, { useEffect, useRef, useState } from "react";
import "./Deck.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


function Deck() {
  const userId = sessionStorage.getItem("Id");
  const deckId = useParams();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [save ,setSave] = useState([]);
  const [saved , setSaved] =useState([]);
  const [showBookmarkBorder, setShowBookmarkBorder] = useState(true);
  const [showBookmark, setShowBookmark] = useState(false);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "70px",
    slidesToShow: 1,
    speed: 500,
    dots: false,
    afterChange: () => setUpdateCount((prevCount) => prevCount + 1),
    beforeChange: (current, next) => setSlideIndex(next),
  };

  useEffect(() => {
    const cardMains = document.querySelectorAll(".card-main");

    const handleClick = (event) => {
      event.currentTarget.classList.toggle("flipped");
    };

    cardMains.forEach((cardMain) => {
      cardMain.addEventListener("click", handleClick);
    });

    cardMains.forEach((cardMain) => {
      cardMain.addEventListener("keypress", handleClick);
    });

    return () => {
      cardMains.forEach((cardMain) => {
        cardMain.removeEventListener("click", handleClick);
      });
      cardMains.forEach((cardMain) => {
        cardMain.removeEventListener("keypress", handleClick);
      });
    };
  }, [cards]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/card/list/${deckId.deckId}`);
        setCards(response.data);
        setCardCount(response.data.length);
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSliderChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setSlideIndex(newIndex);
    sliderRef.current.slickGoTo(newIndex);
  };

  const sliderRef = useRef(null);
   

 const handelSavePost = async (e)=>{
  // console.log(userId);
  // console.log(deckId.deckId);
  e.preventDefault();

  try {
    const response = await axios.post(
      `http://localhost:5000/saved/save/${userId}`,
      {
        deck_id: deckId.deckId,
    
      }
    );
    setSave("sucssful", response.data);

    setShowBookmark((current) => !current);
    setShowBookmarkBorder((current) => !current);

    // console.log(response.data);

 } catch (error) {
  console.error(error);
}}


const handelUnSavePost = async (e)=>{
  // console.log(userId);
  // console.log(deckId.deckId);
  e.preventDefault();

  try {
    const response = await axios.post(
      `http://localhost:5000/saved/unsave/${userId}`,
      {
        deck_id: deckId.deckId,
    
      }
    );
    setSave("sucssful", response.data);
    setShowBookmark((current) => !current);
    setShowBookmarkBorder((current) => !current);

    // console.log(response.data);

 } catch (error) {
  console.error(error);
}}

useEffect(() => {

  async function fetchData() {
    // console.log(userId);
    // console.log(deckId.deckId);

    try {
      const response = await axios.get(`http://localhost:5000/saved/list/${userId}`);
      setSaved(response.data);
      // console.log(response.data);

        // Check if the saved item exists with the specified userId and deckId
    const isItemSaved = saved.some(item => item.user_id === userId && item.deck_id._id === deckId.deckId);
    console.log(saved)
    console.log(isItemSaved)
    setShowBookmarkBorder(!isItemSaved);
    setShowBookmark(isItemSaved);

    } catch (error) {
      console.log(error);
    }
  }
  fetchData();
}, []);





  return (
    <div>
      <div id="H-navbar">
        <Navbar />
      </div>
      <div id="H-wrapper">
        <div id="H-sidebar">
          <Sidebar />
        </div>
        <div id="H-content2">
          <div><BookmarkBorderIcon style={{ color: "#2c6487", width: "2.5rem", height: "2.5rem", display: showBookmarkBorder ? "block" : "none" }} onClick={(e) => handelSavePost(e)}/>
          <BookmarkIcon style={{ color: "#f4b31a", width: "2.5rem", height: "2.5rem", display: showBookmark ? "block" : "none" }} onClick={(e) => handelUnSavePost(e)} />
          </div>
          <div className="slik">
            <Slider ref={sliderRef}  {...settings}>
              {cards.map((card, index) => (
                <div className="card-section" key={index}>
                  <div className="card-main">
                    <div className="card-front">
                      <p>{card.front}</p>
                    </div>
                    <div className="card-back">
                      <p className="flipped-text">{card.back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <input
          style={{
            width: '850px',
            height: '10px',
            appearance: 'none',
            outline: 'none',
            borderRadius: '5px',
            background: '#f4b31a'
          }}
            className="progres-bar"
            onChange={handleSliderChange}
            value={slideIndex}
            type="range"
            min={0}
            max={cardCount - 1}
          />
          <div className="card-count">{slideIndex + 1}/{cardCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Deck;



