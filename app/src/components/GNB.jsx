import React, { useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
const GNB = ({ isLogin }) => {
  const primaryColor = "#0554f2";
  const sidebarWidth = "240px";
  const sidebarPadding = "10px";
  const zIndexSidebar = 100;
  const zIndexOverlay = 50;
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <nav className="flex justify-between p-[10px] bg-[#0554f2] mainFont">
        <a href="/" className="text-white">
          Strange Brother World Cup
        </a>
        {/* Mobile */}
        <button
          className="bg-transparent cursor-pointer border-none md:hidden"
          onClick={() => {
            setIsActive(true);
          }}
        >
          <HiMenu className="text-[20px] text-white" />
        </button>
        <ul
          className={`fixed top-0 right-0 z-[100] flex flex-col justify-start w-[240px] h-[100%] p-[10px] bg-white translate-x-[260px] transition-[transform] duration-300 ease-in-out ${
            isActive ? "translate-x-0" : "translate-x-[260px]"
          }`}
        >
          <strong className="text-black text-center mb-[20px]">Strange Brother World Cup</strong>
          <li>
            {isLogin ? (
              <a href="/logout" className="block w-[100%] p-[15px] text-black">
                로그아웃
              </a>
            ) : (
              <a href="/login" className="block w-[100%] p-[15px] text-black">
                로그인
              </a>
            )}
          </li>
          <li>
            <a className="block w-[100%] p-[15px] text-black" href="/registerWorldcup">
              월드컵 등록
            </a>
          </li>
          <li>
            <a className="block w-[100%] p-[15px] text-black" href="/registerSelect">
              대신 정해주기 등록
            </a>
          </li>
          <li>
            <a className="block w-[100%] p-[15px] text-black" href="/myPage">
              마이페이지
            </a>
          </li>
        </ul>

        {/* Tablet or Desktop */}
        <ul className="hidden md:flex">
          <strong className="md:hidden">Strange Brother World Cup</strong>
          <li>
            {isLogin ? (
              <a href="/logout" className="text-white p-[15px]">
                로그아웃
              </a>
            ) : (
              <a href="/login" className="text-white p-[15px]">
                로그인
              </a>
            )}
          </li>
          <li>
            <a href="/registerWorldcup" className="text-white p-[15px]">
              월드컵 등록
            </a>
          </li>
          <li>
            <a href="/registerSelect" className="text-white p-[15px]">
              대신 정해주기 등록
            </a>
          </li>
          <li>
            <a href="/myPage" className="text-white p-[15px]">
              마이페이지
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`fixed top-0 left-0 z-[50] w-[100%] h-[100vh] bg-[rgba(63,65,80,0.5)] transition-[opaicity] duration-300 ease-in-out transition-[visibilty] ${
          isActive ? "visible opacity-100" : "hidden opacity-0 "
        }`}
        onClick={() => {
          setIsActive(false);
        }}
      ></div>
    </>
  );
};

export default GNB;
