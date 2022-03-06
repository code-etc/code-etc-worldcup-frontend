import React from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import Versus from "./Versus";

const PlayWorldcupDatas = ({ worldcupDatas, setClickWorldcup, worldcupCount, setWorldcupWinner }) => {
  const chooseWorldcup = (event) => {
    worldcupCount[0] !== worldcupCount[1] ? setClickWorldcup(event.target) : setWorldcupWinner(event.target);
  };

  return (
    <>
      <div className="mt-[40px] flex w-[100%] justify-center relative">
        {worldcupDatas.length === 1 ? (
          <>
            <div className="w-[200px] height-[100%] flex justify-center items-center" onClick={chooseWorldcup}>
              <p className=" text-[40px] cursor-pointer text-sky-400">통과</p>
            </div>
            <h1 className="xl:text-[150px] sm:text-[100px] absolute w-fix z-10 text-[50px]">부전승 발생</h1>
            <PlayWorldcupData worldcupData={worldcupDatas[0]} />
            <div className="w-[200px] height-[100%] flex justify-center items-center" onClick={chooseWorldcup}>
              <p className=" text-[40px] cursor-pointer text-red-600">탈락</p>
            </div>
          </>
        ) : (
          worldcupDatas.map((worldcupData, worldcupdataIndex) => (
            <>
              <PlayWorldcupData key={worldcupData.name} chooseWorldcup={chooseWorldcup} worldcupData={worldcupData} />
              <div>{worldcupdataIndex === 0 ? <Versus /> : null}</div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default PlayWorldcupDatas;
