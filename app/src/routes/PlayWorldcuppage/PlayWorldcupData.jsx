import React from "react";

const PlayWorldcupData = ({ worldcupData, chooseWorldcup }) => {
  return (
    <>
      <div className="flex w-[50%] h-[700px] flex-col m-auto ">
        <div className="w-[100%] h-[600px] flex items-center ">
          <img
            src={worldcupData.picture}
            className="max-h-[100%] max-w-[100%] cursor-pointer hover:scale-105 m-auto"
            alt={worldcupData.name}
            onClick={chooseWorldcup}
          />
        </div>
        <h3 className=" text-[40px] z-10 cursor-pointer m-auto" onClick={chooseWorldcup}>
          {worldcupData.name}
        </h3>
      </div>
    </>
  );
};

export default PlayWorldcupData;
