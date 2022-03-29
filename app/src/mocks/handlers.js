import { rest } from "msw";

const handlers = [
  rest.get("/select/play/emoji", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        title: "가지고 싶은 이모지 정해주기",
        select: [
          {
            name: "웃는 이모지",
            picture:
              "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
          {
            name: "놀란 이모지",
            picture:
              "https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
        ],
      }),
    );
  }),
  rest.get("/select/result/emoji", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        select: [
          {
            name: "하트",
            percent: "46%",
          },
          {
            name: "도넛",
            percent: "54%",
          },
        ],
      }),
    );
  }),
];

export default handlers;
