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
      if (candidateList[1] === "") {
        if (event.target.textContent === "통과") {
          await axios({
            url: `/game-service/matches/${worldcupMatchList[currentMatch].id}?winner=${candidateList[0].data.id}`,
            method: "PUT",
          });
          setMatchWinner([candidateList[0], "통과"]);
        } else if (event.target.textContent === "탈락") {
          await axios({
            url: `/game-service/matches/${worldcupMatchList[currentMatch].id}?looser=${candidateList[0].data.id}`,
            method: "PUT",
          });
          setMatchWinner([candidateList[0], "탈락"]);
        }
      } else {
        const winnerInfo = candidateList.find((candidate) => candidate.data.id === event.target.id);
        await axios({
          url: `/game-service/matches/${worldcupMatchList[currentMatch].id}?winner=${winnerInfo.data.id}`,
          method: "PUT",
        });
        setMatchWinner([winnerInfo, "승리"]);
      }

      if (worldcupMatchList.length === 1) {
        setWorldcupWinner(true);
      }
      setCurrentMatch((prev) => (prev += 1));
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
