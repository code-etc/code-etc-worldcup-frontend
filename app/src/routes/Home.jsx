import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const Home = () => {
  window.onbeforeunload = function (e) {};
  const [moreViewIndexWorldcup, setMoreViewIndexWorldcup] = useState([]);
  const [moreViewIndexSelect, setMoreViewIndexSelect] = useState([]);
  const [orderWorldcup, setOrderWorldcup] = useState("latest");
  const [orderSelect, setOrderSelect] = useState("latest");
  const onClickViewMoreWorldcup = () => {
    setMoreViewIndexWorldcup((prev) => [...prev, 1]);
  };
  const onClickViewMoreSelect = () => {
    setMoreViewIndexSelect((prev) => [...prev, 1]);
  };
  const onClickLatestWorldcup = () => {
    setOrderWorldcup("latest");
  };
  const onClickPopularWorldcup = () => {
    setOrderWorldcup("popular");
  };
  const onClickLatestSelect = () => {
    setOrderSelect("latest");
  };
  const onClickPopularSelect = () => {
    setOrderSelect("popular");
  };
  return (
    <div className="mainFont">
      <div className="worldcup">
        <h1 className="text-center text-[24px] p-[10px]">월드컵</h1>

        <div className="flex justify-center items-center">
          <div className="mr-[14px]">
            <button
              onClick={onClickLatestWorldcup}
              type="button"
              className={`p-[10px] ${orderWorldcup === "latest" ? "text-[#0554f2]" : "text-black"}`}
            >
              최신순
            </button>
            <button
              type="button"
              className={`p-[10px] ${orderWorldcup === "popular" ? "text-[#0554f2]" : "text-black"}`}
            >
              <div onClick={onClickPopularWorldcup}>인기순</div>
            </button>
          </div>
          <div className="flex items-center rounded-[4px] border-slate-400 border-[1px] p-[5px]">
            <BsSearch className="mr-[4px]" />
            <input type="text" placeholder="월드컵 검색" className="w-[150px] h-[20px] focus:outline-none" />
          </div>
        </div>

        <Slider startIndex={1} length={15} />
        <div className="mb-[20px]"></div>
        {moreViewIndexWorldcup.map((temp, i) => (
          <>
            <Slider startIndex={16 + i} length={15} />
            <div className="mb-[20px]"></div>
          </>
        ))}
        <button type="button" className="w-[100%] p-[10px] text-center" onClick={onClickViewMoreWorldcup}>
          <div>더보기</div>
        </button>
      </div>

      <hr className="mb-[10px]" />

      <div className="selectcup">
        <h1 className="text-center text-[24px] p-[10px]">대신정해주기</h1>
        <div className="flex justify-center items-center">
          <div className="mr-[14px]">
            <button
              onClick={onClickLatestSelect}
              type="button"
              className={`p-[10px] ${orderSelect === "latest" ? "text-[#0554f2]" : "text-black"}`}
            >
              최신순
            </button>
            <button type="button" className={`p-[10px] ${orderSelect === "popular" ? "text-[#0554f2]" : "text-black"}`}>
              <div onClick={onClickPopularSelect}>인기순</div>
            </button>
          </div>
          <div className="flex items-center rounded-[4px] border-slate-400 border-[1px] p-[5px]">
            <BsSearch className="mr-[4px]" />
            <input type="text" placeholder="대신정해주기 검색" className="w-[150px] h-[20px] focus:outline-none" />
          </div>
        </div>

        <Slider startIndex={1} length={15} />
        <div className="mb-[20px]"></div>
        {moreViewIndexSelect.map((temp, i) => (
          <>
            <Slider startIndex={16 + i} length={15} />
            <div className="mb-[20px]"></div>
          </>
        ))}
        <div className="mb-[10px]"></div>
        <button type="button" className="w-[100%] p-[10px] text-center" onClick={onClickViewMoreSelect}>
          <div>더보기</div>
        </button>
      </div>
    </div>
  );
};
export default Home;
