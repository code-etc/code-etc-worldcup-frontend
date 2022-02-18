import React, { useEffect, useState } from "react";
import PlaySelectDatas from "./PlaySelectDatas";
import PlaySelectResult from "./PlaySelectResult";

const PlaySelect = () => {
  const [selectTitle, setSelectTitle] = useState("");
  const [selectDatas, setSelectDatas] = useState([]);
  const [clickSelect, setClickSelect] = useState(false);
  const [selectResults, setSelectResults] = useState([]);

  useEffect(() => {
    getSelectDatas();
  }, []);

  useEffect(() => {
    if (clickSelect) {
      getSelectResult();
    }
  }, [clickSelect]);

  const getSelectDatas = async () => {
    const response = await fetch("/select/play/emoji");
    const data = await response.json();
    setSelectDatas([...data.select]);
    setSelectTitle(data.title);
    console.log(selectResults);
  };

  const getSelectResult = async () => {
    const response = await fetch("/select/result/emoji");
    const data = await response.json();
    setSelectResults([...data.select]);
  };

  return (
    <>
      <section className="min-w-[1024px] w-[100%] h-fit mainFont">
        <div className="w-[100%-100px]  mx-[50px]">
          <h2 className="text-[40px] w-fit m-auto">{selectTitle}</h2>
          {selectTitle && <PlaySelectDatas selectDatas={selectDatas} setClickSelect={setClickSelect} />}
        </div>
        <div className="w-[100%]">{selectResults.length > 0 && <PlaySelectResult selectResults={selectResults} />}</div>
      </section>
    </>
  );
};

export default PlaySelect;
