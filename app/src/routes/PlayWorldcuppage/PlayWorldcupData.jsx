import React from "react";

const PlayWorldcupData = ({ worldcupData, worldcupdataIndex, chooseWorldcup }) => {
  return (
    <>
      <div className={"w-[50%] h-[700px] relative flex items-center"}>
        <h3
          className={
            "absolute text-[40px] text-sky-400 z-10 cursor-pointer " +
            (worldcupdataIndex === 0 ? "right-40" : "left-40")
          }
          onClick={chooseWorldcup}
        >
          {worldcupData.name}
        </h3>
        <img
          src={worldcupData.picture}
          className="max-h-[100%] max-w-[100%] cursor-pointer hover:scale-105"
          alt={worldcupData.name}
          onClick={chooseWorldcup}
        />
      </div>
    </>
  );
};

export default PlayWorldcupData;
