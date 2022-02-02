import React, { useRef } from "react";
import styles from "./GNB.module.css";
import { HiMenu } from "react-icons/hi";
const GNB = () => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  return (
    <>
      <nav className={styles.GNB}>
        <a href="/" className={styles.logo}>
          Strange Brother World Cup
        </a>
        {/* Mobile */}
        <button
          className={styles.menu_button}
          onClick={() => {
            sidebarRef.current.classList.add(styles.is_active);
            overlayRef.current.classList.add(styles.is_active);
          }}
        >
          <HiMenu className={styles.menu_icon} />
        </button>
        <ul ref={sidebarRef} className={styles.sidebar}>
          <strong className={styles.logo}>Strange Brother World Cup</strong>
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/registerWorldcup">월드컵 등록</a>
          </li>
          <li>
            <a href="/registerSelect">대신 정해주기 등록</a>
          </li>
          <li>
            <a href="/myPage">마이페이지</a>
          </li>
        </ul>

        {/* Tablet or Desktop */}
        <ul className={styles.nav_right}>
          <strong className={styles.logo}>Strange Brother World Cup</strong>

          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/registerWorldcup">월드컵 등록</a>
          </li>
          <li>
            <a href="/registerSelect">대신 정해주기 등록</a>
          </li>
          <li>
            <a href="/myPage">마이페이지</a>
          </li>
        </ul>
      </nav>

      <div
        ref={overlayRef}
        className={styles.overlay}
        onClick={() => {
          overlayRef.current.classList.remove(styles.is_active);
          sidebarRef.current.classList.remove(styles.is_active);
        }}
      ></div>
    </>
  );
};

export default GNB;
