module.exports = {
  title: "前端工程化打怪升级手册",
  description: "开局一条狗，如何征服工程化",
  theme: "reco",
  base: "/front-end-engineering-handbook/",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      {
        text: "战场小包",
        items: [
          { text: "Github", link: "https://github.com/zcxiaobao" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/4424090519078430",
          },
        ],
      },
    ],
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "学前必读", path: "/" }],
      },
      {
        title: "模块化",
        path: "/module/origin",
        collapsable: false, // 不折叠
        children: [
          { title: "模块化前世今生", path: "/module/origin" },
          { title: "四大规范", path: "/module/esm" },
        ],
      },
    ],
    subSidebar: "auto",
  },
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
};