import React from "react";

const SliderIndexButton = ({ itemIndex, setItemIndex, VISIBLE_NUMBER, i, isButtonClick, datasLength }) => {
  return (
    <li key={i}>
      <button
        type="button"
        className={
          "block w-[12px] h-[12px] bg-slate-300 rounded-full mr-[2px] md:w-[14px] md:h-[14px] md:mr-[4px]" +
          (itemIndex <= i && itemIndex + VISIBLE_NUMBER - 1 >= i ? " bg-black" : "")
        }
        key={i}
        onClick={(e) => {
          e.preventDefault();
          isButtonClick.current = true;
          if (datasLength - VISIBLE_NUMBER < i) {
            setItemIndex(datasLength - VISIBLE_NUMBER);
          } else {
            setItemIndex(i);
          }
        }}
      ></button>
    </li>
  );
};

export default SliderIndexButton;
