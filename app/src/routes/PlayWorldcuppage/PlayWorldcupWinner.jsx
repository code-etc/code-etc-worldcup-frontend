import React from "react";
import { Link } from "react-router-dom";

const PlayWorldcupWinner = ({ worldcupWinner }) => {
  if (!worldcupWinner) return;
  return (
    <div className="w-[100%] h-[700px] relative flex items-center">
      <h3 className="xl:text-[150px] sm:text-[120px] absolute  text-sky-400 z-10 top-[50%-225px] left-[50%] text-[100px]">
        {worldcupWinner[0].data.name} 우승
      </h3>
      <img
        src={worldcupWinner[0].data.imageURI}
        className="max-h-[100%] max-w-[100%] m-auto"
        alt={worldcupWinner[0].data.name}
      />
    </div>
  );
};

export default PlayWorldcupWinner;
