import { useEffect, useState } from "react";
import styles from "./ImageItem.module.css";
const ImageItem = ({ item, i, onImageItemSetting, deleteItem }) => {
  const [tags, setTags] = useState(item.tags);
  const [tagInput, setTagInput] = useState("");
  const onChangeInput = (e) => {
    onImageItemSetting(e.target.value, item.tags, i);
  };
  const onChangeTextArea = (e) => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    console.log(regex.test(e.target.value));
    if (
      e.target.value[0] === "#" &&
      (e.target.value[e.target.value.length - 1] === "\n" ||
        e.target.value[e.target.value.length - 1] === " " ||
        e.target.value[e.target.value.length - 1] === "#" ||
        regex.test(e.target.value.slice(1, e.target.value.length)))
    ) {
      setTagInput(e.target.value);
      console.log(e.target.value);
    }
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
    if (tagInput[tagInput.length - 1] === " " || tagInput[tagInput.length - 1] === "\n") {
      if (item.tags.length < 10) {
        if (tagInput[0] === "#") {
          setTags([...item.tags, tagInput.slice(1, -1)]);
        } else {
          alert("태그는 #으로 시작해야합니다.");
          setTagInput("");
        }
      } else {
        alert("태그는 10개까지 가능합니다.");
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
    <li className={styles.imageItem}>
      <img className={styles.image} src={item.image} alt="item" />
      <div className={styles.image_container}>
        <div>
          <div className={styles.titleAndButton}>
            <div className={styles.imageTitle}>이미지 설명</div>
            <button className={styles.deleteButton} onClick={onDeleteBtn}>
              삭제
            </button>
          </div>
          <input className={styles.imageTitle_input} type="text" value={item.title} onChange={onChangeInput} />
        </div>
        <div>
          <div className={styles.imageTag}>이미지 태그</div>
          <textarea
            className={styles.imageTag_input}
            placeholder="태그"
            value={tagInput === "" ? "#" + tagInput : tagInput}
            onChange={onChangeTextArea}
            cols={3}
            rows={1}
          />
          <ul className="flex flex-wrap">
            {item.tags.map((tag, i) => (
              <li className="flex text-[12px] bg-slate-200 mb-[2px] mr-[5px] pr-[2px] pl-[2px] rounded-[4px]" key={i}>
                <button id={i} onClick={onDeleteTagBtn}>
                  {"#" + tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default ImageItem;
