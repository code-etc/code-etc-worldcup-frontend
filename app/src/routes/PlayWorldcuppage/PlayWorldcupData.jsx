import React from "react";

const PlayWorldcupData = ({ worldcupData, chooseCandidate }) => {
  return (
    <>
      <div className="flex 2xl:w-[780px] 2xl:h-[700px] xl:w-[580px] xl:h-[500px] lg:w-[480px] lg:h-[400px] w-[270px] h-[200px] flex-col m-auto ">
        <div className="flex items-center ">
          <img
            src={worldcupData.picture}
            className="2xl:max-w-[780px] 2xl:max-h-[700px] xl:max-w-[580px] xl:max-h-[480px] lg:max-w-[500px] lg:max-h-[400px] max-w-[270px] max-h-[200px] cursor-pointer hover:scale-105 m-auto"
            alt={worldcupData.name}
            onClick={chooseCandidate}
          />
        </div>
        <h3 className=" text-[40px] z-10 cursor-pointer m-auto" onClick={chooseCandidate}>
          {worldcupData.name}
        </h3>
      </div>
    </>
  );
};

export default PlayWorldcupData;
