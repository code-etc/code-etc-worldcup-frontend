import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import cookies from "react-cookies";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import ImageUploadForm from "../components/ImagaeUploadForm";
import RegisterFormHeader from "../components/RegisterFormHeader";
const RegisterSelect = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("남자 연예인");
  let count = 0;
  const [countState, setCountState] = useState(1);
  const [isUpload, setIsUpload] = useState(false);
  const [userid, setUserid] = useState(null);
  const history = useHistory();

  const preventEvent = useCallback((e) => {
    e.preventDefault();
  }, []);
  const backUpload = (chain) => {
    console.log("Count:", count);
    const form = new FormData();
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
    if (title.length === 0) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (items.length === 2) {
      alert("후보자를 두개 입력해주세요");
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].title.length === 0) {
        alert("후보자들의 제목을 입력해주세요.");
        return;
      }
    }
    setIsUpload(true);
    axios
      .post(
        "/games/strange-brother",
        JSON.stringify({
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
  };
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
        onDrop={preventEvent}
        onDragEnter={preventEvent}
        onDragOver={preventEvent}
        onDragLeave={preventEvent}
      >
        <RegisterFormHeader name="대신정해주기 등록" />
        <ImageUploadForm
          maxImageNum={2}
          setCategory={setCategory}
          title={title}
          setTitle={setTitle}
          items={items}
          setItems={setItems}
        />
      </form>
    </>
  );
};

export default RegisterSelect;
