import React, { useEffect, useRef, useState } from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";

const WorldcupImage = ({ worldcupData, handleChooseCandidate, className, candidateImageInfo }) => {
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
      {/* <img
        id={worldcupData.id}
        ref={imageRef}
        src={candidateImageInfo}
        style={{
          backgroundImage: `url(${candidateImageInfo})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className={className}
        alt={worldcupData.name}
        onClick={handleChooseCandidate}
      /> */}
      <div
        id={worldcupData.id}
        ref={imageRef}
        className={className}
        alt={worldcupData.name}
        onClick={handleChooseCandidate}
      >
        <img
          src={candidateImageInfo}
          className={`flex flex-col relative items-center justify-center w-[100%] h-[250px] text-black text-center bg-white rounded-[3%] bg-contain bg-no-repeat bg-center before:content-[''] before:opacity-50 before:rounded-[3%] before:absolute before:inset-0 before:bg-black`}
        />
      </div>
    </>
  );
};

export default WorldcupImage;
