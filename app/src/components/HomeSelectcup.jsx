import React from "react";
import { BsSearch } from "react-icons/bs";
import Slider from "./Slider";
const HomeSelectcup = () => {
  return (
    <>
      <div className="flex items-center rounded-[4px] border-slate-400 border-[1px] p-[5px] mb-[4px] mx-3">
        <BsSearch className="mr-[4px]" />
        <input type="text" placeholder="대신정해주기 검색" className="w-[100%] h-[20px] focus:outline-none" />
      </div>

      <Slider startIndex={1} length={15} />
    </>
  );
};

export default HomeSelectcup;
