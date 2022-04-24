import React from "react";

function NeedLogin({ content }) {
  return (
    <div className="flex flex-col justify-center items-center mainFont absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="whitespace-nowrap	text-[16px] md:text-[24px]">{content}</div>
      <a className="text-[#0554f2]" href="/login">
        로그인 하러 가기
      </a>
    </div>
  );
}

export default NeedLogin;
