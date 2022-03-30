import React, { useState, useRef, useEffect } from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";
const Slide = ({ datas }) => {
  const itemWidth = 400;
  const itemHeight = 250;
  const itemMargin = 60;
  const ulRef = useRef(null);
  const liRef = useRef(null);
  const timeoutRef = useRef(null);
  const [itemIndex, setItemIndex] = useState(0);
  const first = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const isTouching = useRef(false);
  const isButtonClick = useRef(false);
  const touchStartPoint = useRef({
    x: -1,
    y: -1,
  });
  const touchEndPoint = useRef({
    x: -1,
    y: -1,
  });

  let loadCount = 0;
  const ITEM_NUMBER = datas.length;
  const [VISIBLE_NUMBER, setVisibleNumber] = useState(1);
  const handleResize = () => {
    if (window.innerWidth < 730) {
      setVisibleNumber(1);
    } else if (window.innerWidth < 1100) {
      setVisibleNumber(2);
    } else if (window.innerWidth < 1600) {
      setVisibleNumber(3);
    } else {
      setVisibleNumber(4);
    }
  };

  useEffect(() => {
    console.log("width: ", window.innerWidth);
    if (window.innerWidth < 730) {
      setVisibleNumber(1);
    } else if (window.innerWidth < 1100) {
      setVisibleNumber(2);
    } else if (window.innerWidth < 1600) {
      setVisibleNumber(3);
    } else {
      setVisibleNumber(4);
    }
    console.log("VISIBLE_NUMBER: ", VISIBLE_NUMBER);
    window.addEventListener("resize", handleResize);
    //자동 슬라이드
    timeoutRef.current = setInterval(() => {
      setItemIndex((prev) => prev + 1);
      console.log("hi");
    }, 5000);
  }, []);
  useEffect(() => {
    console.log(itemIndex);
    if (isButtonClick.current) {
      //버튼클릭시 다시 interval 종료후 다시 실행
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setInterval(() => {
        setItemIndex((prev) => prev + 1);
      }, 5000);
      isButtonClick.current = false;
    }
    if (first.current) {
      first.current = false;
    } else {
      if (itemIndex >= ITEM_NUMBER - VISIBLE_NUMBER + 1) setItemIndex(0);
      if (itemIndex <= -1) setItemIndex(ITEM_NUMBER - VISIBLE_NUMBER);
      ulRef.current.style.transform = `translateX(-${(100 / ITEM_NUMBER) * itemIndex}%)`;
    }
  }, [itemIndex]);

  return (
    <>
      <div className={`relative w-[100%] h-[250px] mt-[40px] mb-[10px] overflow-hidden`}>
        <ul
          className={`absolute top-0 left-0 flex h-[250px] transition-[transform] duration-300 ease-in-out mainFont`}
          onTouchStart={(e) => {
            touchStartPoint.current.x = e.changedTouches[0].clientX;
            touchStartPoint.current.y = e.changedTouches[0].clientY;
            isTouching.current = true;
          }}
          onTouchEnd={(e) => {
            touchEndPoint.current.x = e.changedTouches[0].clientX;
            touchEndPoint.current.y = e.changedTouches[0].clientY;
            if (touchStartPoint.current.x - touchEndPoint.current.x > 10) {
              setItemIndex((prev) => prev + 1);
            } else if (touchEndPoint.current.x - touchStartPoint.current.x > 10) {
              setItemIndex((prev) => prev - 1);
            }
            isTouching.current = false;
          }}
          ref={ulRef}
        >
          {datas.map((data) => (
            <li key={data.id}>
              <a href="/">
                <BackgroundImage
                  src={data.thumbnail}
                  ref={liRef}
                  key={data.id}
                  className={`flex flex-col relative items-center justify-center w-[100vw] h-[250px] text-black text-center bg-white rounded-[3%] bg-cover sm:w-[400px] sm:mr-[60px] before:content-[''] before:opacity-50 before:rounded-[3%] before:absolute before:inset-0 before:bg-black`}
                  renderLoader={({ hasLoaded, hasFailed }) => {
                    if (hasLoaded) {
                      loadCount++;
                      if (loadCount === datas.length) {
                        setIsLoading(false);
                        console.log(datas.length, loadCount);
                      }
                    }
                  }}
                >
                  {isLoading ? (
                    <div className="text-white absolute">로딩중</div>
                  ) : (
                    <>
                      <strong className="text-white mb-[20px] font-[800] text-[24px] z-[100] text-stroke-black text-stroke">
                        {data.title}
                      </strong>
                      <div className="flex">
                        <a
                          className="text-white font-[600] text-[15px] no-underline z-[100] mr-[10px] text-stroke-black text-stroke"
                          href="/"
                        >
                          시작하기
                        </a>
                        <a
                          className="text-white font-[300] text-[15px] no-underline z-[100] text-stroke-black text-stroke"
                          href="/"
                        >
                          랭킹보기
                        </a>
                      </div>
                      <div className="absolute right-[10px] bottom-[10px] text-white z-[100] text-stroke-black text-stroke">
                        Made by:{data.author}
                      </div>
                    </>
                  )}
                </BackgroundImage>
              </a>
            </li>
          ))}
        </ul>
        <button
          className="w-[30px] h-[100%] absolute top-0 text-white font-[700] text-[20px] bg-transparent border-none rounded-[4px] cursor-pointer z-20 left-0"
          type="button"
          onClick={() => {
            isButtonClick.current = true;
            setItemIndex((prev) => prev - 1);
          }}
        >
          {"<"}
        </button>
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
      </div>

      <div className="flex items-center	justify-center">
        <ul className="flex">
          {datas.map((data, i) => (
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
                  if (datas.length - VISIBLE_NUMBER < i) {
                    setItemIndex(datas.length - VISIBLE_NUMBER);
                  } else {
                    setItemIndex(i);
                  }
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Slide;
