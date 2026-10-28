# xf-site-template — 通用官网模板（三版）

三套零依赖、零构建的静态官网模板。信息结构相同，排版性格完全不同，可任选一版改造，也可对比后再定。

| 版本 | 视觉语言 | 示例品牌 | 入口 |
| --- | --- | --- | --- |
| 01 编辑纸感 | 暖纸底、宋体巨标题、砖红、双列错落 | 远山 FARHILL（品牌设计） | [index.html](index.html) |
| 02 深色科技 | 近黑底、荧光绿、等宽数据、左侧竖栏 | 临界智能 NEXA（AI 基建） | [variants/dark-tech/index.html](variants/dark-tech/index.html) |
| 03 瑞士极简 | 白底、粗黑标题、严格网格、单点红 | 筑野建筑 ZHUYE（建筑事务所） | [variants/swiss-minimal/index.html](variants/swiss-minimal/index.html) |

三版差异对照与入口页：[variants/index.html](variants/index.html)

每版都是独立的 6 页站点，各自拥有 `assets/` 与 `brand.config.js`，可以单独拿走部署，互不依赖。

## 三版共同点

- 纯 HTML / CSS / JavaScript，没有框架、没有 npm 依赖、没有构建步骤
- 品牌信息集中在各自的 `assets/js/brand.config.js`
- 每版 6 个页面：首页、服务/平台、案例/项目、关于、联系、404
- 响应式布局，适配手机、平板与桌面
- 联系表单带前端校验与防重复提交
- 图片位为空状态，不依赖任何图床，替换后自动显示
- 支持 `prefers-reduced-motion`，键盘可达，语义化标签

## 三版差异

| 维度 | 01 远山 | 02 临界智能 | 03 筑野建筑 |
| --- | --- | --- | --- |
| 导航 | 吸顶单行 | 吸顶 + 左侧竖栏 | 非吸顶双行 |
| 首屏 | 衬线巨标题 + 环形装饰 | 荧光标题 + 状态面板 | 粗黑标题 + 12 栏网格 |
| 服务呈现 | 悬停整行反色 | Bento 卡片 | 表格化行 |
| 案例网格 | 2 列错落 4:3 | 2 列卡片 16:10 | 3 列方图 1:1 |
| 页脚 | 深色 + 描边巨字 | 深色 + 荧光按钮 | 白底 + 实心巨字 |
| 图片空态 | 斜线纹理 | 点阵纹理 | 方格网格 |
| 强调色 | 砖红 | 荧光绿 | 正红 |

## 快速开始

直接双击对应版本的 `index.html` 即可预览。更推荐用本地静态服务器（三个版本可在同一服务下切换）：

```bash
python -m http.server 8000
# 01 版：http://localhost:8000/
# 版本入口：http://localhost:8000/variants/
# 02 版：http://localhost:8000/variants/dark-tech/
# 03 版：http://localhost:8000/variants/swiss-minimal/
```

部署时把整个目录上传到任意静态托管（Nginx、对象存储、GitHub Pages、Vercel 等）即可。

## 换品牌：只改一个文件

每版各有一份配置，改对应版本的那一份：

| 版本 | 配置文件 |
| --- | --- |
| 01 远山 | `assets/js/brand.config.js` |
| 02 临界智能 | `variants/dark-tech/assets/js/brand.config.js` |
| 03 筑野建筑 | `variants/swiss-minimal/assets/js/brand.config.js` |

以 01 版为例，打开 [assets/js/brand.config.js](assets/js/brand.config.js)，修改后刷新页面生效。

| 字段 | 作用 |
| --- | --- |
| `name` / `nameEn` | 中文名与英文名，出现在页头字标、页脚巨字、页面标题 |
| `monogram` | 字标缩写，用于内置 Logo 与浏览器标签图标 |
| `logoImage` | 已有设计好的 Logo 时填图片路径；留空则使用内置字标 |
| `tagline` / `description` | 一句话定位与站点描述（同步到 meta description） |
| `theme` | 全站配色，写入 CSS 变量 |
| `fonts` | 标题、正文、等宽字体的字体栈 |
| `nav` / `navCta` | 导航链接与页头按钮 |
| `contact` | 邮箱、电话、地址、工作时间，页脚与联系页共用 |
| `social` | 社交账号，页脚与联系页共用 |
| `footer` | 页脚标题、说明与备案信息 |
| `copyright` | 页脚著作权声明：`holder` 显示文本、`url` 点击跳转、`year: "auto"` 自动取当前年份 |
| `work` | 案例数据，首页精选与案例页共用 |

