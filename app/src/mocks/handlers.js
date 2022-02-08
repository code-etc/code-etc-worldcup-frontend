import { rest } from "msw";

const handlers = [
  rest.get("/select/play", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        title: "가지고 싶은 이모지 정해주기",
        select: [
          {
            name: "하트",
            picture: "https://s3.marpple.co/f1/2019/1/1235206_1548918825999_78819.png",
            tagList: "",
          },
          {
            name: "도넛",
            picture: "https://s3.marpple.co/f1/2019/1/1235206_1548918758054_55883.png",
            tagList: "",
          },
        ],
      }),
    );
  }),
];

export default handlers;
