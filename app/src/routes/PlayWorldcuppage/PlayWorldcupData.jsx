import React from "react";

const PlayWorldcupData = ({ worldcupData, worldcupdataIndex, handleWorldcup }) => {
  return (
    <>
      <div
        className={"w-[50%] h-[700px] relative cursor-pointer hover:scale-105 flex items-center"}
        onClick={handleWorldcup}
      >
        <h3 className={"absolute text-[40px] text-sky-400  " + (worldcupdataIndex === 0 ? "right-40" : "left-40")}>
          {worldcupData.name}
        </h3>
        <img src={worldcupData.picture} className="max-h-[100%] max-w-[100%]" alt={worldcupData.name} />
      </div>
    </>
  );
};

export default PlayWorldcupData;
