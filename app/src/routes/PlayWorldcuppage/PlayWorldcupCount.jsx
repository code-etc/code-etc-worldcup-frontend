import React from "react";

const PlayWorldcupCount = ({ currentRoundCount, currentRoundMatchCount, currentRoundTotalMatchCount }) => {
  return (
    <>
      <div className="w-fit m-auto">
        <p className="text-[40px] text-center	">{currentRoundCount + 1} 라운드</p>
        <p className="text-[30px] text-center	">{`${currentRoundMatchCount} / ${currentRoundTotalMatchCount}`}</p>
      </div>
    </>
  );
};

export default PlayWorldcupCount;
