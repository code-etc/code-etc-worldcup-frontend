import { useEffect, useRef, useState } from "react";
const ImageItem = ({ item, i, onImageItemSetting, deleteItem }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const refTag = useRef();
  useEffect(() => {
    setTags(item.tags);
  }, []);
  const onChangeInput = (e) => {
    onImageItemSetting(e.target.value, item.tags, i);
  };
  const onChangeTextArea = (e) => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    console.log(regex.test(e.target.value));

    setTagInput(e.target.value);
    console.log(e.target.value);
  };
  const onDeleteBtn = (e) => {
    deleteItem(i);
    console.log("여기 i ", i, " tags: ", item.tags);
  };
  const onDeleteTagBtn = (e) => {
    console.log(e.target.id);
    setTags(item.tags.filter((tag, i) => i !== Number(e.target.id)));
  };
  useEffect(() => {
    const regex = /^[ㄱ-ㅎ||가-힣|a-z|A-Z|0-9|ㅏ-ㅣ|]+$/;

    if (tagInput[tagInput.length - 1] === " " || tagInput[tagInput.length - 1] === "\n") {
      if (regex.test(tagInput.slice(0, -1))) {
        if (item.tags.length < 10) {
          setTags([...item.tags, tagInput.slice(0, -1)]);
        } else {
          alert("태그는 10개까지 가능합니다.");
          setTagInput("");
        }
      } else {
        alert("태그에 특수기호는 들어갈 수 없습니다.");
        setTagInput("");
      }
    }
  }, [tagInput]);
  useEffect(() => {
    onImageItemSetting(item.title, tags, i);
    setTagInput("");
    console.log(tags);
  }, [tags]);
  return (
    <li className="flex max-w-[300px] m-[10px]">
      <img className="object-contain w-[150px] h-[150px] mr-[20px]" src={item ? item.preview : ""} alt="item" />
      <div className="flex flex-col justify-start">
        <div>
          <div className="flex justify-between items-center">
            <div className="text-[12px] font-[800]">이미지 설명</div>
            <button
              type="button"
              className="text-[12px] font-[800] bg-[transparent] text-[red] outlined-none cursor-pointer"
              onClick={onDeleteBtn}
              tabIndex={-1}
            >
              삭제
            </button>
          </div>
          <input
            className="text-[12px] w-[100%] outline-none border-b border-black resize-none focus:outline-none"
            placeholder="설명"
            type="text"
            value={item ? item.title : ""}
            onChange={onChangeInput}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                e.preventDefault();
                refTag.current.focus();
              }
            }}
          />
        </div>
        <div>
          <div className="text-[12px] font-[800]">이미지 태그</div>
          <div className="flex text-[12px] border-solid border-b-[1px] border-black">
            <span className="">#</span>
            <textarea
              ref={refTag}
              className="text-[12px] w-[100%] outline-none resize-none focus:outline-none"
              placeholder="태그"
              value={tagInput}
              onChange={onChangeTextArea}
              cols={3}
              rows={1}
            />
          </div>
          <ul className="flex flex-wrap">
            {item.tags ? (
              item.tags.map((tag, i) => (
                <li className="flex text-[12px] bg-slate-200 mb-[2px] mr-[5px] pr-[2px] pl-[2px] rounded-[4px]" key={i}>
                  <button type="button" id={i} onClick={onDeleteTagBtn}>
                    {"#" + tag}
                  </button>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default ImageItem;
