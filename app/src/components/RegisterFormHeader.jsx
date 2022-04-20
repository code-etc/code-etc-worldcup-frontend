import React from "react";

function RegisterFormHeader({ name }) {
  return (
    <header className="flex justify-between mb-[30px]">
      <strong className="text-[18px] font-[700]">{name}</strong>
      <button
        id="submitButton"
        type="submit"
        className="bg-[transparent] text-[#0554f2] text-[18px] font-[700] cursor-pointer"
      >
        등록하기
      </button>
    </header>
  );
}

export default RegisterFormHeader;
