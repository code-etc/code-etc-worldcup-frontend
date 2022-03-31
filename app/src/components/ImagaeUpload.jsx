import { useEffect, useRef, useState } from "react";
import ImageItem from "./ImageItem";
import axios from "axios";
import cookies from "react-cookies";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
const ImageUpload = ({ name, maxImageNum }) => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setcategory] = useState("남자 연예인");
  const labelRef = useRef(null);
  let count = 0;
  const [countState, setCountState] = useState(1);
  const [isUpload, setIsUpload] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [userid, setUserid] = useState(null);
  const history = useHistory();
  const refCategory = useRef();
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
        console.log("load");
        console.log(theFile);
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
  const onImageSelect = (event) => {
    const {
      target: { files },
    } = event;
    console.log("파일:", files[0]);
    uploadFunc(files);
    event.target.value = "";
  };
  const backUpload = (chain) => {
    console.log("Count:", count);
    const form = new FormData();
    console.log(items[count].title);
    let tagsObj = [];
    for (let i = 0; i < items[count].tags.length; i++) {
      tagsObj[i] = { classifier: items[count].tags[i] };
    }
    console.log(JSON.stringify({ name: items[count].title, tags: tagsObj }));
    form.append(
      "candidate",
      new Blob([JSON.stringify({ name: items[count].title, tags: tagsObj })], { type: "application/json" }),
    );
    form.append("image", items[count].image);
    console.log(form.get("candidate"));
    axios
      .post(chain, form, {
        headers: {
          Authorization: `Bearer ${cookies.load("access-token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => {
        console.log(r);
        count++;
        setCountState(count + 1);
        if (count >= items.length) {
          count = 0;
          setCountState(count + 1);
          setIsUpload(false);
          alert("등록 완료");
          history.push("/");
          return 0;
        } else {
          backUpload(chain);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsUpload(false);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const body = {
      title,
      category,
      items,
    };
    if (title.length === 0) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (items.length <= 2 && name === "이상형 월드컵 등록") {
      alert("후보자는 3개이상 입력해주세요.");
      return;
    }
    if (items.length === 2 && name === "대신 정해주기 등록") {
      alert("후보자를 두개 입력해주세요");
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].title.length === 0) {
        alert("후보자들의 제목을 입력해주세요.");
        return;
      }
    }
    console.log(body);
    setIsUpload(true);
    axios
      .post(
        "/games/strange-brother",
        JSON.stringify({
          userId: userid,
          title: title,
          categories: [{ classifier: category }],
        }),
        {
          headers: {
            Authorization: `Bearer ${cookies.load("access-token")}`,
            "Content-type": "application/json",
          },
        },
      )
      .then((res) => {
        console.log(res);
        console.log(res.data._links["register-candidate"].href);
        const chain = res.data._links["register-candidate"].href.substring(
          res.data._links["register-candidate"].href.search("/games"),
          res.data._links["register-candidate"].href.length,
        );
        console.log("chain", chain);
        backUpload(chain);
      })
      .catch((err) => {
        alert("등록에 실패했습니다.");
        setIsUpload(false);
        console.log(err);
      });
    // title, items 넘기면됨.
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

    setIsOver(false);
    const files = e.dataTransfer.files;
    uploadFunc(files);
    console.log(e.dataTransfer.files);
  };
  const onDragEnter = (e) => {
    e.preventDefault();
  };
  const onDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setIsOver(false);
  };
  const selectHandler = (e) => {
    setcategory(e.target.value);
  };
  useEffect(() => {
    for (let j = 0; j < items.length; j++) {
      items[j].id = j;
    }
  }, [items]);
  useEffect(() => {
    window.onbeforeunload = function (e) {
      return 0;
    };
    const token = cookies.load("access-token");
    console.log(token);
    if (token) {
      const decode = jwt(token);
      console.log(decode);
      axios
        .get(`/accounts/${decode.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setUserid(res.data.userId);
        })
        .catch((err) => {
          console.log(err);
          cookies.remove("access-token");
          cookies.remove("refresh-token");
          history.push("/login");
        });
    } else {
      console.log("노쿠키");
      // history.push("/login");
    }
  }, []);
  return (
    <>
      {isUpload ? (
        <>
          <div className="mainFont fixed z-[50] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] h-[30px] text-center bg-white rounded-[4px]">
            {"업로드 중... ( " + countState + " /" + items.length + " )"}
          </div>
          <div className="fixed z-[30] top-0 left-0 w-[100vw] h-[100vh] bg-slate-400 opacity-50"></div>
        </>
      ) : (
        <></>
      )}
      <form
        className="py-[40px] px-[30px] h-[100vh] mainFont"
        onSubmit={onSubmit}
        action=""
        onDrop={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
      >
        <header className="flex justify-between mb-[30px]">
          <strong className="text-[18px] font-[700]">{name}</strong>
          <button type="submit" className="bg-[transparent] text-[#0554f2] text-[18px] font-[700] cursor-pointer">
            등록하기
          </button>
        </header>
        <main>
          <div className="text-[18px] font-[700] mb-[20px]">제목</div>
          <input
            className="border-b-[1px] border-black w-[100%] text-[18px] mb-[40px] focus:outline-none"
            type="text"
            value={title}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                e.preventDefault();
                refCategory.current.focus();
              }
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div>
            <div className="text-[18px] font-[700] mb-[20px]">카테고리</div>
            <select
              className="text-[18px] w-[100%] h-[30px] text-center mb-[20px] border border-black rounded-[8px]"
              onChange={selectHandler}
              ref={refCategory}
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
          <input
            className="hidden"
            id="chooseFile"
            type="file"
            accept="image/*"
            onChange={onImageSelect}
            multiple={true}
          />

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
        </main>
      </form>
    </>
  );
};

export default ImageUpload;
