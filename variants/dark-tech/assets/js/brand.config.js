/**
 * 深色科技版 · 全站品牌配置
 *
 * 换品牌只需要改这一个文件。零依赖、零构建。
 * 署名：github.com/xuanforge-cn
 */
window.BRAND = {
  name: "临界智能",
  nameEn: "NEXA",
  monogram: "NX",
  logoImage: "",
  tagline: "让算力像水电一样随取随用",
  description:
    "临界智能为 AI 团队提供 GPU 调度、推理服务与模型托管，把集群利用率从 30% 提升到 80% 以上。",
  lang: "zh-CN",

  theme: {
    bg: "#0A0A0B",
    panel: "#131316",
    panelSoft: "#1A1A1F",
    text: "#F1F1EE",
    muted: "#8A8A93",
    line: "#27272E",
    accent: "#C6FF3D",
    accentInk: "#0A0A0B"
  },

  fonts: {
    sans: '"Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Roboto Mono", Consolas, monospace'
  },

  nav: [
    { label: "首页", href: "index.html" },
    { label: "平台", href: "services.html" },
    { label: "客户", href: "work.html" },
    { label: "关于", href: "about.html" }
  ],
  navCta: { label: "预约演示", href: "contact.html" },

  contact: {
    email: "hello@nexa.ai",
    phone: "400 820 1130",
    phoneHref: "+864008201130",
    address: "上海市徐汇区云锦路 500 号 12F",
    city: "上海 / 北京 / 新加坡",
    hours: "7×24 技术响应",
    response: "工作日 2 小时内回复"
  },

  social: [
    { label: "GitHub", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "公众号", href: "#", note: "nexa_ai" }
  ],

  footer: {
    headline: "把闲置的卡，变成可计费的算力。",
    note: "提供 30 天免费压测环境，接入前不需要采购任何硬件。",
    legal: ""
  },

  copyright: {
    holder: "github.com/xuanforge-cn",
    url: "https://github.com/xuanforge-cn",
    year: "auto"
  },

  /* 案例数据：image 留空时渲染为空状态，填路径后自动显示图片 */
  work: [
    {
      slug: "autodrive",
      client: "驭行科技",
      title: "训练排队从 6 小时降到 9 分钟",
      year: "2025",
      category: "GPU 调度",
      summary: "接入 480 张卡的混合集群，用抢占式队列重排训练任务，季度算力成本下降 41%。",
      image: "",
      metric: "-41%",
      metricLabel: "季度算力成本",
      featured: true
    },
    {
      slug: "video",
      client: "幕间视频",
      title: "把单条视频的推理成本压到 3 分钱",
      year: "2025",
      category: "推理服务",
      summary: "批量推理加动态批处理，P99 延迟保持在 800ms 以内，成本下降 63%。",
      image: "",
      metric: "-63%",
      metricLabel: "推理成本",
      featured: true
    },
    {
      slug: "broker",
      client: "衡石证券",
      title: "私有化部署 200 张卡，合规不出内网",
      year: "2024",
      category: "私有化",
      summary: "在客户自建机房完成调度层部署，模型与数据全程不出内网，通过等保三级。",
      image: "",
      metric: "200",
      metricLabel: "张卡纳管",
      featured: true
    },
    {
      slug: "bio",
      client: "序列生物",
      title: "让蛋白结构预测跑满整夜不中断",
      year: "2024",
      category: "任务编排",
      summary: "长任务断点续算与故障转移，连续 90 天无人工干预，任务完成率 99.7%。",
      image: "",
      metric: "99.7%",
      metricLabel: "任务完成率",
      featured: false
    },
    {
      slug: "bank",
      client: "南方银行",
      title: "把 9 个 AI 团队的资源账算清楚",
      year: "2023",
      category: "计量与治理",
      summary: "按项目、按人、按任务三级计量，资源申请周期从两周缩短到半天。",
      image: "",
      metric: "0.5 天",
      metricLabel: "资源申请周期",
      featured: false
    },
    {
      slug: "edu",
      client: "知序教育",
      title: "早高峰 10 倍并发，没有多加一张卡",
      year: "2023",
      category: "弹性伸缩",
      summary: "按分钟弹性伸缩与冷启动预热，高峰期资源利用率稳定在 86%。",
      image: "",
      metric: "86%",
      metricLabel: "高峰利用率",
      featured: false
    }
  ]
};
