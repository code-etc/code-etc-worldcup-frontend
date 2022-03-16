import React, { useState } from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import Versus from "./Versus";

const PlayWorldcupDatas = ({
  worldcupDatas,
  setClickWorldcup,
  worldcupCount,
  setWorldcupWinner,
  chooseCandiate,
  setChooseCandiate,
}) => {
  const [clickImage, setClickImage] = useState("");
  const [passOrLose, setPassOrLoss] = useState();
  const [prevCandiate, setPrevCanditate] = useState();
  if (worldcupDatas.length === 0) {
    return <div>404 에러</div>;
  }
  const handleClickEvent = (event) => {
    setPrevCanditate(worldcupDatas[0]);
    setPassOrLoss(event.target.textContent);
    setChooseCandiate(true);
    worldcupDatas.length > 1 ? setClickImage(event.target) : setClickImage(worldcupDatas[0]);
    worldcupCount[0] !== worldcupCount[1] ? setClickWorldcup(event.target) : setWorldcupWinner(event.target);
  };
  return (
    <>
      {chooseCandiate ? (
        <>
          {worldcupDatas.length === 2 ? (
            <div className="w-[100%] h-[700px] relative flex items-center">
              <h3 className="xl:text-[150px] sm:text-[120px] absolute  text-sky-400 z-10 top-[50%-225px] left-[50%] text-[100px]">
                {clickImage.alt} 승리
              </h3>
              <img src={clickImage.src} className="max-h-[100%] max-w-[100%] m-auto" alt={clickImage.alt} />
            </div>
          ) : (
            <div className="w-[100%] h-[700px] relative flex items-center">
              <h3 className="xl:text-[150px] sm:text-[120px] absolute  text-sky-400 z-10 top-[50%-225px] left-[50%] text-[100px]">
                {clickImage.name} {passOrLose}
              </h3>
              <img src={clickImage.picture} className="max-h-[100%] max-w-[100%] m-auto" alt={clickImage.name} />
            </div>
          )}
        </>
      ) : (
        worldcupDatas[0] !== prevCandiate && (
          <div className="mt-[40px] flex w-[100%] justify-center relative">
            {worldcupDatas.length === 1 ? (
              <>
                <div className="w-[200px] h-[100%] flex justify-center items-center" onClick={handleClickEvent}>
                  <p className="xl:text-[100px] sm:text-[60px] text-[40px] cursor-pointer">통과</p>
                </div>
                <h1 className="xl:text-[100px] sm:text-[60px] text-[40px] absolute w-fix z-10 text-red-600">
                  부전승 발생!
                </h1>
                <PlayWorldcupData worldcupData={worldcupDatas[0]} />
                <div className="w-[200px] h-[100%] flex justify-center items-center" onClick={handleClickEvent}>
                  <p className="xl:text-[100px] sm:text-[60px] text-[40px] cursor-pointer">탈락</p>
                </div>
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
