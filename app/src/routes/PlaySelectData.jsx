import React from "react";

const PlaySelectData = ({ selects, selectTitle }) => {
  const clickSelect = (event) => {
    console.log(event.target);
  };

  return (
    <>
      <h2 className="text-[40px] mt-[40px] w-fit m-auto">{selectTitle}</h2>
      <div className="absolute top-[50%] left-[48%] text-[80px] z-10">VS</div>
      <div className="mt-[40px]">
        {selects.map((select, i) => (
          <div
            className={
              "w-[880px] h-[700px] relative cursor-pointer " +
              (i === 0 ? "float-left ml-[50px]" : "float-right mr-[50px]")
            }
            onClick={clickSelect}
          >
            <h3 className="absolute top-[45%] left-[45%] text-[80px]">{select.name}</h3>
            <img src={select.picture} className="w-[880px] h-[700px]" alt={select.name} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PlaySelectData;
