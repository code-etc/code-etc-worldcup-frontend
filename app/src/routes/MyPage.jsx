import React, { useEffect, useRef, useState } from "react";
import cookies from "react-cookies";
import axios from "axios";
import qs from "qs";
import jwt from "jwt-decode";
import { AiOutlineCaretDown, AiOutlineConsoleSql } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { useHistory } from "react-router-dom";
const MyPage = () => {
  const [myWorldcupList, setmyWorldcupList] = useState([]);
  const [myWorldcupImages, setmyWorldcupImages] = useState([]);
  const [mySelectList, setMySelectList] = useState([]);
  const [worldcupDisplay, setWorldcupDisplay] = useState(false);
  const [selectDisplay, setSelectDisplay] = useState(false);
  const [nickname, setNickname] = useState("");
  const [place, setPlace] = useState("");
  const [age, setAge] = useState(0);
  const [isModify, setIsModify] = useState(false);
  const refWorldcupBtn = useRef();
  const refSelectBtn = useRef();
  const refWorldcupList = useRef();
  const refSelectList = useRef();
  const history = useHistory();
  const inputNickNameRef = useRef();
  const inputPlaceRef = useRef();
  const inputAgeRef = useRef();
  const userIdRef = useRef();
  const getMyWorldcupImages = (list) => {
    console.log(list.candidates[Math.floor(Math.random() * list.candidates.length)]);
    axios
      .get(
        `/games/strange-brother/${list.id}/candidates/${
          list.candidates[Math.floor(Math.random() * list.candidates.length)]
        }/image`,
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access-token")}`,
          },
          responseType: "blob",
          params: {
            width: 0,
            height: 240,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        const blob = new Blob([res.data], { type: "image/png" });
        console.log("아니");
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const obj = {
          gameId: list.gameId,
          thumbnail: url,
          title: list.title,
        };
        setmyWorldcupList((prev) => [...prev, obj].sort((a, b) => (a.gameId < b.gameId ? -1 : 1)));
      })
      .catch((err) => {
        console.log(err);
        const obj = {
          gameId: list.gameId,
          thumbnail: "",
          title: list.title,
        };
        setmyWorldcupList((prev) => [...prev, obj].sort((a, b) => (a.gameId < b.gameId ? -1 : 1)));
      });
  };
  const getMyWorldcup = () => {
    const params = {
      // pageable: {
      page: 0,
      size: 10,
      "user-id": userIdRef.current,
      // random: true,
      // sort: "title,asc",
      // sort: ["title,desc"],
      // },
    };
    console.log(params);
    axios
      .get(`/games/strange-brother`, { params })
      .then((res) => {
        console.log(res.data._embedded.strangeBrotherGameQueryResponses);
        res.data._embedded.strangeBrotherGameQueryResponses.map((list) => {
          getMyWorldcupImages(list);
        });
      })
      .catch((err) => console.log(err));
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
    const token = cookies.load("access-token");
    console.log(token);
    if (token) {
      const decode = jwt(token);
      console.log(decode);
      axios
        .get(`/accounts/${decode.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setNickname(res.data.nickname);
          setPlace(res.data.address ? res.data.address.district : "");
          setAge(res.data.age ? res.data.age : "");
          userIdRef.current = res.data.id;
          getMyWorldcup();
        })
        .catch((err) => {
          console.log(err);
          cookies.remove("access-token");
          cookies.remove("refresh-token");
          history.push("/login");
        });
    } else {
      console.log("노쿠키");
      // history.push("/login");
    }
    // 유저 정보 호출
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
  const deleteHandler = (gameId) => {
    // setmyWorldcupList(myWorldcupList.filter((li) => li.gameId !== gameId));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (isModify) {
      const decode = jwt(cookies.load("access-token"));
      console.log("place", place);
      axios
        .put(
          `/accounts/${userIdRef.current}`,
          JSON.stringify({
            nickname: nickname,
            age: age,
            address: {
              district: place,
            },
            provider: decode.provider,
            role: decode.role,
          }),
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.load("access-token")}`,
            },
          },
        )
        .then((res) => {
          console.log("수정완료", res);
          setNickname(res.data.nickname);
          setPlace(res.data.address ? res.data.address.district : "");
          setAge(res.data.age ? res.data.age : "");
          alert("수정완료");
        })
        .catch((err) => console.log("수정실패", err));
      setIsModify(false);
    } else {
      setIsModify(true);
    }
  };
  useEffect(() => {
    if (isModify) {
      inputNickNameRef.current.focus();
    }
  }, [isModify]);
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
    // getMyWorldcup();
    // getMySelect();
    getUser();
  }, []);

  return (
    <div className="mainFont">
      <form className="py-[40px] px-[30px]" onSubmit={submitHandler}>
        <header className="flex justify-between text-[18px] font-[700] mb-[30px]">
          <strong>마이 페이지</strong>
          <button
            className="text-[#0554f2] active:opacity-[60%] hover:opacity-[60%] ease-in-out	duration-200"
            type="submit"
          >
            {isModify ? "수정완료" : "수정하기"}
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
              </div>
              <input
                id="nickname"
                className={"mb-[5px] border-b-[2px] border-black" + (isModify ? "" : " pointer-events-none")}
                type="text"
                placeholder="별명를 입력해주세요"
                value={nickname}
                ref={inputNickNameRef}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    e.preventDefault();
                    inputPlaceRef.current.focus();
                  }
                }}
                onChange={nicknameHandler}
                disabled={isModify ? false : true}
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
              </div>
              <input
                id="place"
                className={"mb-[5px] border-b-[2px] border-black" + (isModify ? "" : " pointer-events-none")}
                type="text"
                placeholder="거주지를 입력해주세요"
                value={place}
                ref={inputPlaceRef}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    e.preventDefault();
                    inputAgeRef.current.focus();
                  }
                }}
                onChange={placeHandler}
                disabled={isModify ? false : true}
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
              </div>
              <input
                id="age"
                className={"border-b-[2px] border-black" + (isModify ? "" : " pointer-events-none")}
                type="number"
                placeholder="나이를 입력해주세요"
                value={age}
                ref={inputAgeRef}
                onChange={ageHandler}
                disabled={isModify ? false : true}
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
                      className={`relative flex justify-center items-center bg-slate-300 bg-gray w-[100%] h-[230px] mb-[10px] md:w-[400px] md:h-[240px] md:mr-[20px]`}
                    >
                      <img src={item.thumbnail} className="absolute opacity-50 object-contain h-[100%]" alt="" />
                      <div className="text-center z-10">
                        <strong>{item.title}</strong>
                        <div className="flex justify-center items-center">
                          <a href="/" className="mr-[10px]">
                            시작하기
                          </a>
                          <a href="/" className="mr-[10px]">
                            랭킹보기
                          </a>
                          <a href="/modify">수정하기</a>
                        </div>
                      </div>

                      <button type="button" className="absolute top-0 right-0 p-[10px]">
                        <TiDelete className="text-[24px]" onClick={() => deleteHandler(item.gameId)} />
                      </button>
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
