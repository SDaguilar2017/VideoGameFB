import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { getVideogames } from "./redux/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Error404 from "./Components/Error404/Error404";
import LandingPage from "./Views/LandingPage/LandingPage";
import Detail from "./Views/Detail/Detail";
import Create from "./Views/Create/Create";
import Home from "./Views/Home/Home";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
