/**
 * 全站品牌配置 —— 换品牌只需要改这一个文件
 *
 * 修改后刷新页面即可生效，无需构建、无需安装依赖。
 * 颜色、字体、导航、联系方式、案例数据、版权署名都在这里。
 *
 * 项目署名：玹砺科技 XUANFORGE
 */
window.BRAND = {
  /* ── 品牌标识 ─────────────────────────────────────────── */
  name: "远山",
  nameEn: "FARHILL",
  // 字标缩写：用于内置 Logo 图形与浏览器标签图标
  monogram: "FH",
  // 若已有设计好的 Logo，填图片路径（如 "assets/img/logo.svg"），留空则使用内置字标
  logoImage: "",
  tagline: "把复杂的业务，做成清晰的产品",
  description:
    "远山是一家专注品牌策略与数字体验的设计公司，帮助成长中的企业把商业目标翻译成可被理解、可被使用的产品。",
  lang: "zh-CN",
  locale: "zh_CN",

  /* ── 主题色彩（会写入 CSS 变量） ─────────────────────── */
  theme: {
    paper: "#F4F0E7",
    paperSoft: "#EAE4D7",
    ink: "#16130E",
    inkSoft: "#3A332A",
    muted: "#6E6558",
    line: "#D7CFBF",
    accent: "#C0452A",
    accentInk: "#FFF6F0",
    dark: "#16130E",
    darkSoft: "#211D16"
  },

  /* ── 字体（可换成自托管字体，保持相同的字体栈格式） ───── */
  fonts: {
    display:
      '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", "Songti SC", "Noto Serif SC", Georgia, serif',
    body: '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif',
    mono: '"SF Mono", "JetBrains Mono", Consolas, "Courier New", monospace'
  },

  /* ── 导航 ─────────────────────────────────────────────── */
  nav: [
    { label: "首页", href: "index.html" },
    { label: "服务", href: "services.html" },
    { label: "案例", href: "work.html" },
    { label: "关于", href: "about.html" }
  ],
  navCta: { label: "聊聊合作", href: "contact.html" },

  /* ── 联系方式 ─────────────────────────────────────────── */
  contact: {
    email: "hello@farhill.studio",
    phone: "021 5030 2040",
    phoneHref: "+862150302040",
    address: "上海市静安区陕西北路 688 号 5F",
    city: "上海 / 新加坡",
    hours: "周一至周五 10:00 – 19:00",
    // 客户咨询的响应承诺
    response: "工作日 24 小时内回复"
  },

  /* ── 社交账号 ─────────────────────────────────────────── */
  social: [
    { label: "微信", href: "#", note: "farhill_studio" },
    { label: "微博", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" }
  ],

  /* ── 页脚 ─────────────────────────────────────────────── */
  footer: {
    headline: "如果你也相信，好设计应该先解决业务问题。",
    note: "我们每年最多承接 12 个项目，以保证每一位客户都能得到主创团队的全程参与。",
    legal: "" // 备案号等合规信息，留空则不显示
  },

  /* ── 著作权声明（显示在页脚尾部） ─────────────────────
   * holder：页脚展示的署名主体，与 LICENSE 中的版权归属保持一致
   * url：项目地址，填写后署名会渲染成可点击链接
   * year：填 "auto" 自动取当前年份
   */
  copyright: {
    holder: "github.com/xuanforge-cn",
    url: "https://github.com/xuanforge-cn",
    year: "auto"
  },

  /* ── 案例数据（首页与案例页共用，只维护这一处） ──────────
   * image：填图片路径（如 assets/img/work-lanyu.jpg）即显示图片；
   *        留空时前台渲染为空状态，不会出现破图
   */
  work: [
    {
      slug: "lanyu",
      client: "澜屿酒店",
      title: "把海岛的记忆，做成一套可延续的品牌语言",
      year: "2025",
      category: "品牌识别",
      summary: "从命名、字体到客房用品，建立一套在潮湿空气里也不会失真的视觉系统。",
      image: "",
      featured: true
    },
    {
      slug: "muchen",
      client: "木尘家居",
      title: "让一家 20 年的工厂，第一次被年轻人看见",
      year: "2025",
      category: "品牌 × 数字产品",
      summary: "重构产品结构，搭建可自主更新的内容站，六个月内自然流量翻了三倍。",
      image: "",
      featured: true
    },
    {
      slug: "jiye",
      client: "既野咖啡",
      title: "从一间街角小店，到 40 家门店的统一体验",
      year: "2024",
      category: "包装与空间",
      summary: "用一套克制的材质与色彩规则，解决了连锁扩张中最容易失控的视觉一致性问题。",
      image: "",
      featured: true
    },
    {
      slug: "hengliu",
      client: "衡流资本",
      title: "把一份 80 页的年度报告，变成可以读下去的故事",
      year: "2024",
      category: "内容设计",
      summary: "重新梳理信息层级，用图表与版式让复杂数据自己说话。",
      image: "",
      featured: false
    },
    {
      slug: "xingcha",
      client: "醒茶研究所",
      title: "让一杯茶的新品牌，在第一眼就被记住",
      year: "2023",
      category: "品牌识别",
      summary: "从单一符号出发，延展出一整套可印刷、可包装、可上墙的识别系统。",
      image: "",
      featured: false
    },
    {
      slug: "yuanqi",
      client: "元气实验室",
      title: "一个健康品牌，如何不靠喊口号建立信任",
      year: "2023",
      category: "数字产品",
      summary: "用真实数据与克制的界面语言，替代行业里泛滥的夸张承诺。",
      image: "",
      featured: false
    }
  ]
};
