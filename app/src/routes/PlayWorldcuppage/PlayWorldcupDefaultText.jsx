import React from "react";

const PlayWorldcupDefaultText = ({ passOrFailText, handleClickEvent }) => {
  return (
    <>
      <div className="w-[200px] h-[100%] flex justify-center items-center" onClick={handleClickEvent}>
        <p className="xl:text-[100px] sm:text-[60px] text-[40px] cursor-pointer">{passOrFailText}</p>
      </div>
    </>
  );
};

export default PlayWorldcupDefaultText;
