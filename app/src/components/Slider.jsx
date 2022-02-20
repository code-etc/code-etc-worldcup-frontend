import React, { useState, useRef, useEffect } from "react";
import styles from "./Slider.module.css";
const Slide = ({ datas }) => {
  const ulRef = useRef(null);
  const liRef = useRef(null);
  const timeoutRef = useRef(null);
  const [itemIndex, setItemIndex] = useState(0);
  const first = useRef(true);
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
    }, 3000);
  }, []);
  useEffect(() => {
    console.log(itemIndex);
    if (isButtonClick.current) {
      //버튼클릭시 다시 interval 종료후 다시 실행
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setInterval(() => {
        setItemIndex((prev) => prev + 1);
        console.log("hi");
      }, 3000);
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
              console.log("hi");
              setItemIndex((prev) => prev + 1);
            } else if (touchEndPoint.current.x - touchStartPoint.current.x > 10) {
              console.log("hi2");
              setItemIndex((prev) => prev - 1);
            }
            isTouching.current = false;
          }}
          ref={ulRef}
        >
          {datas.map((data) => (
            <li
              style={{ backgroundImage: `url(${data.thumbnail})` }}
              ref={liRef}
              key={data.id}
              className={styles.slide_item}
            >
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
    </>
  );
};
export default Slide;
