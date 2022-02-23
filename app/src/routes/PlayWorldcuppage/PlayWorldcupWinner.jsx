import React from "react";

const PlayWorldcupWinner = ({ worldcupWinner }) => {
  console.log(worldcupWinner);
  const showWorldcupRank = () => {};

  return (
    <>
      <div className={"w-[100%] h-[700px] relative flex items-center"}>
        <h3 className="absolute text-[150px] text-sky-400 z-10 top-[50%-225px] left-[50%]">
          {worldcupWinner.alt} 우승
        </h3>
        <img src={worldcupWinner.src} className="max-h-[100%] max-w-[100%] m-auto" alt={worldcupWinner.alt} />
      </div>
      <p className="text-[40px] w-fit m-auto cursor-pointer" onClick={showWorldcupRank}>
        랭킹보기
      </p>
    </>
  );
};

export default PlayWorldcupWinner;
