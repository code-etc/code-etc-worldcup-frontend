import React, { useEffect, useState } from "react";
import axios from "axios";
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
    const response = await axios(url);
    setWorldcupTitle(response.data.title);
    setRankList(response.data.rankList);
  };

  return (
    <>
      <section className="xl:w-[1280px] h-full mainFont m-auto">
        <div className="xl:w-[1280px]">
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
