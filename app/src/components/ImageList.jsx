import React from "react";
import ImageItem from "./ImageItem";

function ImageList({ items, onImageItemSetting, deleteItem }) {
  return (
    <>
      <div className="text-[18px] font-[700] mb-[20px]">이미지 정보 추가</div>
      <ul className="flex flex-wrap">
        {items ? (
          items.map((item, i) => (
            <ImageItem key={i} item={item} i={i} onImageItemSetting={onImageItemSetting} deleteItem={deleteItem} />
          ))
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}

export default ImageList;
