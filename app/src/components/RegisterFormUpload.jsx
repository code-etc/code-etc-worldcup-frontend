import React, { useCallback, useRef, useState } from "react";

function RegisterFormUpload({ maxImageNum, items, setItems }) {
  const labelRef = useRef(null);
  const [isOver, setIsOver] = useState(false);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const files = e.dataTransfer.files;
      uploadFunc(files);
    },
    [isOver, items],
  );
  const onDragEnter = useCallback((e) => {
    e.preventDefault();
  }, []);
  const onDragOver = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(true);
    },
    [isOver],
  );
  const onDragLeave = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
    },
    [isOver],
  );

  const uploadFunc = (files) => {
    let tempItems = [];
    let isSameImg = false;
    const fileCount = files.length;
    if (files.length + items.length > maxImageNum) {
      alert("후보자 개수 초과");
      return 0;
    }
    for (let i = 0; i < fileCount; i++) {
      if (isSameImg) {
        console.log("isSameImg2", isSameImg);
        break;
      }
      const theFile = files[i];
      console.log(theFile);
      const reader = new FileReader();
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvnet) => {
        if (isSameImg) {
          console.log("isSameImg", isSameImg);
          return;
        }
        const {
          currentTarget: { result },
        } = finishedEvnet;

        const item = {
          id: items.length,
          image: theFile,
          preview: result,
          title: "",
          tags: [],
        };
        for (let i = 0; i < items.length; i++) {
          if (items[i].preview === item.preview) {
            isSameImg = true;
            alert("같은 이미지는 올릴 수 없습니다.");
            return;
          }
        }

        tempItems[i] = item;

        if (i === fileCount - 1) {
          //끝날때
          setItems((prev) => [...prev, ...tempItems]);
        }
      };
    }
  };

  const onImageSelect = useCallback(
    (event) => {
      const {
        target: { files },
      } = event;
      console.log("파일:", files[0]);
      uploadFunc(files);
      event.target.value = "";
    },
    [items],
  );
  return (
    <>
      <div className="text-[18px] font-[700] mb-[20px]">이미지 업로드</div>
      <label
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        ref={labelRef}
        className={`flex justify-center items-center w-[100%] h-[60px] px-[10px] border border-[#707070] text-center text-[#707070] transition-[background-color] transition-[opacity] duration-200 ease-in-out mb-[40px]
        ${isOver ? " text-[white] bg-[gray] opacity-30" : " opacity-100"}`}
        htmlFor="chooseFile"
      >
        <div>이미지 파일을 놓거나 클릭하여 업로드하세요.</div>
      </label>
      <input id="chooseFile" className="hidden" type="file" accept="image/*" onChange={onImageSelect} multiple={true} />
    </>
  );
}

export default RegisterFormUpload;
