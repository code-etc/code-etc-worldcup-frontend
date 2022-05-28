import axios from "axios";
import React, { useState } from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import PlayWorldcupDefaultText from "./PlayWorldcupDefaultText";
import Versus from "./Versus";
import WorldcupSelectResult from "./WorldcupSelectResult";

const PlayWorldcupDatas = ({
  currentMatchCandidates,
  setClickWorldcup,
  // worldcupCount,
  setWorldcupWinner,
  chooseCandiate,
  setChooseCandiate,
}) => {
  const [clickImage, setClickImage] = useState("");
  const [passOrFail, setPassOrFail] = useState();

  if (currentMatchCandidates.length === 0) {
    return <div>404 에러</div>;
  }

  const handleClickEvent = async (event) => {
    setPassOrFail(event.target.textContent);
    setChooseCandiate(true);
    currentMatchCandidates.length > 1 ? setClickImage(event.target) : setClickImage(currentMatchCandidates[0]);
    setClickWorldcup(event.target);

    currentMatchCandidates[0].name === event.target.textContent
      ? await axios({
          url: `/matches/{matchId}?winner='currentMatchCandidates[0]'&looser='currentMatchCandidates[1]'`,
          method: "PUT",
        })
      : await axios({
          url: `/matches/{matchId}?winner='currentMatchCandidates[1]'&looser='currentMatchCandidates[0]'`,
          method: "PUT",
        });

    // worldcupCount[0] !== worldcupCount[1] ? setClickWorldcup(event.target) : setWorldcupWinner(event.target);
  };

  return (
    <>
      {chooseCandiate ? (
        <>
          <WorldcupSelectResult clickImage={clickImage} passOrFail={passOrFail} />
        </>
      ) : (
        <div className="mt-[40px] flex w-[100%] justify-center relative">
          {currentMatchCandidates.length === 1 ? (
            <>
              <PlayWorldcupDefaultText passOrFailText={"통과"} handleClickEvent={handleClickEvent} />
              <h1 className="xl:text-[100px] sm:text-[60px] text-[40px] absolute w-fix z-10 text-red-600">
                부전승 발생!
              </h1>
              <PlayWorldcupData worldcupData={currentMatchCandidates[0]} />
              <PlayWorldcupDefaultText passOrFailText={"탈락"} handleClickEvent={handleClickEvent} />
            </>
          ) : (
            <>
              <PlayWorldcupData chooseCandidate={handleClickEvent} currentMatchCandidates={currentMatchCandidates[0]} />
              <div>
                <Versus />
              </div>
              <PlayWorldcupData chooseCandidate={handleClickEvent} currentMatchCandidates={currentMatchCandidates[1]} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PlayWorldcupDatas;
