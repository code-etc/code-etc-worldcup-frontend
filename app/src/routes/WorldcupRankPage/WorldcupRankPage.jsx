import React, { useEffect, useState } from "react";
import WorldcupTitle from "../PlayWorldcuppage/WorldcupTitle";
import WorldcupRankData from "./WorldcupRankData";

const WorldcupRankPage = ({ location }) => {
  const rankPageTitle = "랭킹";
  const [worldcupTitle, setWorldcupTitle] = useState("");
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    getWorldcupRank(`/worldcup/rank/${location.pathname.split("/")[2]}`);
  }, []);

  const getWorldcupRank = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setWorldcupTitle(data.title);
    setRankList(data.rankList);
  };

  return (
    <>
      <section className="xlw-[1280px] h-full mainFont">
        <div className="xl:w-[1280px] m-auto">
          <WorldcupTitle worldcupTitle={worldcupTitle} rankPageTitle={rankPageTitle} />
          {rankList.map((rankElement, rankIndex) => (
            <WorldcupRankData key={rankElement.name} rankElement={rankElement} rankIndex={rankIndex} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WorldcupRankPage;
