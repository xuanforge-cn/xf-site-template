/**
 * 瑞士极简版 · 全站品牌配置
 *
 * 换品牌只需要改这一个文件。零依赖、零构建。
 * 署名：github.com/xuanforge-cn
 */
window.BRAND = {
  name: "筑野建筑",
  nameEn: "ZHUYE ATELIER",
  monogram: "ZY",
  logoImage: "",
  tagline: "建筑是容器，生活才是内容",
  description:
    "筑野建筑是一间专注住宅、文化与城市更新的事务所，从方案到现场，坚持同一位主创跟到底。",
  lang: "zh-CN",

  theme: {
    paper: "#F7F6F3",
    ink: "#111110",
    muted: "#6B6B66",
    line: "#D8D6CF",
    accent: "#D93A2B",
    dark: "#111110"
  },

  fonts: {
    sans: '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Roboto Mono", Consolas, monospace'
  },

  nav: [
    { label: "项目", href: "work.html" },
    { label: "服务", href: "services.html" },
    { label: "事务所", href: "about.html" },
    { label: "联系", href: "contact.html" }
  ],
  navCta: { label: "开始一个项目", href: "contact.html" },

  contact: {
    email: "studio@zhuye.archi",
    phone: "021 6288 4170",
    phoneHref: "+862162884170",
    address: "上海市徐汇区永嘉路 321 号 2F",
    city: "上海",
    hours: "周一至周五 9:30 – 18:30",
    response: "两个工作日内回复"
  },

  social: [
    { label: "Instagram", href: "#" },
    { label: "小红书", href: "#", note: "zhuye_atelier" },
    { label: "ArchDaily", href: "#" },
    { label: "gooood", href: "#" }
  ],

  footer: {
    headline: "如果你也认为，好建筑应该先回答生活。",
    note: "事务所每年承接 4–6 个项目，从方案到现场由同一位主创负责。",
    legal: ""
  },

  copyright: {
    holder: "github.com/xuanforge-cn",
    url: "https://github.com/xuanforge-cn",
    year: "auto"
  },

  /* 项目数据：image 留空时渲染为空状态，填路径后自动显示图片 */
  work: [
    {
      slug: "library",
      client: "青浦社区图书馆",
      title: "把借书台移到窗边之后",
      year: "2025",
      category: "文化建筑",
      place: "上海 · 青浦",
      area: "2,400 m²",
      summary: "重新组织首层动线，让阅读区与街道发生关系，日均到访人数提升 2.3 倍。",
      image: "",
      featured: true
    },
    {
      slug: "house",
      client: "龙山住宅",
      title: "一栋会随季节改变的房间",
      year: "2024",
      category: "住宅",
      place: "浙江 · 湖州",
      area: "320 m²",
      summary: "用三层错层回应坡地，冬季把阳光引入最深处的厨房。",
      image: "",
      featured: true
    },
    {
      slug: "factory",
      client: "杨浦旧厂房改造",
      title: "保留锈迹，而不是擦掉它",
      year: "2024",
      category: "城市更新",
      place: "上海 · 杨浦",
      area: "6,800 m²",
      summary: "结构加固后保留原有桁架与砖墙，改造为共享办公与社区剧场。",
      image: "",
      featured: true
    },
    {
      slug: "school",
      client: "山谷小学",
      title: "走廊被放大成一座村子",
      year: "2023",
      category: "教育",
      place: "云南 · 大理",
      area: "3,100 m²",
      summary: "把单一走廊拆成院落与台阶，课间活动面积增加 40%。",
      image: "",
      featured: false
    },
    {
      slug: "gallery",
      client: "西岸艺术中心",
      title: "让自然光成为第一位策展人",
      year: "2022",
      category: "文化建筑",
      place: "上海 · 徐汇",
      area: "4,600 m²",
      summary: "屋面天窗按展品类型分区控制，全年照明能耗下降 28%。",
      image: "",
      featured: false
    },
    {
      slug: "walk",
      client: "滨江步道",
      title: "把防洪墙变成可以坐的地方",
      year: "2021",
      category: "景观",
      place: "上海 · 浦东",
      area: "1.8 km",
      summary: "墙体抬高 60 厘米并加设木质座椅，兼顾防汛与日常停留。",
      image: "",
      featured: false
    }
  ]
};
