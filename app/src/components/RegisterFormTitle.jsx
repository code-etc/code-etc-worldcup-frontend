import React, { useCallback } from "react";

function RegisterFormTitle({ title, setTitle, refCategory }) {
  const titleKeyDownHandler = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refCategory.current.focus();
    }
  }, []);
  const titleChangeHandler = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title],
  );
  return (
    <>
      <div className="text-[18px] font-[700] mb-[20px]">제목</div>
      <input
        id="titleInput"
        className="border-b-[1px] border-black w-[100%] text-[18px] mb-[40px] focus:outline-none"
        type="text"
        value={title}
        onKeyDown={titleKeyDownHandler}
        onChange={titleChangeHandler}
      />
    </>
  );
}

export default RegisterFormTitle;
