import axios from "axios";
import React, { useState, useEffect } from "react";
import PlayWorldcupCount from "./PlayWorldcupCount";
import PlayWorldcupDatas from "./PlayWorldcupDatas";
import PlayWorldcupWinner from "./PlayWorldcupWinner";
import WorldcupTitle from "./WorldcupTitle";

const PlayWorldcup = () => {
  const [worldcupKind, setWorldcupKind] = useState("");

  const [worldcupTitle, setWorldcupTitle] = useState("");

  const [currentMatchCandidates, setCurrentMatchCandidate] = useState([]);
  const [currentRoundMatches, setCurrentRoundMatches] = useState([]);

  const [currentRoundCount, setCurrentRoundCount] = useState(0);
  const [currentRoundMatchCount, setCurrentRoundMatchCount] = useState(1);
  const [currentRoundTotalMatchCount, setCurrentRoundTotalMatchCount] = useState(0);

  const [clickWorldcup, setClickWorldcup] = useState("");
  const [nextMatchUrl, setNextMatchUrl] = useState("");
  const [worldcupWinner, setWorldcupWinner] = useState("");
  const [chooseCandiate, setChooseCandiate] = useState(false);

  const [worldcupGameId, setWorldcupGameId] = useState("");
  // const [worldcupRound, setWorldcupRound] = useState("");

  // 733ddce7-c2f6-4f59-850c-94358d609815
  // 16e262df-a637-4b16-8816-28cc201cb0ef
  useEffect(() => {
    // 시작하기 버튼 누르면 여기서 시작
    async function getWorldcupPlayInfo() {
      try {
        const getWorldcupGameInfo = await axios({
          url: "/games/strange-brother/16e262df-a637-4b16-8816-28cc201cb0ef",
          method: "GET",
        });
        console.log(getWorldcupGameInfo);
        setWorldcupGameId(getWorldcupGameInfo.data.gameId);
        const getWorldcupGameRoundId = await axios({
          url: "/games/strange-brother/16e262df-a637-4b16-8816-28cc201cb0ef/play",
          method: "POST",
        });
        const getWorldcupCurrentRoundInfo = await axios({
          url: `rounds/${getWorldcupGameRoundId.data.rounds[0]}`,
          method: "GET",
        });
        setCurrentRoundMatches(getWorldcupCurrentRoundInfo.data.matches);
        setWorldcupTitle(getWorldcupGameInfo.data.title);
        setCurrentRoundCount(getWorldcupCurrentRoundInfo.data.matches[0].roundNo);
        setCurrentRoundTotalMatchCount(getWorldcupCurrentRoundInfo.data.matches.length);
      } catch (error) {
        console.log(error);
      }
    }
    getWorldcupPlayInfo();
  }, []);

  useEffect(() => {
    getCurrentMatchCandidate();
  }, [currentRoundMatches]);

  const getCurrentMatchCandidate = () => {
    console.log("getCurrentMatchCandidate");
    if (currentRoundMatches.length === 0) {
      return;
    }
    console.log("getCurrentMatchCandidate return");
    if (currentRoundMatches[currentRoundCount].candidateB) {
      getCurrentMatchBothCandidate();
    } else if (!currentRoundMatches[currentRoundCount].candidateB) {
      getCurrentMatchDefaultCandidate();
    }
  };

  const getCurrentMatchBothCandidate = async () => {
    const getFirstCandidate = await axios({
      url: `games/strange-brother/7be13f83-8319-4998-9fee-a91120c4a94f/candidates/${currentRoundMatches[currentRoundCount].candidateA}`,
      method: "GET",
    });
    const getSecondCandidate = await axios({
      url: `games/strange-brother/7be13f83-8319-4998-9fee-a91120c4a94f/candidates/${currentRoundMatches[currentRoundCount].candidateB}`,
      method: "GET",
    });

    setChooseCandiate(false);
    setCurrentMatchCandidate([getFirstCandidate.data, getSecondCandidate.data]);

    const getFirstCandidateImage = await axios({
      url: `games/strange-brother/7be13f83-8319-4998-9fee-a91120c4a94f/candidates/${currentRoundMatches[currentRoundCount].candidateA}/image`,
      method: "GET",
    });

    console.log(getFirstCandidateImage);

    const blob = new Blob(getFirstCandidateImage.data, { type: "image/jpg" });
    const url = window.URL.createObjectURL(blob);

    const getSecondCandidateImage = await axios({
      url: `games/strange-brother/7be13f83-8319-4998-9fee-a91120c4a94f/candidates/${currentRoundMatches[currentRoundCount].candidateB}/image`,
      method: "GET",
    });

    console.log(getSecondCandidateImage);
  };

  const getCurrentMatchDefaultCandidate = async () => {
    const getWorldcupGameFirstCandidate = await axios({
      url: `games/strange-brother/7be13f83-8319-4998-9fee-a91120c4a94f/candidates/${currentRoundMatches[currentRoundCount].candidateA}`,
      method: "GET",
    });

    setChooseCandiate(false);
    setCurrentMatchCandidate([getWorldcupGameFirstCandidate.data]);
  };

  useEffect(() => {
    if (!chooseCandiate) {
      return;
    }

    const nextRoundMatchCount = currentRoundMatchCount + 1;
    setCurrentRoundMatchCount(nextRoundMatchCount);
    setTimeout(() => {
      getCurrentMatchCandidate();
    }, 2000);
  }, [chooseCandiate]);

  return (
    <>
      <section className="min-w-[640px] w-[100%] h-screen mainFont">
        <div className="w-[100%-100px]  mx-[50px]">
          <WorldcupTitle worldcupTitle={worldcupTitle} />
          {worldcupWinner && <PlayWorldcupWinner worldcupWinner={worldcupWinner} worldcupKind={worldcupKind} />}
          {!worldcupWinner && worldcupTitle && (
            <PlayWorldcupCount
              currentRoundCount={currentRoundCount}
              currentRoundMatchCount={currentRoundMatchCount}
              currentRoundTotalMatchCount={currentRoundTotalMatchCount}
            />
          )}
          {!worldcupWinner && worldcupTitle && (
            <PlayWorldcupDatas
              currentMatchCandidates={currentMatchCandidates}
              setClickWorldcup={setClickWorldcup}
              // currentRoundTotlaMatchCountCount={currentRoundTotlaMatchCountCount}
              setWorldcupWinner={setWorldcupWinner}
              setChooseCandiate={setChooseCandiate}
              chooseCandiate={chooseCandiate}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PlayWorldcup;
