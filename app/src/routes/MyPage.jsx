import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
const MyPage = () => {
  const [myWorldcupList, setMyWorldcupList] = useState([]);
  const [mySelectList, setMySelectList] = useState([]);
  const [worldcupDisplay, setWorldcupDisplay] = useState(false);
  const [selectDisplay, setSelectDisplay] = useState(false);
  const refWorldcupBtn = useRef();
  const refSelectBtn = useRef();
  const refWorldcupList = useRef();
  const refSelectList = useRef();
  const getMyWorldcup = async () => {
    const json = await (await fetch(`https://61fbded03f1e34001792c680.mockapi.io/myWorldcup`)).json();
    console.log(json);
    setMyWorldcupList(json);
  };
  const getMySelect = async () => {
    const json = await (await fetch(`https://61fbded03f1e34001792c680.mockapi.io/myWorldcup`)).json();
    console.log(json);
    setMySelectList(json);
  };
  const displayWorldcupHandler = () => {
    setWorldcupDisplay((prev) => !prev);
  };
  const displaySelectHandler = () => {
    setSelectDisplay((prev) => !prev);
  };
  useEffect(() => {
    if (worldcupDisplay) {
      refWorldcupBtn.current.classList.remove("rotate-180");
    } else {
      refWorldcupBtn.current.classList.add("rotate-180");
    }
  }, [worldcupDisplay]);
  useEffect(() => {
    if (selectDisplay) {
      refSelectBtn.current.classList.remove("rotate-180");
    } else {
      refSelectBtn.current.classList.add("rotate-180");
    }
  }, [selectDisplay]);
  useEffect(() => {
    getMyWorldcup();
    // getMySelect();
  }, []);
  return (
    <div className="mainFont">
      <form className="py-[40px] px-[30px]" action="">
        <header className="flex justify-between text-[18px] font-[700] mb-[30px]">
          <strong>마이 페이지</strong>
          <button className="text-[#0554f2]" type="submit">
            수정하기
          </button>
        </header>

        <main>
          <div className="flex text-[18px] mb-[24px] md:text-[28px]">
            <div className="flex flex-col mr-[10px]">
              <label htmlFor="nickname" className="mb-[5px]">
                별명
              </label>
              <label htmlFor="place" className="mb-[5px]">
                거주지
              </label>
              <label htmlFor="age">나이</label>
            </div>

            <div className="flex flex-col">
              <input
                id="nickname"
                className="mb-[5px] border-b-[2px] border-black"
                type="text"
                placeholder="별명를 입력해주세요"
              />
              <input
                id="place"
                className="mb-[5px] border-b-[2px] border-black"
                type="text"
                placeholder="거주지를 입력해주세요"
              />
              <input id="age" className="border-b-[2px] border-black" type="text" placeholder="나이를 입력해주세요" />
            </div>
          </div>
          <div className="md:flex md:justify-between">
            <div className="mb-[15px] basis-2/5">
              <div className="flex justify-between">
                <strong>내가 등록한 월드컵</strong>
                <button
                  className="transition duration-200 ease-in-out md:hidden"
                  ref={refWorldcupBtn}
                  type="button"
                  onClick={displayWorldcupHandler}
                >
                  <AiOutlineCaretDown />
                </button>
              </div>
              {worldcupDisplay ? (
                <div>펼치기 클릭</div>
              ) : myWorldcupList.length === 0 ? (
                <div>등록한 월드컵이 없습니다.</div>
              ) : (
                <ul ref={refWorldcupList} className="md:flex md:flex-wrap">
                  {myWorldcupList.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-center items-center bg-slate-300 bg-gray w-[100%] h-[230px] mb-[10px] md:w-[400px] md:h-[240px] md:mr-[20px]"
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <div className="flex justify-center items-center">
                          <a href="/" className="mr-[10px]">
                            시작하기
                          </a>
                          <a href="/">랭킹보기</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-[15px] basis-2/5">
              <div className="flex justify-between">
                <strong>내가 등록한 대신정해주기</strong>
                <button
                  className="transition duration-200 ease-in-out md:hidden"
                  ref={refSelectBtn}
                  type="button"
                  onClick={displaySelectHandler}
                >
                  <AiOutlineCaretDown />
                </button>
              </div>
              {selectDisplay ? (
                <div>펼치기 클릭</div>
              ) : mySelectList.length === 0 ? (
                <div>등록한 대신정해주기가 없습니다.</div>
              ) : (
                <ul ref={refSelectList} className="md:flex md:flex-wrap">
                  {mySelectList.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-center items-center bg-slate-300 bg-gray w-[100%] h-[230px] mb-[10px] md:w-[400px] md:h-[240px] md:mr-[20px]"
                    >
                      <div>
                        <strong>{item.title}</strong>
                        <div className="flex justify-center items-center">
                          <a href="/" className="mr-[10px]">
                            시작하기
                          </a>
                          <a href="/">랭킹보기</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      </form>
    </div>
  );
};

export default MyPage;
