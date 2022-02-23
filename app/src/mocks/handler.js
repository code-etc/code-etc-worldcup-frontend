import { rest } from "msw";

const handlers = [
  rest.get("/worldcup/play/wanttoeatmeat/1-3", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        worldcupCount: [1, 3],
        title: "먹고 싶은 고기 월드컵",
        select: [
          {
            name: "돼지고기",
            picture:
              "https://images.unsplash.com/photo-1633358800265-3a5a8f7a7cf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
          {
            name: "소고기",
            picture:
              "https://images.unsplash.com/photo-1619719015339-133a130520f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
        ],
        "next-match": "/worldcup/play/wanttoeatmeat/2-3",
      }),
    );
  }),
  rest.get("/worldcup/play/wanttoeatmeat/2-3", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        worldcupCount: [2, 3],
        title: "먹고 싶은 고기 월드컵",
        select: [
          {
            name: "닭고기",
            picture:
              "https://images.unsplash.com/photo-1602534956586-2f4997a5a8ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
          {
            name: "양고기",
            picture:
              "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
        ],
        "next-match": "/worldcup/play/wanttoeatmeat/3-3",
      }),
    );
  }),
  rest.get("/worldcup/play/wanttoeatmeat/3-3", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        worldcupCount: [3, 3],
        title: "먹고 싶은 고기 월드컵",
        select: [
          {
            name: "닭고기",
            picture:
              "https://images.unsplash.com/photo-1602534956586-2f4997a5a8ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
          {
            name: "돼지고기",
            picture:
              "https://images.unsplash.com/photo-1633358800265-3a5a8f7a7cf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            tagList: "",
          },
        ],
      }),
    );
  }),
  rest.get("/worldcup/rank/wanttoeatmeat", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        title: "먹고 싶은 고기 월드컵",
        rankList: [
          {
            name: "닭고기",
            picture:
              "https://images.unsplash.com/photo-1602534956586-2f4997a5a8ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "40",
          },
          {
            name: "돼지고기",
            picture:
              "https://images.unsplash.com/photo-1633358800265-3a5a8f7a7cf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "30",
          },
          {
            name: "양고기",
            picture:
              "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "12",
          },
          {
            name: "소고기",
            picture:
              "https://images.unsplash.com/photo-1619719015339-133a130520f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "4",
          },
        ],
      }),
    );
  }),
];

export default handlers;
