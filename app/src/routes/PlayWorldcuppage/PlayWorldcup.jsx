import React, { useState, useEffect } from "react";
import PlayWorldcupCount from "./PlayWorldcupCount";
import PlayWorldcupDatas from "./PlayWorldcupDatas";
import PlayWorldcupWinner from "./PlayWorldcupWinner";

const PlayWorldcup = () => {
  const [worldcupTitle, setWorldcupTitle] = useState("");
  const [worldcupDatas, setWorldcupDatas] = useState([]);
  const [worldcupCount, setWorldcupCount] = useState([]);
  const [clickWorldcup, setClickWorldcup] = useState("");
  const [nextMatchUrl, setNextMatchUrl] = useState("");
  const [worldcupWinner, setWorldcupWinner] = useState("");

  useEffect(() => {
    getWorldcupDatas("/worldcup/play/wanttoeatmeat/1-3");
  }, []);

  useEffect(() => {
    console.log("clickWorldcup");
    getWorldcupDatas(nextMatchUrl);
  }, [clickWorldcup]);

  const getWorldcupDatas = async (url) => {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setWorldcupTitle(data.title);
    setWorldcupDatas([...data.select]);
    setWorldcupCount(data.worldcupCount);
    setNextMatchUrl(data["next-match"]);
  };
  console.log(worldcupWinner);
  return (
    <>
      <section className="min-w-[1024px] w-[100%] h-fit mainFont">
        <div className="w-[100%-100px]  mx-[50px]">
          <h2 className="text-[40px] w-fit m-auto">{worldcupTitle}</h2>
          {worldcupWinner && <PlayWorldcupWinner worldcupWinner={worldcupWinner} />}
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
