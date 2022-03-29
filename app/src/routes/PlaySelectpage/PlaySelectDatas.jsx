import React from "react";
import PlaySelectData from "./PlaySelectData";
import Versus from "./Versus";

const PlaySelectDatas = ({ selectDatas, setClickSelect }) => {
  const handleSelect = (event) => {
    console.log(event.target);
    setClickSelect(true);
  };

  return (
    <>
      <div className="mt-[40px] flex w-[100%]">
        {selectDatas.map((selectData, selectDataIndex) => (
          <>
            <PlaySelectData
              key={selectData.name}
              handleSelect={handleSelect}
              selectData={selectData}
              selectDataIndex={selectDataIndex}
            />
            <div>{selectDataIndex === 0 ? <Versus /> : null}</div>
          </>
        ))}
      </div>
    </>
  );
};

export default PlaySelectDatas;
