// import React, { useState } from "react";
import axios from "axios";

const getWorldcupPlayInfo = async () => {
  try {
    const response = await axios({
      url: "/games/strange-brother/98be60fc-9e56-482d-87b4-4fefe57af5aa/play",
      method: "POST",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const playWolrdcupApi = async () => {
  // const [qwer, setQwer] = useState("");
  try {
    const response = await axios({
      url: "/games/strange-brother/98be60fc-9e56-482d-87b4-4fefe57af5aa/play",
      method: "POST",
    });
    console.log(response);
    console.log(response.data);

    const play = await axios({
      url: `/plays/${response.data.playId}`,
      method: "GET",
    });
    console.log("plays", play);

    const rounds = await axios({
      url: `/rounds/${play.data.rounds[0]}`,
      method: "GET",
    });
    console.log("rounds", rounds);
    console.log("rounds", rounds.data.matches[0]);

    const candiate1 = await axios({
      url: `/games/strange-brother/98be60fc-9e56-482d-87b4-4fefe57af5aa/candidates/${rounds.data.matches[0].candidateA}`,
      method: "GET",
    });
    console.log("첫번째 후보자", candiate1);

    const candidate2 = await axios({
      url: `/games/strange-brother/98be60fc-9e56-482d-87b4-4fefe57af5aa/candidates/${rounds.data.matches[1].candidateA}`,
      method: "GET",
    });
    console.log("두번쨰 후보자", candidate2);

    // const candiateIMG = await axios({
    //   url: `/games/strange-brother/8683f213-f850-45ff-9b20-b33f4bf180b8/candidates/${rounds.data.matches[0].candidateA}/image?width=780&height=780`,
    //   method: "GET",
    // });
    // console.log(candiateIMG);
    // setQwer(`http://localhost:3000/${candiate.data.imageURI}`);

    // /games/strange-brother/8683f213-f850-45ff-9b20-b33f4bf180b8/candidates/2a234aa3-1a53-47c3-8c43-83af8731349a

    //       const data1 = await axios({
    //         url: `/rounds/${response.data.rounds[0]}`,
    //         method: "GET",
    //       });
    //       console.log(data1);
    //
    //       const candidate1 = await axios({
    //         url: `/games/strange-brother/${response.data.game}/candiates/${data1.data.matches[0].candidateA}`,
    //         method: "GET",
    //       });
    //       console.log(candidate1);
    //
    //       const candidate2 = await axios({
    //         url: `/games/strange-brother/${response.data.game}/candiates/${data1.data.matches[0].candidateB}`,
    //         method: "GET",
    //       });
    //       console.log(candidate2);
  } catch (e) {
    console.log(e);
  }
};

export { getWorldcupPlayInfo };
