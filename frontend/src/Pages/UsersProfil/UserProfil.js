import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./UserProfil.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function UserProfil() {
  const userID = sessionStorage.getItem("Id");

  const userName = useParams();
  // console.log("ee", userName.Id);
  const [user, setUser] = useState({});
  const [userId ,setUserId] = useState({});
  const [decks, setDecks] = useState([]);
  const [vote, setVote] = useState([]);
  const [isFollowing , setIsFollowing] = useState("");
  const [unFollow, setUnFollow] = useState([]);
  const [follow, setFollow] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/user/user/${userName.Id}`);
        setUser(response.data);
        const fetchedUserId = response.data._id;
        setUserId(fetchedUserId);
  
        const deckResponse = await axios.get(`http://localhost:5000/deck/byuser1/${fetchedUserId}?user_id=${userID}`);
        setDecks(deckResponse.data);

        // console.log(deckResponse.data)
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [vote]);

  // make up vote on deck
  const handleThumbUpClick = async (e, deckId, voteType) => {
    e.preventDefault();
    // console.log(userId);
    // console.log(deckId);
    // console.log(voteType);

    if (voteType === "down" && voteType !== "up") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userID}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userID}`,
          {
            deck_id: deckId,
            voteType: "up",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType !== "up" && voteType !== "down") {
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userID}`,
          {
            deck_id: deckId,
            voteType: "up",
          }
        );
        setVote("sucssful", response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType === "up") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userID}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // make down vote on deck
  const handleThumbDownClick = async (e, deckId, voteType) => {
    e.preventDefault();
    // console.log(userId);
    // console.log(deckId);
    // console.log(voteType);

    if (voteType === "up" && voteType !== "down") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userID}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userID}`,
          {
            deck_id: deckId,
            voteType: "down",
          }
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType !== "down" && voteType !== "up") {
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userID}`,
          {
            deck_id: deckId,
            voteType: "down"
          }
        );
        setVote("sucssful", response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (voteType === "down") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userID}/${deckId}`
        );
        setVote("sucssful", response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // follow unfollow functionalty 

  const fetchFollowers = async () => {
    console.log(userId);
    try {
      const response = await axios.get(
        `http://localhost:5000/userfollower/following/${userID}`
      );
      const followers = response.data;
       setIsFollowing(response.data.some((follower) => follower.following._id === userId));
  
      // console.log("Followers:", followers);
      console.log("dd",isFollowing)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, [follow, unFollow, userId]);
  
  const handleFollow = async ()=>{
    console.log("me");
    
    try {
      const response = await axios.post(
        `http://localhost:5000/userfollower/follow/${userId}`,
        {
          follower: userID,
        }
      );
      setFollow("sucssful", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleUnFollow = async ()=>{
   
    try {
      const response = await axios.post(
        `http://localhost:5000/userfollower/unfollow/${userId}`,
        {
          follower: userID,
        }
      );
      setUnFollow("sucssful", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFollowState = async (e) =>{
    
    e.preventDefault();
     if(isFollowing === true){
       
      handleUnFollow();
     

     }else if(isFollowing === false){
    
      handleFollow();
       
     }
  }

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
          <div className="userProfil3">
            <p className="userdet4">{user.username}</p>
            <button className="userButton" onClick={(e) =>handleFollowState(e)}>{isFollowing ? 'Following' : 'Follow'}</button>
            
          </div>
          <hr className="topicHr" />
          <div>
            <p className="userdet5">Posts</p>
            <div>
            <div className="posts-section2">
            {decks.map((deck) => (
              <div className="card-section" key={deck.id}>
                 <Card
                       key={deck.id}
                        sx={{
                          minWidth: 275,
                          width: 400,
                          height: 175,
                          boxShadow: "8px 8px 8px rgb(150, 150, 150)",
                        }}
                      >
                        <CardContent key={deck.id}>
                          <Typography style={{ color: "#2c6487" }} variant="h5" component="div" key={deck.id}>
                            {deck.name}
                          </Typography>
                          <Typography variant="body2">{deck.level}</Typography>
                          <Link className="cardLink" to={`/profil/${deck.user_id !== undefined ? deck.user_id.username : null}`}>
                          <Typography variant="body2" >
                             {deck.user_id !== undefined ? deck.user_id.username : null}
                          </Typography>
                          </Link>
                          <Typography variant="body2">
                            {deck.card_count} Cards
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link className="cardLink" to={`/deck/${deck._id}`}>
                            <Button size="small">Test your self</Button>
                          </Link>
                          <IconButton
                            aria-label="like"
                            onClick={(e) => handleThumbUpClick(e, deck._id, deck.voteType)}
                          >
                            <ThumbUpIcon
                              style={{
                                color:
                                  deck.voteType === "up"
                                    ? "#f4b31a"
                                    : deck.voteType === "down"
                                    ? "#2c6487"
                                    : "rgb(44, 100, 135)",
                              }}
                            />
                          </IconButton>
                          <IconButton
                            aria-label="like"
                            onClick={(e) => handleThumbDownClick(e, deck._id, deck.voteType)}
                          >
                            <ThumbDownIcon
                              style={{
                                color:
                                  deck.voteType === "down"
                                    ? "#f4b31a"
                                    : deck.voteType === "up"
                                    ? "#2c6487"
                                    : "rgb(44, 100, 135)",
                              }}
                            />
                          </IconButton>
                        </CardActions>
                      </Card>
              </div>
            ))}
          </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;
