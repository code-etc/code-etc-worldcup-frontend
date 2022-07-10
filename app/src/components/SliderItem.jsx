import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackgroundImage } from "react-image-and-background-image-fade";
import { useHistory } from "react-router-dom";

function SliderItem({ data, loadCount, isLoading, setIsLoading, datasLength }) {
  const [imageUrl, setImageUrl] = useState("");
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  const getNickname = () => {
    axios.get(`/accounts/${data.userId}`).then((res) => setNickname(res.data.nickname));
  };
  const getWorldcupImage = (list) => {
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
        setImageUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goGamePlayPage = () =>
    history.push({
      pathname: `playWorldcup/${data.id}`,
      state: {
        gameId: data.id,
      },
    });
  useEffect(() => {
    getWorldcupImage(data);
    getNickname();
  }, []);
  return (
    <li key={data.id} className="block w-[100vw] h-[250px] md:w-[400px] md:mr-[60px]">
      <button onClick={goGamePlayPage} className="block w-[100%] h-[100%]">
        <BackgroundImage
          src={imageUrl}
          key={data.id}
          className={`flex flex-col relative items-center justify-center w-[100%] h-[250px] text-black text-center bg-white rounded-[3%] bg-contain bg-no-repeat bg-center before:content-[''] before:opacity-50 before:rounded-[3%] before:absolute before:inset-0 before:bg-black`}
          renderLoader={({ hasLoaded, hasFailed }) => {
            if (hasLoaded) {
              loadCount.current++;
              setIsLoading(false);
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
                <button
                  className="text-white font-[600] text-[15px] no-underline z-[100] mr-[10px] text-stroke-black text-stroke"
                  onClick={goGamePlayPage}
                >
                  시작하기
                </button>
                <a
                  className="text-white font-[300] text-[15px] no-underline z-[100] text-stroke-black text-stroke"
                  href={`worldcup/rank/${data.id}`}
                >
                  랭킹보기
                </a>
              </div>
              <div className="absolute right-[10px] bottom-[10px] text-white z-[100] text-stroke-black text-stroke">
                Made by:{nickname}
              </div>
            </>
          )}
        </BackgroundImage>
      </button>
    </li>
  );
}

export default SliderItem;
