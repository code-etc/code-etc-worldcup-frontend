import React from "react";

const WorldcupRankData = ({ rankElement, rankIndex }) => {
  const renderRank = (rankIndex) => {
    switch (rankIndex) {
      case 1:
        return (
          <div
            className="xl:flex-col xl:top-[180px] xl:left-[430px] xl:mt-0 flex relative mb-[30px] mt-[100px]"
            key={rankElement.name}
          >
            <p className="xl:text-[100px] xl:top-[-100px] xl:left-[140px] absolute text-[24px] top-[-24px] left-[50px]">
              {rankIndex}등
            </p>
            <img
              src={rankElement.picture}
              className="xl:w-[400px] xl:h-[400px] sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              alt={rankElement.name}
            />
            <div className="flex flex-col">
              <p className="xl:text-[50px] xl:ml-0 text-[24px] ml-[32px]">{rankElement.name}</p>
              <p className="xl:text-[50px] xl:ml-0 xl:mt-0 text-[24px] ml-[32px]">우승 비율 {rankElement.winRate}%</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="xl:flex-col  xl:top-[-100px] flex relative mb-[30px]" key={rankElement.name}>
            <p className="xl:text-[80px] xl:top-[-80px] xl:left-[70px] absolute text-[24px] top-[-24px] left-[50px]">
              {rankIndex}등
            </p>
            <img
              src={rankElement.picture}
              className="xl:w-[300px] xl:h-[300px] sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              alt={rankElement.name}
            />
            <div className="flex flex-col">
              <p className="xl:text-[40px] xl:ml-0 text-[24px] ml-[32px]">{rankElement.name}</p>
              <p className="xl:text-[40px] xl:ml-0 xl:mt-0 text-[24px] ml-[32px]">우승 비율 {rankElement.winRate}%</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="xl:flex-col xl:top-[-350px] xl:left-[960px] flex relative mb-[30px]" key={rankElement.name}>
            <p className=" xl:text-[60px] xl:top-[-60px] xl:left-[50px] absolute text-[24px] top-[-24px] left-[50px]">
              {rankIndex}등
            </p>
            <img
              src={rankElement.picture}
              className="xl:w-[250px] xl:h-[250px] sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              alt={rankElement.name}
            />
            <div className="flex flex-col">
              <p className="xl:text-[35px] xl:ml-0 text-[24px] ml-[32px]">{rankElement.name}</p>
              <p className="xl:text-[35px] xl:ml-0 xl:mt-0 text-[24px] ml-[32px]">우승 비율 {rankElement.winRate}%</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="xl:top-[-300px] flex relative mb-[30px]" key={rankElement.name}>
            <p className="absolute text-[24px] top-[-24px] left-[50px]">{rankIndex}등</p>
            <img
              src={rankElement.picture}
              className="sm:w-[200px] sm:h-[200px] w-[150px] h-[150px]"
              alt={rankElement.name}
            />
            <div className="flex flex-col">
              <p className="text-[24px] ml-[32px]">{rankElement.name}</p>
              <p className="text-[24px] ml-[32px]">우승 비율 {rankElement.winRate}%</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div>{renderRank(rankIndex + 1)}</div>
    </>
  );
};

export default WorldcupRankData;
