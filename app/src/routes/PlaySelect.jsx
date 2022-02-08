import React, { useEffect, useState } from "react";
import PlaySelectData from "./PlaySelectData";

const PlaySelect = () => {
  const [selectTitle, setSelectTitle] = useState("");
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    getSelectDatas();
  }, []);

  const getSelectDatas = async () => {
    const response = await fetch("/select/play");
    const data = await response.json();
    setSelects([...data.select]);
    setSelectTitle(data.title);
  };

  return (
    <>
      <div>{selectTitle && <PlaySelectData selects={selects} selectTitle={selectTitle} />}</div>
    </>
  );
};

export default PlaySelect;
