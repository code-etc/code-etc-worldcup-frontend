import React from "react";

const PlayWorldcupCount = ({ worldcupMatchCount }) => {
  return <div className="w-fit m-auto text-[40px]">{`${worldcupMatchCount[0]} / ${worldcupMatchCount[1]}`}</div>;
};

export default PlayWorldcupCount;
