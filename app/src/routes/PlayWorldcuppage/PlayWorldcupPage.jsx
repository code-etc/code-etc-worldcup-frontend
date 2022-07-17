import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlayWorldcupCount from "./PlayWorldcupCount";
import PlayWorldcupDatas from "./PlayWorldcupDatas";
import PlayWorldcupWinner from "./PlayWorldcupWinner";
import WorldcupSelectResult from "./WorldcupSelectResult";
import WorldcupTitle from "./WorldcupTitle";

const PlayWorldcup = () => {
  const [worldcupTitle, setWorldcupTitle] = useState("");
  const [worldcupMatchCount, setWorldcupMatchCount] = useState([]);
  const [worldcupMatchList, setWorldcupMatchList] = useState([]);
  const [currentMatch, setCurrentMatch] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  // 후보자 이미지 정보
  const [candidateImage, setCandidateImage] = useState([]);
  const [playId, setPlayId] = useState("");

  const [selectCandidate, setSelectCandidate] = useState(false);
  const [matchWinner, setMatchWinner] = useState(["", ""]);

  const [worldcupWinner, setWorldcupWinner] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getWorldcupPlayInfo = async () => {
      try {
        const gameInfo = await axios({
          url: `/games/strange-brother/${location.state.gameId}`,
          method: "GET",
        });

        // 게임 라운드
        const gameRoundInfo = await axios({
          url: `/games/strange-brother/${location.state.gameId}/play`,
          method: "POST",
        });

        // 게임 라운드 정보
        const gameCurrentRoundInfo = await axios({
          url: `/game-service/rounds/${gameRoundInfo.data.rounds[0]}`,
          method: "GET",
        });

        setWorldcupTitle(gameInfo.data.title);
        setWorldcupMatchCount([0, gameCurrentRoundInfo.data.matches.length]);
        setWorldcupMatchList(gameCurrentRoundInfo.data.matches);
        setCurrentMatch(0);
        setPlayId(gameCurrentRoundInfo.data.play.id);
      } catch (error) {
        console.log(error);
      }
    };

    getWorldcupPlayInfo();
  }, []);

  useEffect(() => {
    const getNextRound = async () => {
      try {
        const nextRoundInfo = await axios({
          url: `/game-service/plays/${playId}/round/next`,
          method: "POST",
        });

        setWorldcupMatchCount([0, nextRoundInfo.data.matches.length]);
        setWorldcupMatchList(nextRoundInfo.data.matches);
        setCurrentMatch(0);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentMatch === worldcupMatchCount[1]) {
      if (!worldcupWinner) {
        setTimeout(() => {
          getNextRound();
        }, 100);
      }
      return;
    }
    const getCandidateInfo = async () => {
      if (worldcupMatchList.length === 0) return;

      try {
        const candidateAInfo = await axios({
          url: `/games/strange-brother/${location.state.gameId}/candidates/${worldcupMatchList[currentMatch].candidateA}`,
          method: "GET",
        });
        // 첫번째 후보자 이미지 정보 요청
        let candidateAImage = "";
        axios
          .get(
            `/games/strange-brother/${location.state.gameId}/candidates/${worldcupMatchList[currentMatch].candidateA}/image`,
            {
              responseType: "blob",
              params: {
                width: 0,
                height: 400,
              },
            },
          )
          .then((res) => {
            const blob = new Blob([res.data], { type: "image/png" });
            candidateAImage = window.URL.createObjectURL(blob);
          });

        let candidateBInfo = "";
        let candidateBImage = "";
        if (worldcupMatchList[currentMatch].candidateB) {
          candidateBInfo = await axios({
            url: `/games/strange-brother/${location.state.gameId}/candidates/${worldcupMatchList[currentMatch].candidateB}`,
            method: "GET",
          });
          // 두번째 후보자 이미지 정보 요청

          axios
            .get(
              `/games/strange-brother/${location.state.gameId}/candidates/${worldcupMatchList[currentMatch].candidateB}/image`,
              {
                responseType: "blob",
                params: {
                  width: 0,
                  height: 400,
                },
              },
            )
            .then((res) => {
              const blob = new Blob([res.data], { type: "image/png" });
              candidateBImage = window.URL.createObjectURL(blob);
            });
          // candidateBImage = await axios(
          //   {
          //     url: `/games/strange-brother/${location.state.gameId}/candidates/${worldcupMatchList[currentMatch].candidateB}/image`,
          //     method: "get",
          //   },
          //   {
          //     responseType: "blob",
          //     params: {
          //       width: 400,
          //       height: 400,
          //     },
          //   },
          // ).then((res) => {
          //   const blob = new Blob([res.data], { type: "image/png" });
          //   return window.URL.createObjectURL(blob);
          // });
        }

        setTimeout(() => {
          setWorldcupMatchCount([currentMatch + 1, worldcupMatchCount[1]]);
          setCandidateList([candidateAInfo, candidateBInfo]);
          // 두 후보자 이미지 정보 저장
          setCandidateImage([candidateAImage, candidateBImage]);
          setSelectCandidate(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };

    getCandidateInfo();
  }, [currentMatch]);

  if (candidateList.length === 0) {
    return <p className="mainFont sm:text-[40px] align-middle w-fit m-auto text-[30px]">로딩중</p>;
  }

  return (
    <section className="min-w-[640px] w-[100%] h-screen mainFont">
      <div className="w-[100%-100px]  mx-[50px]">
        <WorldcupTitle worldcupTitle={worldcupTitle} />
        {worldcupWinner && <PlayWorldcupWinner worldcupWinner={matchWinner} />}
        {!worldcupWinner && worldcupTitle && <PlayWorldcupCount worldcupMatchCount={worldcupMatchCount} />}
        {!worldcupWinner && worldcupTitle && (
          <PlayWorldcupDatas
            worldcupMatchList={worldcupMatchList}
            candidateList={candidateList}
            candidateImage={candidateImage}
            setWorldcupWinner={setWorldcupWinner}
            currentMatch={currentMatch}
            setCurrentMatch={setCurrentMatch}
            selectCandidate={selectCandidate}
            setSelectCandidate={setSelectCandidate}
            matchWinner={matchWinner}
            setMatchWinner={setMatchWinner}
          />
        )}
      </div>
    </section>
  );
};

export default PlayWorldcup;
