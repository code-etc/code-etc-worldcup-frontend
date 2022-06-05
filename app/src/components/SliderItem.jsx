import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";

function SliderItem({ data, loadCount, isLoading, setIsLoading, datasLength }) {
  const [imageUrl, setImageUrl] = useState("");
  const getWorldcupImage = (list) => {
    console.log(list.candidates[Math.floor(Math.random() * list.candidates.length)]);
    axios
      .get(
        `/games/strange-brother/${list.id}/candidates/${
          list.candidates[Math.floor(Math.random() * list.candidates.length)]
        }/image`,
        {
          responseType: "blob",
          params: {
            width: 0,
            height: 250,
          },
        },
      )
      .then((res) => {
        const blob = new Blob([res.data], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        setImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWorldcupImage(data);
  }, []);
  return (
    <li key={data.id} className="block w-[100vw] h-[250px] md:w-[400px] md:mr-[60px]">
      <a href="/" className="block w-[100%] h-[100%]">
        <BackgroundImage
          src={imageUrl}
          key={data.id}
          className={`flex flex-col relative items-center justify-center w-[100%] h-[250px] text-black text-center bg-white rounded-[3%] bg-contain bg-no-repeat bg-center before:content-[''] before:opacity-50 before:rounded-[3%] before:absolute before:inset-0 before:bg-black`}
          renderLoader={({ hasLoaded, hasFailed }) => {
            if (hasLoaded) {
              loadCount.current++;
              if (loadCount.current === datasLength - 1) {
                setIsLoading(false);
                console.log(datasLength, loadCount.current);
              }
            }
          }}
        >
          {isLoading ? (
            <div className="text-white absolute">로딩중</div>
          ) : (
            <>
              <strong className="text-white mb-[20px] font-[800] text-[24px] z-[100] text-stroke-black text-stroke">
                {data.title}
              </strong>
              <div className="flex">
                <a
                  className="text-white font-[600] text-[15px] no-underline z-[100] mr-[10px] text-stroke-black text-stroke"
                  href="/"
                >
                  시작하기
                </a>
                <a
                  className="text-white font-[300] text-[15px] no-underline z-[100] text-stroke-black text-stroke"
                  href="/"
                >
                  랭킹보기
                </a>
              </div>
              <div className="absolute right-[10px] bottom-[10px] text-white z-[100] text-stroke-black text-stroke">
                Made by:{data.author}
              </div>
            </>
          )}
        </BackgroundImage>
      </a>
    </li>
  );
}

export default SliderItem;
