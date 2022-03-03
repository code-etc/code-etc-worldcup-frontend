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

  useEffect(() => {
    // 시작하기 버튼 누르면 여기서 시작
    setWorldcupKind("wanttoeatmeat");
    getWorldcupDatas("/worldcup/play/wanttoeatmeat/1-3");
  }, []);

  useEffect(() => {
    getWorldcupDatas(nextMatchUrl);
  }, [clickWorldcup]);

  const getWorldcupDatas = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setWorldcupTitle(data.title);
    setWorldcupDatas([...data.select]);
    setWorldcupCount(data.worldcupCount);
    setNextMatchUrl(data["next-match"]);
  };

  return (
    <>
      <section className="min-w-[1024px] w-[100%] h-fit mainFont">
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
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PlayWorldcup;