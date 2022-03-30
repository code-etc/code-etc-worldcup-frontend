import React from "react";

const PlayWorldcupCount = ({ worldcupCount }) => {
  return <div className="w-fit m-auto text-[40px]">{`${worldcupCount[0]} / ${worldcupCount[1]}`}</div>;
};

export default PlayWorldcupCount;