> 页面正文中的示例文案（公司故事、服务描述、FAQ 等）属于内容而非品牌标识，需要按实际情况替换。

## 页面（以 01 版为例，三版结构一致）

| 文件 | 说明 |
| --- | --- |
| `index.html` | 首页：首屏、数据、能力、精选案例、证言、流程、CTA |
| `services.html` | 服务详情、合作方式、常见问题 |
| `work.html` | 全部案例与客户列表 |
| `about.html` | 品牌故事、价值观、团队、时间线 |
| `contact.html` | 联系表单、联系方式、常见问题 |
| `404.html` | 404 提示页 |

02 版把 `services.html` 对应为「平台」、`work.html` 对应为「客户」；03 版对应为「服务」与「项目」，文件结构相同。

## 图片

三版都不内置图片，也不引用外部图床。图片位默认渲染为纯 CSS 空状态（01 斜线、02 点阵、03 方格），不会出现破图。

| 版本 | 图片位置 | 建议尺寸 |
| --- | --- | --- |
| 01 远山 | 案例 `work[].image`；`about.html` 的 4 张肖像与 1 张工作室图 | 1200 × 900 / 600 × 800 / 1600 × 700 |
| 02 临界智能 | 案例 `work[].image` | 1200 × 900（4:3） |
| 03 筑野建筑 | 项目 `work[].image` | 1200 × 1200（1:1） |

放入自己的图片：

1. 图片放到对应版本的 `assets/img/` 目录；
2. 案例/项目图只需在 `work[].image` 填相对路径，例如 `assets/img/work-01.jpg`；
3. 01 版的团队与工作室图，把 `about.html` 里的 `.media-empty` 整块换成 `<img>`：

```html
<div class="team-photo">
  <img src="assets/img/team-chen.jpg" alt="陈砚，创始人 / 创意总监" loading="lazy" width="600" height="800">
</div>
```

4. 同步填写 `alt`，描述图片内容而不是文件名。

图片未配置时页面依然完整可上线，空状态会提示所需尺寸，便于后续补图。

## 接入联系表单

静态站点没有服务端，当前表单在浏览器内校验后给出成功提示。接入真实提交时，在 `assets/js/site.js` 的 `initForm()` 中找到 `window.setTimeout` 处，替换为：

```js
fetch("https://your-form-endpoint.example.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
```

提交前请收集 `name / email / company / budget / message` 字段，并在服务端做校验与频率限制。

## 目录结构

```
xf-site-template/
├── index.html                # 01 远山（首页）
├── services.html
├── work.html
├── about.html
├── contact.html
├── 404.html
├── assets/                   # 01 版资源
│   ├── css/site.css
│   └── js/
│       ├── brand.config.js   # 01 版品牌配置（只改这里）
│       └── site.js
├── variants/
│   ├── index.html            # 三版入口与差异对照
│   ├── dark-tech/            # 02 临界智能（独立 6 页 + assets）
│   └── swiss-minimal/        # 03 筑野建筑（独立 6 页 + assets）
├── LICENSE
├── 修改记录.md
└── ai-prompt.md              # 交给 AI 做二次改造的提示词
```

每版的 `assets/js/brand.config.js` 是唯一需要改的品牌入口；`variants/` 下的两版可以单独复制出去部署。

另外，[ai-prompt.md](ai-prompt.md) 里有一份可直接复制的提示词，用于让 AI 按你的品牌与行业改造模板（提示词中的路径以 01 版为准，改造 02/03 版时替换对应目录即可）。

## 浏览器支持

面向现代浏览器（Chrome / Edge / Safari / Firefox 近两年版本）。使用到的 `color-mix()`、`clamp()`、`aspect-ratio`、`dvh` 在旧版浏览器中会退化显示，不影响内容阅读。

## 版权与许可

本项目由 **玹砺科技 XUANFORGE** 以 [MIT License](LICENSE) 开源，项目地址：[github.com/xuanforge-cn](https://github.com/xuanforge-cn)。

Copyright (c) 2026 玹砺科技 XUANFORGE (https://github.com/xuanforge-cn)

MIT 只要求一件事：分发本项目的代码或衍生作品时，保留 `LICENSE` 中的版权声明与许可声明。除此之外可自由商用、修改、闭源分发，无需额外授权。

页面页脚的著作权声明形如 `版权所有 © 2026 github.com/xuanforge-cn`，由 `brand.config.js` 的 `copyright.holder`（显示文本）与 `copyright.url`（点击跳转）生成，与许可证中的著作权人保持一致。使用本模板搭建自己的站点时，可替换为你的主体名称；若继续分发模板源码，请保留 `LICENSE` 原文件。
