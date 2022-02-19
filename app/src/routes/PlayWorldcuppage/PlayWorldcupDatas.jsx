import React from "react";
import PlayWorldcupData from "./PlayWorldcupData";
import Versus from "./Versus";

const PlayWorldcupDatas = ({ worldcupDatas, setClickWorldcup }) => {
  const handleWorldcup = (event) => {
    console.log(event);
    setClickWorldcup(event.timeStamp);
  };

  return (
    <>
      <div className="mt-[40px] flex w-[100%]">
        {worldcupDatas.map((worldcupData, worldcupdataIndex) => (
          <>
            <PlayWorldcupData
              key={worldcupData.name}
              handleWorldcup={handleWorldcup}
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
