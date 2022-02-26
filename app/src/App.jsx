import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import PlaySelect from "./routes/PlaySelect";
import PlayWorldcup from "./routes/PlayWorldcuppage/PlayWorldcupPage";
import RegisterSelect from "./routes/RegisterSelect";
import RegisterWorldcup from "./routes/RegisterWorldcup";
import WorldcupRankPage from "./routes/WorldcupRankPage/WorldcupRankPage";
import "./App.css";

const App = () => {
  console.log("develop");
  return (
    <>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registerWorldcup" component={RegisterWorldcup} />
        <Route path="/registerSelect" component={RegisterSelect} />
        <Route path="/myPage" component={MyPage} />
        <Route path="/playWorldcup" component={PlayWorldcup} />
        <Route path="/worldcupRank" component={WorldcupRankPage} />
        <Route path="/playSelect" component={PlaySelect} />
      </BrowserRouter>
    </>
  );
};

export default App;
