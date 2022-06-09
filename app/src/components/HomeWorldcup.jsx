import React from "react";
import { BsSearch } from "react-icons/bs";
import Slider from "./Slider";

const HomeWorldcup = () => {
  return (
    <div className="worldcup">
      <div className="flex items-center rounded-[4px] border-slate-400 border-[1px] p-[5px] mb-[4px] mx-3">
        <BsSearch className="mr-[4px]" />
        <input type="text" placeholder="월드컵 검색" className="w-[100%] h-[20px] focus:outline-none" />
      </div>

      <Slider page={0} />
    </div>
  );
};

export default HomeWorldcup;
