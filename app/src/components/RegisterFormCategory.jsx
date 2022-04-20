import React from "react";

function RegisterFormCategory({ selectHandler, refCategory }) {
  return (
    <div>
      <div className="text-[18px] font-[700] mb-[20px]">카테고리</div>
      <select
        className="text-[18px] w-[100%] h-[30px] text-center mb-[20px] border border-black rounded-[8px]"
        onChange={selectHandler}
        ref={refCategory}
      >
        <option value="남자 연예인">남자 연예인</option>
        <option value="여자 연예인">여자 연예인</option>
        <option value="음식">음식</option>
        <option value="영화/만화">영화/만화</option>
        <option value="드라마">드라마</option>
        <option value="능력">능력</option>
        <option value="게임">게임</option>
        <option value="상황">상황</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}

export default RegisterFormCategory;
