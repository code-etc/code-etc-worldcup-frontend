import React, { useState, useRef, useEffect } from "react";
import qs from "query-string";
import axios from "axios";
import SliderItem from "./SliderItem";
import SliderIndexButton from "./SliderIndexButton";
import SliderNextButton from "./SliderNextButton";
import SliderPrevButton from "./SliderPrevButton";
import { useInView } from "react-intersection-observer";

const Slide = ({ page, setSliderCount, sliderItemSize }) => {
  const itemWidth = 400;
  const itemHeight = 250;
  const itemMargin = 60;
  const ulRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notData, setNotData] = useState(false);

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
  const [ref, inView] = useInView();

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

  const getContent = () => {
    axios.default.paramsSerializer = (params) => {
      return qs.stringify(params);
    };
    const params = {
      // userId: userId,
      // pageable: {
      page: page,
      size: sliderItemSize,
      // sort: "title,asc",
      // sort: ["title,desc"],
      // },
    };
    axios
      .get(`/games/strange-brother`, { params })
      .then((res) => {
        console.log(`${page}: ${res.data._embedded.strangeBrotherGameQueryResponses.length}`);
        const temp = res.data._embedded.strangeBrotherGameQueryResponses;
        setDatas(temp ? temp : []);
      })
      .catch((err) => {
        console.log(err);
        setNotData(true);
      });
  };
  useEffect(() => {
    if (datas.length !== 0) {
      setLoading(false);
    }
  }, [datas]);
  useEffect(() => {
    if (setSliderCount !== undefined && datas.length === sliderItemSize && inView) {
      const temp = [];
      for (let i = 0; i <= page + 1; i++) {
        temp.push(0);
      }
      setSliderCount(temp);
    }

    if (!inView) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = false;
    } else if (!timeoutRef.current) {
      timeoutRef.current = setInterval(() => {
        setItemIndex((prev) => prev + 1);
        console.log("hi");
      }, 5000);
    }
  }, [inView, isLoading]);

  useEffect(() => {
    getContent();

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
      ulRef.current
        ? (ulRef.current.style.transform = `translateX(-${(100 / ITEM_NUMBER) * itemIndex}%)`)
        : (ulRef.current = null);
    }
  }, [itemIndex]);

  return (
    <>
      {loading ? (
        notData ? (
          <></>
        ) : (
          <div className="flex justify-center items-center h-[250px]">
            <div className="text-center">Loading</div>
          </div>
        )
      ) : (
        <div ref={ref}>
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
              <SliderNextButton isButtonClick={isButtonClick} setItemIndex={setItemIndex} />
              <SliderPrevButton isButtonClick={isButtonClick} setItemIndex={setItemIndex} />
            </div>

            <div className="flex items-center	justify-center mb-[10px]">
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
        </div>
      )}
    </>
  );
};
export default Slide;
