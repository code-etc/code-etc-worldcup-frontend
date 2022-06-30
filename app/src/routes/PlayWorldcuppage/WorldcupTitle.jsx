import React from "react";

const WorldcupTitle = ({ worldcupTitle, rankPageTitle }) => {
  if (rankPageTitle) {
    return (
      <h2 className="sm:text-[40px] w-fit m-auto text-[30px]">
        {worldcupTitle} {rankPageTitle}
      </h2>
    );
  }

  return <h2 className="sm:text-[40px] w-fit m-auto text-[30px]">{worldcupTitle}</h2>;
};

export default WorldcupTitle;
