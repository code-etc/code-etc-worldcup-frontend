import React from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import Versus from "./Versus";

const PlayWorldcupDatas = ({ worldcupDatas, setClickWorldcup, worldcupCount, setWorldcupWinner }) => {
  const chooseWorldcup = (event) => {
    console.log(worldcupCount);
    console.log(event.target);
    console.log(worldcupDatas);
    worldcupCount[0] !== worldcupCount[1] ? setClickWorldcup(event.timeStamp) : setWorldcupWinner(event.target);
  };

  return (
    <>
      <div className="mt-[40px] flex w-[100%]">
        {worldcupDatas.map((worldcupData, worldcupdataIndex) => (
          <>
            <PlayWorldcupData
              key={worldcupData.name}
              chooseWorldcup={chooseWorldcup}
              worldcupData={worldcupData}
              worldcupdataIndex={worldcupdataIndex}
            />
            <div>{worldcupdataIndex === 0 ? <Versus /> : null}</div>
          </>
        ))}
      </div>
    </>
  );
};

export default PlayWorldcupDatas;
