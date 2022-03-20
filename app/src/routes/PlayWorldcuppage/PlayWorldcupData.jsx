import React, { lazy, Suspense } from "react";
import WorldcupLoadingImage from "./WorldcupLoadingImage";

const WorldcupImage = lazy(() => import("./WorldcupImage"));

const PlayWorldcupData = ({ worldcupData, chooseCandidate }) => {
  console.log(worldcupData);
  return (
    <>
      <div className="flex 2xl:w-[780px] 2xl:h-[700px] xl:w-[580px] xl:h-[500px] lg:w-[480px] lg:h-[400px] w-[270px] h-[200px] flex-col m-auto ">
        <div className="flex items-center ">
          <Suspense fallback={<WorldcupLoadingImage />}>
            <WorldcupImage worldcupData={worldcupData} chooseCandidate={chooseCandidate} />
          </Suspense>
        </div>
        <h3 className=" text-[40px] z-10 cursor-pointer m-auto" onClick={chooseCandidate}>
          {worldcupData.name}
        </h3>
      </div>
    </>
  );
};

export default PlayWorldcupData;
