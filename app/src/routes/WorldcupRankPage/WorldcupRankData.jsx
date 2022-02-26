import React from "react";

const WorldcupRankData = ({ rankElement, rankIndex }) => {
  const renderSwith = (rankIndex) => {
    switch (rankIndex) {
      case 1:
        return (
          <div className="flex flex-col relative top-[180px] left-[430px]" key={rankElement.name}>
            <p className="absolute text-[100px] top-[-100px] left-[90px]">{rankIndex}등</p>
            <img src={rankElement.picture} className="w-[300px] h-[300px]" alt={rankElement.name} />
            <p className="text-[50px]">{rankElement.name}</p>
            <p className="text-[50px]">우승 비율 {rankElement.winRate}%</p>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col relative top-[-100px]" key={rankElement.name}>
            <p className="absolute text-[80px] top-[-80px] left-[70px]">{rankIndex}등</p>
            <img src={rankElement.picture} className="w-[250px] h-[250px]" alt={rankElement.name} />
            <p className="text-[40px] ">{rankElement.name}</p>
            <p className="text-[40px] ">우승 비율 {rankElement.winRate}%</p>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col relative top-[-320px] left-[960px]" key={rankElement.name}>
            <p className="absolute text-[60px] top-[-60px] left-[50px]">{rankIndex}등</p>
            <img src={rankElement.picture} className="w-[200px] h-[200px]" alt={rankElement.name} />
            <p className="text-[35px]">{rankElement.name}</p>
            <p className="text-[35px]">우승 비율 {rankElement.winRate}%</p>
          </div>
        );
      default:
        return (
          <div className="flex relative top-[-200px] mb-[30px]" key={rankElement.name}>
            <p className="absolute text-[24px] top-[-24px] left-[50px]">{rankIndex}등</p>
            <img src={rankElement.picture} className="w-[140px] h-[140px]" alt={rankElement.name} />
            <p className="text-[24px] ml-[32px]">{rankElement.name}</p>
            <p className="text-[24px] mt-[40px] ml-[-66px]">우승 비율 {rankElement.winRate}%</p>
          </div>
        );
    }
  };

  return (
    <>
      <div>{renderSwith(rankIndex + 1)}</div>
    </>
  );
};

export default WorldcupRankData;
