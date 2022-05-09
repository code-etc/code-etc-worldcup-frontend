import React from "react";

const SliderPrevButton = ({ isButtonClick, setItemIndex }) => {
  return (
    <>
      <button
        className="w-[30px] h-[100%] absolute top-0 text-white font-[700] text-[20px] bg-transparent border-none rounded-[4px] cursor-pointer z-20 right-0"
        type="button"
        onClick={() => {
          isButtonClick.current = true;
          setItemIndex((prev) => prev + 1);
        }}
      >
        {">"}
      </button>
    </>
  );
};

export default SliderPrevButton;
