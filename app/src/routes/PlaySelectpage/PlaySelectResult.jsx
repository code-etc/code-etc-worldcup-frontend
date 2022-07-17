import React from "react";

const PlaySelectResult = ({ selectResults }) => {
  return (
    <>
      <div className="flex w-[100%] h-[180px] content-center">
        {selectResults.map((selectResult) => (
          <div className="w-[50%]" key={selectResult.name}>
            <h2
              className={
                "w-[240px] m-auto pl-[80px] " +
                (selectResult.percent.split("").splice(0, 2).join("") > 50
                  ? "xl:text-[120px] text-[80px]"
                  : "xl:text-[80px] text-[50px]")
              }
            >
              {selectResult.percent}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaySelectResult;
