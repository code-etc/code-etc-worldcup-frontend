import React, { useState, useRef, useEffect } from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";
import styles from "./Slider.module.css";
const Slide = ({ datas }) => {
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
      <div className={styles.container}>
        <ul
          className={styles.slide_list}
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
            <li>
              <a href="/">
                <BackgroundImage
                  src={data.thumbnail}
                  ref={liRef}
                  key={data.id}
                  className={styles.slide_item}
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
                      <strong className={styles.title}>{data.title}</strong>
                      <div className={styles.button_container}>
                        <a className={styles.start_button} href="/">
                          시작하기
                        </a>
                        <a className={styles.rank_button} href="/">
                          랭킹보기
                        </a>
                      </div>
                      <div className={styles.author}>Made by:{data.author}</div>
                    </>
                  )}
                </BackgroundImage>
              </a>
            </li>
          ))}
        </ul>
        <button
          className={styles.prev}
          type="button"
          onClick={() => {
            isButtonClick.current = true;
            setItemIndex((prev) => prev - 1);
          }}
        >
          {"<"}
        </button>
        <button
          className={styles.next}
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
            <li>
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
