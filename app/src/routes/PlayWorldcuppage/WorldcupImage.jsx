import React, { useEffect, useRef, useState } from "react";

const WorldcupImage = ({ worldcupData, handleChooseCandidate, className }) => {
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
    <img
      id={worldcupData.id}
      ref={imageRef}
      src={worldcupData.imageURI}
      className={className}
      alt={worldcupData.name}
      onClick={handleChooseCandidate}
    />
  );
};

export default WorldcupImage;
