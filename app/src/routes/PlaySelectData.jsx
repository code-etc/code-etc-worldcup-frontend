import React from "react";
import { getParametersForUnsplash } from "../performance";

const PlaySelectData = ({ selectDatas, selectTitle, setClickSelect }) => {
  const handleSelect = (event) => {
    console.log(event.target);
    setClickSelect(true);
  };

  return (
    <>
      <h2 className="text-[40px] mt-[40px] w-fit m-auto">{selectTitle}</h2>
      <div className="absolute lg:left-[47%] xl:text-[80px] lg:top-[45%] text-[60px] top-[300px] left-[490px] z-10">
        VS
      </div>
      <div className="mt-[40px] flex w-[100%]">
        {selectDatas.map((selectData, index) => (
          <div
            key={selectData.name}
            className={"w-[50%] h-[700px] relative cursor-pointer " + (index === 0 ? "ml-[50px]" : "ml-[120px]")}
            onClick={handleSelect}
          >
            <h3 className="absolute xl:top-[45%] left-[20%] xl:text-[80px] text-[40px] top-[30%]">{selectData.name}</h3>
            <img
              src={
                selectData.picture + getParametersForUnsplash({ width: 1400, height: 1280, quality: 80, format: "png" })
              }
              className="max-w-[90%] min-w-[300px] h-auto max-h-[90%] min-h-[50%] m-auto"
              alt={selectData.name}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaySelectData;
