import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import PlaySelect from "./routes/PlaySelect";
import PlayWorldcup from "./routes/PlayWorldcup";
import RegisterSelect from "./routes/RegisterSelect";
import RegisterWorldcup from "./routes/RegisterWorldcup";
import GNB from "./components/GNB";
const App = () => {
  console.log("develop");
  return (
    <>
      <GNB />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registerWorldcup" component={RegisterWorldcup} />
        <Route path="/registerSelect" component={RegisterSelect} />
        <Route path="/myPage" component={MyPage} />
        <Route path="/playWorldcup" component={PlayWorldcup} />
        <Route path="/playSelect" component={PlaySelect} />
      </BrowserRouter>
    </>
  );
};

export default App;
