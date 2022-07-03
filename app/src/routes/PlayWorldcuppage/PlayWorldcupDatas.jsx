import axios from "axios";
import React, { useState } from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import PlayWorldcupDefaultText from "./PlayWorldcupDefaultText";
import Versus from "./Versus";
import WorldcupSelectResult from "./WorldcupSelectResult";

const PlayWorldcupDatas = ({
  worldcupMatchList,
  candidateList,
  candidateImage,
  setWorldcupWinner,
  currentMatch,
  setCurrentMatch,
  selectCandidate,
  setSelectCandidate,
  matchWinner,
  setMatchWinner,
}) => {
  const handleChooseCandidate = async (event) => {
    try {
      await axios({
        url: `/game-service/matches/${worldcupMatchList[currentMatch].id}?winner=${event.target.id}`,
        method: "PUT",
      });

      const winnerInfo = candidateList.find((candidate) => candidate.data.id === event.target.id);

      if (worldcupMatchList.length === 1) {
        setWorldcupWinner(true);
      }

      setCurrentMatch((prev) => (prev += 1));
      setMatchWinner(winnerInfo);
      setSelectCandidate(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (selectCandidate) {
    return <WorldcupSelectResult matchWinner={matchWinner} />;
  }

  return (
    <div className="mt-[40px] flex w-[100%] justify-center relative">
      {candidateList[1] === "" ? (
        <>
          <PlayWorldcupDefaultText
            passOrFailText="통과"
            handleClickEvent={handleChooseCandidate}
            candidateInfo={candidateList[0]}
          />
          <h1 className="xl:text-[100px] sm:text-[60px] text-[40px] absolute w-fix z-10 text-red-600">부전승 발생!</h1>
          <PlayWorldcupData candidateInfo={candidateList[0]} candidateImageInfo={candidateImage[0]} />
          <PlayWorldcupDefaultText
            passOrFailText="탈락"
            handleClickEvent={handleChooseCandidate}
            candidateInfo={candidateList[0]}
          />
        </>
      ) : (
        <>
          <PlayWorldcupData
            handleChooseCandidate={handleChooseCandidate}
            candidateInfo={candidateList[0]}
            candidateImageInfo={candidateImage[0]}
          />
          <div>
            <Versus />
          </div>
          <PlayWorldcupData
            handleChooseCandidate={handleChooseCandidate}
            candidateInfo={candidateList[1]}
            candidateImageInfo={candidateImage[1]}
          />
        </>
      )}
    </div>
  );
};

export default PlayWorldcupDatas;
