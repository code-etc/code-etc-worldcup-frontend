import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";

const Home = () => {
  window.onbeforeunload = function (e) {};
  const [loadingWorldcup, setLoadingWorldcup] = useState(true);
  const [loadingSelect, setLoadingSelect] = useState(true);
  const [worldcupLists, setWorldcupLists] = useState([]);
  const [selectLists, setSelectLists] = useState([]);
  const divisionWorldcupList = (arr) => {
    const maxLength = 15;
    for (let i = 0; i < parseInt(arr.length / maxLength) + 1; i++) {
      let list = [];
      if (i === parseInt(arr.length / maxLength) - 1 && arr.length % maxLength < 4) {
        for (let j = 0; j < maxLength + (arr.length % maxLength); j++) {
          list[j] = arr[j + i * maxLength];
        }
        setWorldcupLists((prev) => [...prev, list]);
        console.log(list);
        break;
      } else if (i === parseInt(arr.length / maxLength)) {
        for (let j = 0; j < arr.length % maxLength; j++) {
          list[j] = arr[j + i * maxLength];
        }
      } else {
        for (let j = 0; j < maxLength; j++) {
          list[j] = arr[j + i * maxLength];
        }
      }
      setWorldcupLists((prev) => [...prev, list]);
      console.log(list);
    }
  };
  const divisionSelectList = (arr) => {
    const maxLength = 15;
    for (let i = 0; i < parseInt(arr.length / maxLength) + 1; i++) {
      let list = [];
      if (i === parseInt(arr.length / maxLength) - 1 && arr.length % maxLength < 4) {
        for (let j = 0; j < maxLength + (arr.length % maxLength); j++) {
          list[j] = arr[j + i * maxLength];
        }
        setSelectLists((prev) => [...prev, list]);
        console.log(list);
        break;
      } else if (i === parseInt(arr.length / maxLength)) {
        for (let j = 0; j < arr.length % maxLength; j++) {
          list[j] = arr[j + i * maxLength];
        }
      } else {
        for (let j = 0; j < maxLength; j++) {
          list[j] = arr[j + i * maxLength];
        }
      }
      setSelectLists((prev) => [...prev, list]);
      console.log(list);
    }
  };
  const getWorldcupList = async () => {
    const json = await (await fetch(`https://61fbded03f1e34001792c680.mockapi.io/worldcupList`)).json();
    console.log(json);
    divisionWorldcupList(json);
    setLoadingWorldcup(false);
  };
  const getSelectList = async () => {
    const json = await (await fetch(`https://61fbded03f1e34001792c680.mockapi.io/selectList`)).json();
    console.log(json);
    divisionSelectList(json);
    setLoadingSelect(false);
  };
  useEffect(() => {
    getWorldcupList();
    getSelectList();
  }, []);
  return (
    <>
      {loadingWorldcup || loadingSelect ? (
        <div className="flex justify-center items-center h-screen">
          <div className="font-bold text-lg">Loading</div>
        </div>
      ) : (
        <>
          <div>이상형월드컵</div>
          {worldcupLists.map((worldcuplist, i) => (
            <Slider key={i} datas={worldcuplist} />
          ))}
          <div>대신정해주기</div>
          {selectLists.map((selectlist, i) => (
            <Slider key={i} datas={selectlist} />
          ))}
        </>
      )}
    </>
  );
};
export default Home;
