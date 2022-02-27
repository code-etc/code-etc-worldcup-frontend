import React from "react";

const Login = () => {
  const loginKakao = () => {
    window.location.href = "http://localhost:3000/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/callback";
  };
  const loginGoogle = () => {};
  return (
    <>
      <div className="w-[450px] h-screen border-black border-2 m-auto">
        <h1 className="w-fit text-[40px] mt-24 m-auto">로그인</h1>
        <div
          className="w-[280px] h-[60px] bg-[#F5E14C] rounded-xl mt-24 m-auto shadow-md cursor-pointer"
          onClick={loginKakao}
        >
          <p className="text-[20px] pt-[14px] pl-[86px]">카카오 로그인</p>
        </div>
        <div
          className="w-[280px] h-[60px] border-black rounded-xl border mt-6 m-auto shadow-md cursor-pointer"
          onClick={loginGoogle}
        >
          <p className="text-[20px] pt-[14px] pl-[86px]">구글 로그인</p>
        </div>
        <div className="mt-3 ml-[85px]">
          <p className="text-[14px] decoration-[#707070]">가입된 계정이 없다면 회원가입으로 이어집니다</p>
        </div>
      </div>
    </>
  );
};

export default Login;
