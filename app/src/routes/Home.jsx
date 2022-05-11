import { useState } from "react";
import HomeSelectcup from "../components/HomeSelectcup";
import HomeWorldcup from "../components/HomeWorldcup";

const Home = () => {
  window.onbeforeunload = function (e) {};
  const [tab, setTab] = useState("worldcup");
  const onClickWorldcupTabButton = () => {
    setTab("worldcup");
  };
  const onClickSelectcupTabButton = () => {
    setTab("selectcup");
  };
  return (
    <>
      <div className="mainFont">
        <ul className="flex bg-slate-300 pt-1 pl-1 mb-2 md:pl-5">
          <li>
            <button
              type="button"
              className={`p-[8px] ${tab === "worldcup" ? "rounded-t-lg bg-white" : ""}`}
              onClick={onClickWorldcupTabButton}
            >
              월드컵
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`p-[8px] ${tab === "selectcup" ? "rounded-t-lg bg-white" : ""}`}
              onClick={onClickSelectcupTabButton}
            >
              대신정해주기
            </button>
          </li>
        </ul>

        {tab === "worldcup" ? <HomeWorldcup /> : <HomeSelectcup />}
      </div>
    </>
  );
};
export default Home;
