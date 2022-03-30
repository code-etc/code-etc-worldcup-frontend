import { rest } from "msw";

const handlers = [
  rest.get("/worldcup/play/wanttogocity/1-4", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        worldcupCount: [1, 4],
        title: "가고 싶은 도시 월드컵",
        select: [
          {
            name: "서울",
            picture:
              "https://images.unsplash.com/photo-1532085755448-a67fd3b518b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
          {
            name: "도쿄",
            picture:
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
        ],
        "next-match": "/worldcup/play/wanttogocity/2-4",
      }),
    );
  }),
  rest.get("/worldcup/play/wanttogocity/2-4", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        worldcupCount: [2, 4],
        title: "가고 싶은 도시 월드컵",
        select: [
          {
            name: "뉴욕",
            picture:
              "https://images.unsplash.com/photo-1510673354311-c81bb8506fc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
          {
            name: "홍콩",
            picture:
              "https://images.unsplash.com/photo-1558281686-c8514528eab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
        ],
        "next-match": "/worldcup/play/wanttogocity/3-4",
      }),
    );
  }),
  rest.get("/worldcup/play/wanttogocity/3-4", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        worldcupCount: [3, 4],
        title: "가고 싶은 도시 월드컵",
        select: [
          {
            name: "런던",
            picture:
              "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
        ],
        "next-match": "/worldcup/play/wanttogocity/4-4",
      }),
    );
  }),
  rest.get("/worldcup/play/wanttogocity/4-4", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        worldcupCount: [4, 4],
        title: "가고 싶은 도시 월드컵",
        select: [
          {
            name: "서울",
            picture:
              "https://images.unsplash.com/photo-1532085755448-a67fd3b518b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
          {
            name: "뉴욕",
            picture:
              "https://images.unsplash.com/photo-1510673354311-c81bb8506fc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&width=780&height=700",
            tagList: "",
          },
        ],
      }),
    );
  }),
  rest.get("/worldcup/rank/wanttogocity", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        title: "가고 싶은 도시 월드컵",
        rankList: [
          {
            name: "뉴욕",
            picture:
              "https://images.unsplash.com/photo-1510673354311-c81bb8506fc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "40",
          },
          {
            name: "서울",
            picture:
              "https://images.unsplash.com/photo-1532085755448-a67fd3b518b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "30",
          },
          {
            name: "홍콩",
            picture:
              "https://images.unsplash.com/photo-1558281686-c8514528eab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "12",
          },
          {
            name: "런던",
            picture:
              "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "4",
          },
          {
            name: "도쿄",
            picture:
              "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "2",
          },
          {
            name: "LA",
            picture:
              "https://images.unsplash.com/photo-1542737579-ba0a385f3b84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "0.2",
          },
          {
            name: "시드니",
            picture:
              "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
            winRate: "0.1",
          },
        ],
      }),
    );
  }),
];

export default handlers;
