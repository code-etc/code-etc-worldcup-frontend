import React from "react";

const PlayWorldcupData = ({ worldcupData, worldcupdataIndex, handleWorldcup }) => {
  return (
    <>
      <div className={"w-[50%] h-[700px] relative cursor-pointer hover:scale-105"} onClick={handleWorldcup}>
        <h3 className={"absolute text-[40px] " + (worldcupdataIndex === 0 ? "right-40" : "left-40")}>
          {worldcupData.name}
        </h3>
        <img src={worldcupData.picture} className="max-h-[100%] max-w-[100%] m-auto" alt={worldcupData.name} />
      </div>
    </>
  );
};

export default PlayWorldcupData;
