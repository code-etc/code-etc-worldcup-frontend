import React, { useEffect, useState } from "react";
import PlaySelectData from "./PlaySelectData";
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
      <div className="min-w-[1024px]">
        <div>
          {selectTitle && (
            <PlaySelectData selectDatas={selectDatas} selectTitle={selectTitle} setClickSelect={setClickSelect} />
          )}
        </div>
        <div className="relative xl:top-[-100px] w-[100%] top-[-200px]">
          {selectResults.length > 0 && <PlaySelectResult selectResults={selectResults} />}
        </div>
      </div>
    </>
  );
};

export default PlaySelect;
