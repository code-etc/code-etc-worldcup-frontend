import { useCallback, useEffect, useRef } from "react";
import ImageList from "./ImageList";
import RegisterFormCategory from "./RegisterFormCategory";
import RegisterFormTitle from "./RegisterFormTitle";
import RegisterFormUpload from "./RegisterFormUpload";
const ImageUploadForm = ({ maxImageNum, setCategory, title, setTitle, items, setItems }) => {
  const refCategory = useRef();

  const selectHandler = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const onImageItemSetting = (imageTitle, tags, i) => {
    setItems(items.map((item) => (item?.id === i ? { ...item, title: imageTitle, tags } : item)));
  };

  const deleteItem = (index) => {
    setItems(items.filter((item, i) => index !== i));
  };

  useEffect(() => {
    items.forEach((item, i) => (item.id = i));
  }, [items]);

  return (
    <>
      <main>
        <RegisterFormTitle title={title} setTitle={setTitle} refCategory={refCategory} />
        <RegisterFormCategory selectHandler={selectHandler} refCategory={refCategory} />
        <RegisterFormUpload maxImageNum={maxImageNum} items={items} setItems={setItems} />
        <ImageList items={items} onImageItemSetting={onImageItemSetting} deleteItem={deleteItem} />
      </main>
    </>
  );
};

export default ImageUploadForm;
