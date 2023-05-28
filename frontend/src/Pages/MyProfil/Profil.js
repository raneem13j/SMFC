import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profil.css";
import Navbar from "../../Components/NavBar/navbar";
import Sidebar from "../../Components/SideBar/sidebar";
import { Link } from "react-router-dom";
import PopupProfil from "./PopupProfil";
import PopupEdit from "./PopupEdit";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Profil() {
  const userId = sessionStorage.getItem("Id");
  const [decks, setDecks] = useState([]);
  const [user, setUser] = useState([]);
  const [vote, setVote] = useState([]);
  const [deleteDeck, setDeleteDeck] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupF, setPopupF] = useState(false);
  const [popupT, setPopupT] = useState(false);
  const [popupE, setPopupE] = useState(false);
  const [followedTopics, setFollowedTopics] = useState([]);
  const [unfollowTopic, setUnFollowTopic] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [unfollowUser, setUnFollowUser] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ saveMode , setSaveMode] = useState(false);
  const [ postMode , setPostMode] = useState(true);
  const [ saved , setSaved] = useState([]);

  //fetching decks by user id
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/deck/byuser/${userId}`
        );
        setDecks(response.data);
        console.log("decks",response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [vote, deleteDeck]);

  //fetch user how is loged in
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userId}`
        );
        setUser(response.data);
        // console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // make up vote on deck
  const handleThumbUpClick = async (e, deckId, voteType) => {
    e.preventDefault();
    // console.log(userId);
    // console.log(deckId);
    // console.log(voteType);

    if (voteType === "down" && voteType !== "up") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userId}`,
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
          `http://localhost:5000/vote/${userId}`,
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
    } else if (voteType === "up") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
     if(saveMode === true){
      handleListSaved();
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
          `http://localhost:5000/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/vote/${userId}`,
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
          `http://localhost:5000/vote/${userId}`,
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
    } else if (voteType === "down") {
      try {
        const response = await axios.delete(
          `http://localhost:5000/vote/${userId}/${deckId}`
        );
        setVote("sucssful", response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if(saveMode === true){
      handleListSaved();
     }
  };

  //delete deck
  const handleDeleteDeck = async (e, deckId) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/deck/${deckId}`
      );
      setDeleteDeck("sucssful", response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch the topics that the user followed already
  const fetchFollowedTopics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/topicfollower/${userId}`
      );
      setFollowedTopics(response.data);

      // console.log("jjj", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTopicClick = () => {
    setPopupT(true);
    fetchFollowedTopics();
  };

  useEffect(() => {
    fetchFollowedTopics();
  }, [unfollowTopic]);

  //unfollow a topic
  const handleUnFollowTopic = async (e, topicId) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/topicfollower/unfollow/${userId}`,
        {
          topic_id: topicId,
        }
      );
      setUnFollowTopic("sucssful", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //fetch the followers to the loged user

  const handleFollowersClick = () => {
    setPopup(true);
    fetchFollowers();
  };
 const fetchFollowers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/userfollower/followers/${userId}`
      );
      setFollowers(response.data);

      // console.log("jjj", response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFollowers();
  }, []);
 

  // fetch the following

  const handleFollowingClick = () => {
    setPopupF(true);
    fetchFollowing();
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/userfollower/following/${userId}`
      );
      setFollowing(response.data);

      // console.log("jjj", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [unfollowUser]);

  // un follow user

  const handleUnFollowUser = async (e, user_id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/userfollower/unfollow/${user_id}`,
        {
          follower: userId,
        }
      );
      setUnFollowUser("sucssful", response.data);

      // console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // edit loged in user info

  const handelEditProfil = async(e) =>{
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/user/edit/${userId}`,
        {
          username: username,
          email: email,
          password: password
        }
      );
      setUser("sucssful", response.data);
      setPopupE(false);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/user/${userId}`
      );
      setUser(response.data);
      // console.log("decks", response.data);
    } catch (error) {
      console.log(error);
    }

  }

  const handleListSaved = async()=>{
       setSaveMode(true);
       setPostMode(false);
       try {
        const response = await axios.get(
          `http://localhost:5000/saved/list/${userId}`
        );
        setSaved(response.data);
        console.log("decks", response.data);
      } catch (error) {
        console.log(error);
      }
  }

  const handleListPost = async()=>{
     setSaveMode(false);
     setPostMode(true);

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
        <div id="H-content3">
          <div className="userProfil">
            <div>
              <p className="userdet">{user.username}</p>
              <p className="userdet">{user.email}</p>
              <div className="infoProfil">
                <div className="btn1">
                  <button className="userButton" onClick={handleFollowersClick}>
                    Followers
                  </button>
                  <PopupProfil trigger={popup} setTrigger={setPopup}>
                    <div className="followPopup1">
                      {/* <h3>Followers</h3> */}
                      {followers.map((item, i) => (
                        <Link
                          to={`/profil/${item.follower.username}`}
                          className="followPopup2"
                          key={i}
                        >
                          <h3>{item.follower.username}</h3>
                        </Link>
                      ))}
                    </div>
                  </PopupProfil>

                  <button className="userButton" onClick={handleFollowingClick}>
                    Following
                  </button>
                  <PopupProfil trigger={popupF} setTrigger={setPopupF}>
                    <div className="followPopup1">
                      {/* <h3>Followers</h3> */}
                      {following.map((item, i) => (
                        <div className="followPopup2" key={i}>
                          <h3>{item.following.username}</h3>
                          <button
                            className="userButtonPop"
                            onClick={(e) =>
                              handleUnFollowUser(e, item.following._id)
                            }
                          >
                            Unfollow
                          </button>
                        </div>
                      ))}
                    </div>
                  </PopupProfil>
                  <button className="userButton" onClick={handleTopicClick}>
                    Followed Topics
                  </button>
                  <PopupProfil trigger={popupT} setTrigger={setPopupT}>
                    <div className="followPopup1">
                      {/* <h3>Followers</h3> */}
                      {followedTopics.map((item, i) => (
                        <div className="followPopup2" key={i}>
                          <h3 key={i}>{item.topic_id.topic}</h3>
                          <button
                            className="userButtonPop"
                            onClick={(e) =>
                              handleUnFollowTopic(e, item.topic_id._id)
                            }
                          >
                            Unfollow
                          </button>
                        </div>
                      ))}
                    </div>
                  </PopupProfil>
                </div>
                <div className="btn2">
                  <Link className="cardLink" to={`/post/${userId}?edit=false`} >
                  <button className="userButton">Add Post</button>
                  </Link>
                  <button
                    className="userButton"
                    onClick={() => setPopupE(true)}
                  >
                    Edit profile
                  </button>
                  <PopupEdit trigger={popupE} setTrigger={setPopupE}>
                    <form onSubmit={handelEditProfil} className="login-signup-box">
                      <label className="formLabel">Username</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="login-name ele"
                        placeholder="Enter your username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label className="formLabel">Email</label>
                      <input
                        autoComplete="off"
                        type="email"
                        className="login-email ele"
                        placeholder="youremail@email.com"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="formLabel">Paswword</label>
                      <input
                        autoComplete="off"
                        type="password"
                        className="login-password ele"
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button className="userButtonPop1">Edit profile</button>
                    </form>
                  </PopupEdit>

                  {/* <button className="userButton">Delete Account</button> */}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="infoProfil1">
            <button className="userButton" onClick={handleListPost}>Posts</button>
            <button className="userButton" onClick={handleListSaved}>Saved</button>
          </div>
          {postMode && (
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
                    <Typography
                      style={{ color: "#2c6487" }}
                      variant="h5"
                      component="div"
                      key={deck.id}
                    >
                      {deck.name}
                    </Typography>
                    <Typography variant="body2">{deck.level}</Typography>
                    <Typography variant="body2">
                      {deck.user_id !== undefined
                        ? deck.user_id.username
                        : null}
                    </Typography>
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
                      onClick={(e) =>
                        handleThumbUpClick(e, deck._id, deck.voteType)
                      }
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
                      onClick={(e) =>
                        handleThumbDownClick(e, deck._id, deck.voteType)
                      }
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
                    <IconButton onClick={(e) => handleDeleteDeck(e, deck._id)}>
                      <DeleteIcon className="delete-icon" />
                    </IconButton>
                    <IconButton style={{ marginLeft: "70px" }}>
                        <Link className="cardLink" to={`/post/${deck._id}?edit=true`}>
                            <EditIcon style={{ color: "#2c6487"}}/>
                          </Link>
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </div>
          )}
          {saveMode && (
          <div className="posts-section2">
            {saved.map((deck) => (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Profil;
