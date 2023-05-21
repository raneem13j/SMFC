import React, { useEffect, useRef, useState } from "react";
import "./Deck.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useParams } from "react-router";


function Deck() {
  const deckId = useParams();
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);

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
        console.log(response.data)
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



