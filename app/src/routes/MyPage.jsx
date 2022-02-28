import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
const MyPage = () => {
  const [myWorldcupList, setMyWorldcupList] = useState([]);
  const [mySelectList, setMySelectList] = useState([]);
  const [worldcupDisplay, setWorldcupDisplay] = useState(false);
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [nickname, setNickname] = useState("");
  const [place, setPlace] = useState("");
  const [age, setAge] = useState(0);
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
  const getUser = () => {
    // 유저 정보 호출
    setNickname("김대환");
    setPlace("부산");
    setAge(25);
  };
  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };
  const placeHandler = (e) => {
    setPlace(e.target.value);
  };
  const ageHandler = (e) => {
    setAge(e.target.value);
  };
  const onClickInput = (e) => {
    e.preventDefault();
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
    getUser();
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
          <div className="flex flex-col text-[20px] mb-[18px] md:text-[30px] md:mb-[24px]">
            <div className="flex">
              <div className="flex flex-col justify-center mr-[10px] w-[52px] md:mr-[18px] md:w-[80px]">
                <label
                  htmlFor="nickname"
                  className="cursor-pointer focus:text-[#0554f2] active:text-[#0554f2] hover:text-[#0554f2] ease-in-out	duration-200"
                >
                  별명
                </label>
                <div className="text-[8px] mt-[-4px] md:text-[12px] md:mt-[-6px]">클릭해서 수정</div>
              </div>
              <input
                id="nickname"
                className="mb-[5px] border-b-[2px] border-black pointer-events-none"
                type="text"
                placeholder="별명를 입력해주세요"
                value={nickname}
                onChange={nicknameHandler}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col justify-center mr-[10px] w-[52px] md:mr-[18px] md:w-[80px]">
                <label
                  htmlFor="place"
                  className="cursor-pointer focus:text-[#0554f2] active:text-[#0554f2] hover:text-[#0554f2] ease-in-out	duration-200"
                >
                  거주지
                </label>
                <div className="text-[8px] mt-[-4px] md:text-[12px] md:mt-[-6px]">클릭해서 수정</div>
              </div>
              <input
                id="place"
                className="mb-[5px] border-b-[2px] border-black pointer-events-none"
                type="text"
                placeholder="거주지를 입력해주세요"
                value={place}
                onChange={placeHandler}
              />
            </div>

            <div className="flex">
              <div className="flex flex-col justify-center mr-[10px] w-[52px] md:mr-[18px] md:w-[80px]">
                <label
                  htmlFor="age"
                  className="cursor-pointer focus:text-[#0554f2] active:text-[#0554f2] hover:text-[#0554f2] ease-in-out	duration-200"
                >
                  나이
                </label>
                <div className="text-[8px] mt-[-4px] md:text-[12px] md:mt-[-6px]">클릭해서 수정</div>
              </div>
              <input
                id="age"
                className="border-b-[2px] border-black pointer-events-none"
                type="number"
                placeholder="나이를 입력해주세요"
                value={age}
                onChange={ageHandler}
              />
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
