import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  window.onbeforeunload = function (e) {};
  return (
    <div className="mainFont">
      <div className="worldcup">
        <h1 className="text-center text-[24px] p-[10px]">월드컵</h1>

        <div className="flex items-center rounded-[4px] border-slate-400 border-[1px] p-[5px]">
          <BsSearch className="mr-[4px]" />
          <input type="text" placeholder="월드컵 검색" className="w-[150px] h-[20px] focus:outline-none" />
        </div>

        <Slider startIndex={1} length={15} />
      </div>
    </div>
  );
};
export default Home;
