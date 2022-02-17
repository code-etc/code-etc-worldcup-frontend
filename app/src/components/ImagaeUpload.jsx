import { useEffect, useRef, useState } from "react";
import ImageItem from "./ImageItem";
import styles from "./ImageUpload.module.css";

const ImageUpload = ({ name, maxImageNum }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const labelRef = useRef(null);
  const onImageSelect = (event) => {
    if (maxImageNum === items.length) {
      alert("후보자 개수 초과");
      return 0;
    }
    const {
      target: { files },
    } = event;
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
        setItems((prev) => [...prev, item]);
      };
      reader.readAsDataURL(theFile);
    }

    event.target.value = "";
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(items);
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
        setItems((prev) => [...prev, item]);
      };
      reader.readAsDataURL(theFile);
    }
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
  useEffect(() => {
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
