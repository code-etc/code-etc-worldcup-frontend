import React, { useEffect, useRef, useState } from "react";

const WorldcupImage = ({ worldcupData, chooseCandidate, className }) => {
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
        className={className}
        alt={worldcupData.name}
        onClick={chooseCandidate}
      />
    </>
  );
};

export default WorldcupImage;
