import React from "react";

const WorldcupSelectResult = ({ matchWinner }) => {
  if (!matchWinner) return <div></div>;
  return (
    <div className="w-[100%] h-[700px] relative flex items-center">
      <h3 className="xl:text-[150px] sm:text-[120px] absolute  text-sky-400 z-10 top-[50%-225px] left-[50%] text-[100px]">
        {matchWinner.data.name} 승리
      </h3>
      <img src={matchWinner.data.imageURI} className="max-h-[100%] max-w-[100%] m-auto" alt={matchWinner.data.name} />
    </div>
  );
};

export default WorldcupSelectResult;
