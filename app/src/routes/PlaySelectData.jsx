import React from "react";

const PlaySelectData = ({ selectDatas, selectTitle, setClickSelect }) => {
  const handleSelect = (event) => {
    console.log(event.target);
    setClickSelect(true);
  };

  return (
    <>
      <h2 className="text-[40px] mt-[40px] w-fit m-auto">{selectTitle}</h2>
      <div className="absolute top-[45%] left-[47%] text-[80px] z-10">VS</div>
      <div className="mt-[40px] flex w-[100%]">
        {selectDatas.map((selectData, index) => (
          <div
            key={selectData.name}
            className={"w-[50%] h-[700px] relative cursor-pointer " + (index === 0 ? "ml-[50px]" : "ml-[120px]")}
            onClick={handleSelect}
          >
            <h3 className="absolute xl:top-[45%] left-[45%] xl:text-[80px] text-[40px] top-[30%]">{selectData.name}</h3>
            <img
              src={selectData.picture}
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
