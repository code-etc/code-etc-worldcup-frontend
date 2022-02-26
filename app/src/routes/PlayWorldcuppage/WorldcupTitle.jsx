import React from "react";

const WorldcupTitle = ({ worldcupTitle, rankPageTitle }) => {
  return (
    <>
      {rankPageTitle ? (
        <h2 className="text-[40px] w-fit m-auto">
          {worldcupTitle} {rankPageTitle}
        </h2>
      ) : (
        <h2 className="text-[40px] w-fit m-auto">{worldcupTitle}</h2>
      )}
    </>
  );
};

export default WorldcupTitle;
