import axios from "axios";
import React, { useState, useEffect } from "react";
import PlayWorldcupCount from "./PlayWorldcupCount";
import PlayWorldcupDatas from "./PlayWorldcupDatas";
import PlayWorldcupWinner from "./PlayWorldcupWinner";
import WorldcupTitle from "./WorldcupTitle";

const PlayWorldcup = () => {
  const [worldcupKind, setWorldcupKind] = useState("");
  const [worldcupTitle, setWorldcupTitle] = useState("");
  const [worldcupDatas, setWorldcupDatas] = useState([]);
  const [worldcupCount, setWorldcupCount] = useState([]);
  const [clickWorldcup, setClickWorldcup] = useState("");
  const [nextMatchUrl, setNextMatchUrl] = useState("");
  const [worldcupWinner, setWorldcupWinner] = useState("");
  const [chooseCandiate, setChooseCandiate] = useState(false);

  useEffect(() => {
    // 시작하기 버튼 누르면 여기서 시작
    setWorldcupKind("wanttogocity");
    getWorldcupDatas("/worldcup/play/wanttogocity/1-4");
  }, []);

  useEffect(() => {
    getWorldcupDatas(nextMatchUrl);
  }, [clickWorldcup]);

  const getWorldcupDatas = async (url) => {
    const response = await axios(url);
    setChooseCandiate(false);
    setWorldcupTitle(response.data.title);
    setWorldcupDatas([...response.data.select]);
    setWorldcupCount(response.data.worldcupCount);
    setNextMatchUrl(response.data["next-match"]);
  };

  return (
    <>
      <section className="min-w-[640px] w-[100%] h-screen mainFont">
        <div className="w-[100%-100px]  mx-[50px]">
          <WorldcupTitle worldcupTitle={worldcupTitle} />
          {worldcupWinner && <PlayWorldcupWinner worldcupWinner={worldcupWinner} worldcupKind={worldcupKind} />}
          {!worldcupWinner && worldcupTitle && <PlayWorldcupCount worldcupCount={worldcupCount} />}
          {!worldcupWinner && worldcupTitle && (
            <PlayWorldcupDatas
              worldcupDatas={worldcupDatas}
              setClickWorldcup={setClickWorldcup}
              worldcupCount={worldcupCount}
              setWorldcupWinner={setWorldcupWinner}
              setChooseCandiate={setChooseCandiate}
              chooseCandiate={chooseCandiate}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PlayWorldcup;
