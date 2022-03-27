import React, { useEffect, useRef, useState } from "react";

const WorldcupImage = ({ worldcupData, chooseCandidate }) => {
  const imageRef = useRef();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function imageLoad() {
      setIsLoad(true);
    }

    const imageElement = imageRef.current;

    new Promise((resolve) => {
      imageElement.onload = () => resolve(imageElement);
      imageElement.classList.remove("opacity-0");
      imageLoad();
    });
  }, []);

  return (
    <>
      <img
        ref={imageRef}
        src={worldcupData.picture}
        className="2xl:max-w-[780px] 2xl:max-h-[700px] xl:max-w-[580px] xl:max-h-[480px] lg:max-w-[500px] lg:max-h-[400px] max-w-[270px] max-h-[200px] cursor-pointer hover:scale-105 m-auto opacity-0"
        alt={worldcupData.name}
        onClick={chooseCandidate}
      />
    </>
  );
};

export default WorldcupImage;
