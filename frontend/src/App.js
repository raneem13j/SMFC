import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Notfound from "./Pages/Not Found/notfound";
import Deck from "./Pages/Deck/Deck";
import Profil from "./Pages/MyProfil/Profil";
import UserProfil from "./Pages/UsersProfil/UserProfil";
import Post from "./Pages/MakePost/Post";

function App() {
  return (
    <>
     <BrowserRouter>
        <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/deck/:deckId" element={<Deck />} />
                <Route path="/login" element={<Login />} />
                <Route path="/myprofil" element={<Profil />} />
                <Route path="/profil/:Id" element={<UserProfil />} />
                <Route path="/post/:Id" element={<Post />} />

                <Route path="*" element={<Notfound />} />
              </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
