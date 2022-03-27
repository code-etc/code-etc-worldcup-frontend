import React, { useState } from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import PlayWorldcupDefaultText from "./PlayWorldcupDefaultText";
import Versus from "./Versus";
import WorldcupSelectResult from "./WorldcupSelectResult";

const PlayWorldcupDatas = ({
  worldcupDatas,
  setClickWorldcup,
  worldcupCount,
  setWorldcupWinner,
  chooseCandiate,
  setChooseCandiate,
}) => {
  const [clickImage, setClickImage] = useState("");
  const [passOrFail, setPassOrFail] = useState();
  const [prevCandiate, setPrevCanditate] = useState();
  if (worldcupDatas.length === 0) {
    return <div>404 에러</div>;
  }
  const handleClickEvent = (event) => {
    setPrevCanditate(worldcupDatas[0]);
    setPassOrFail(event.target.textContent);
    setChooseCandiate(true);
    worldcupDatas.length > 1 ? setClickImage(event.target) : setClickImage(worldcupDatas[0]);
    worldcupCount[0] !== worldcupCount[1] ? setClickWorldcup(event.target) : setWorldcupWinner(event.target);
  };
  return (
    <>
      {chooseCandiate ? (
        <>
          <WorldcupSelectResult clickImage={clickImage} passOrFail={passOrFail} />
        </>
      ) : (
        worldcupDatas[0] !== prevCandiate && (
          <div className="mt-[40px] flex w-[100%] justify-center relative">
            {worldcupDatas.length === 1 ? (
              <>
                <PlayWorldcupDefaultText passOrFailText={"통과"} handleClickEvent={handleClickEvent} />
                <h1 className="xl:text-[100px] sm:text-[60px] text-[40px] absolute w-fix z-10 text-red-600">
                  부전승 발생!
                </h1>
                <PlayWorldcupData worldcupData={worldcupDatas[0]} />
                <PlayWorldcupDefaultText passOrFailText={"탈락"} handleClickEvent={handleClickEvent} />
              </>
            ) : (
              <>
                <PlayWorldcupData chooseCandidate={handleClickEvent} worldcupData={worldcupDatas[0]} />
                <div>
                  <Versus />
                </div>
                <PlayWorldcupData chooseCandidate={handleClickEvent} worldcupData={worldcupDatas[1]} />
              </>
            )}
          </div>
        )
      )}
    </>
  );
};

export default PlayWorldcupDatas;
