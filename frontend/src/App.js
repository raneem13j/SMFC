import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Login from "./Pages/Login/login";
import Notfound from "./Pages/Not Found/notfound";
import Filtertag from "./Components/FilterTag/filtertag";

function App() {
  return (
    <>
     <BrowserRouter>
        <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/filter" element={<Filtertag />} />
                <Route path="*" element={<Notfound />} />
              </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
