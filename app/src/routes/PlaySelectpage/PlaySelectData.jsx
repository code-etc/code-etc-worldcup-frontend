import React from "react";
import { getParametersForUnsplash } from "../../performance";

const PlaySelectData = ({ handleSelect, selectData, selectDataIndex }) => {
  return (
    <>
      <div className={"w-[50%] h-[700px] relative cursor-pointer hover:scale-105"} onClick={handleSelect}>
        <h3 className={"absolute text-[40px] " + (selectDataIndex === 0 ? "right-40" : "left-40")}>
          {selectData.name}
        </h3>
        <img
          src={selectData.picture + getParametersForUnsplash({ width: 1400, height: 1280, quality: 80, format: "png" })}
          className="max-h-[100%] max-w-[100%] m-auto"
          alt={selectData.name}
        />
      </div>
    </>
  );
};

export default PlaySelectData;
