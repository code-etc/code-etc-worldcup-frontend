import styles from "./ImageItem.module.css";
const ImageItem = ({ item, i, onImageItemSetting, deleteItem }) => {
  const onChangeInput = (e) => {
    onImageItemSetting(e.target.value, i);
  };
  const onDeleteBtn = (e) => {
    deleteItem(i);
  };
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
          <input className={styles.imageTag_input} type="text" />
        </div>
      </div>
    </li>
  );
};

export default ImageItem;
