import { useEffect, useRef, useState } from "react";
import ImageItem from "./ImageItem";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({ name, maxImageNum }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setcategory] = useState("");
  const labelRef = useRef(null);
  const uploadFunc = (files) => {
    if (maxImageNum === items.length) {
      alert("후보자 개수 초과");
      return 0;
    }
    for (let i = 0; i < files.length; i++) {
      const theFile = files[i];
      const reader = new FileReader();
      reader.onloadend = (finishedEvnet) => {
        const {
          currentTarget: { result },
        } = finishedEvnet;
        const item = {
          id: items.length,
          image: result,
          title: "",
          tags: [],
        };
        for (let i = 0; i < items.length; i++) {
          if (items[i].image === item.image) {
            alert("같은 이미지는 올릴 수 없습니다.");
            return;
          }
        }
        setItems((prev) => [...prev, item]);
      };
      reader.readAsDataURL(theFile);
    }
  };
  const onImageSelect = (event) => {
    const {
      target: { files },
    } = event;
    uploadFunc(files);
    event.target.value = "";
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      title,
      category,
      items,
    };
    console.log(body);
    //title, items 넘기면됨.
  };
  const onImageItemSetting = (imageTitle, tags, i) => {
    setItems(items.map((item) => (item.id === i ? { ...item, title: imageTitle, tags } : item)));
    console.log(items);
  };
  const deleteItem = (index) => {
    setItems(items.filter((item, i) => index !== i));
  };
  const onDrop = (e) => {
    e.preventDefault();

    labelRef.current.classList.remove(styles.is_over);
    const files = e.dataTransfer.files;
    uploadFunc(files);
    console.log(e.dataTransfer.files);
  };
  const onDragEnter = (e) => {
    e.preventDefault();
  };
  const onDragOver = (e) => {
    e.preventDefault();
    labelRef.current.classList.add(styles.is_over);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    labelRef.current.classList.remove(styles.is_over);
  };
  const selectHandler = (e) => {
    setcategory(e.target.value);
  };
  useEffect(() => {
    window.onbeforeunload = function (e) {
      return 0;
    };
    for (let j = 0; j < items.length; j++) {
      items[j].id = j;
    }
  }, [items]);
  return (
    <>
      <form
        className={styles.container}
        onSubmit={onSubmit}
        action=""
        onDrop={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
      >
        <header className={styles.header}>
          <strong className={styles.title}>{name}</strong>
          <button type="submit">등록하기</button>
        </header>
        <main>
          <div className={styles.title}>제목</div>
          <input
            className={styles.title_input}
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            <div className="text-[18px] font-[700] mb-[20px]">카테고리</div>
            <select
              className="text-[18px] w-[100%] h-[30px] text-center mb-[20px] border border-black rounded-[8px]"
              onChange={selectHandler}
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
          <div className={styles.title}>이미지 업로드</div>
          <label
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            ref={labelRef}
            className={styles.imageInput}
            htmlFor="chooseFile"
          >
            <div>이미지 파일을 놓거나 클릭하여 업로드하세요.</div>
          </label>
          <input
            style={{
              display: "none",
            }}
            id="chooseFile"
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            multiple={true}
          />

          <div className={styles.title}>이미지 정보 추가</div>
          <ul className={styles.imageList}>
            {items.map((item, i) => (
              <ImageItem key={i} item={item} i={i} onImageItemSetting={onImageItemSetting} deleteItem={deleteItem} />
            ))}
          </ul>
        </main>
      </form>
    </>
  );
};

export default ImageUpload;
