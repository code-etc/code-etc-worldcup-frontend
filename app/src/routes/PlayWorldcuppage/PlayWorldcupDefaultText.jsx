import React from "react";

const PlayWorldcupDefaultText = ({ passOrFailText, handleClickEvent, candidateInfo }) => {
  if (!candidateInfo) return;
  console.log(candidateInfo);
  return (
    <div className="w-[200px] h-[100%] flex justify-center items-center" onClick={handleClickEvent}>
      <p
        className="xl:text-[100px] sm:text-[60px] text-[40px] cursor-pointer"
        id={passOrFailText === "통과" ? candidateInfo.data.id : ""}
      >
        {passOrFailText}
      </p>
    </div>
  );
};

export default PlayWorldcupDefaultText;
