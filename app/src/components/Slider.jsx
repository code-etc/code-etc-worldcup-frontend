import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SliderItem from "./SliderItem";
import SliderIndexButton from "./SliderIndexButton";
const Slide = ({ startIndex, length }) => {
  const itemWidth = 400;
  const itemHeight = 250;
  const itemMargin = 60;
  const ulRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const loadCount = useRef(0);
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

  useEffect(async () => {
    await axios
      .get(`https://61fbded03f1e34001792c680.mockapi.io/worldcupList`)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

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
      {loading ? (
        <div className="flex justify-center items-center h-[250px]">
          <div className="text-center">Loading</div>
        </div>
      ) : (
        <>
          <div className={`relative w-[100%] h-[250px] mb-[10px] overflow-hidden`}>
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
                <SliderItem
                  data={data}
                  loadCount={loadCount}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  datasLength={datas.length}
                />
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
                <SliderIndexButton
                  itemIndex={itemIndex}
                  setItemIndex={setItemIndex}
                  VISIBLE_NUMBER={VISIBLE_NUMBER}
                  i={i}
                  isButtonClick={isButtonClick}
                  datasLength={datas.length}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
export default Slide;
