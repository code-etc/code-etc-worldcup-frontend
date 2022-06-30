import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginCallback from "./routes/LoginCallback";
import Home from "./routes/Home";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import PlaySelect from "./routes/PlaySelectpage/PlaySelect";
import PlayWorldcup from "./routes/PlayWorldcuppage/PlayWorldcupPage";
import RegisterSelect from "./routes/RegisterSelect";
import RegisterWorldcup from "./routes/RegisterWorldcup";
import GNB from "./components/GNB";
import cookies from "react-cookies";
import axios from "axios";
import Logout from "./routes/Logout";
import NeedLogin from "./routes/NeedLogin";
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log("develop");
  useEffect(() => {
    const token = cookies.load("access-token");
    if (token) {
      axios
        .post(
          "/auth/token",
          JSON.stringify({
            token: token,
          }),
          {
            headers: {
              "Content-type": "application/json",
            },
          },
        )
        .then((res) => {
          console.log(res);
          if (res.data.message === "success") {
            setIsLoading(false);
            setIsLogin(true);
          }
        })
        .catch((err) => {
          console.log("엥");
          setIsLoading(false);
          setIsLogin(false);
        });
    } else {
      console.log("ee");
      setIsLoading(false);
      setIsLogin(false);
    }
  }, [cookies.load("access-token")]);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <GNB isLogin={isLogin} />
          <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/oauth2/redirect" component={LoginCallback} />
            <Route path="/playWorldcup/*" component={PlayWorldcup} />
            <Route path="/playSelect" component={PlaySelect} />
            {isLogin ? (
              <>
                <Route path="/registerWorldcup" component={RegisterWorldcup} />
                <Route path="/registerSelect" component={RegisterSelect} />
                <Route path="/myPage" component={MyPage} />
              </>
            ) : (
              <>
                <Route path="/registerWorldcup">
                  <NeedLogin content="회원만 월드컵을 등록할 수 있습니다" />
                </Route>
                <Route path="/registerSelect">
                  <NeedLogin content="회원만 대신정해주기를 등록할 수 있습니다" />
                </Route>
                <Route path="/myPage">
                  <NeedLogin content="회원만 이용하실 수 있습니다" />
                </Route>
              </>
            )}
          </BrowserRouter>
        </>
      )}
    </>
  );
};

export default App;
