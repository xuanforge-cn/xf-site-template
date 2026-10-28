# xf-site-template — 通用官网模板 / Universal Website Template

三套零依赖、零构建的静态官网模板。信息结构相同，排版性格完全不同，可任选一版改造，也可对比后再定。

Three zero-dependency, build-free static website templates. Same information architecture, three completely different design languages — pick one to customize, or compare them first.

| 版本 Edition | 视觉语言 Visual language | 示例品牌 Demo brand | 入口 Entry |
| --- | --- | --- | --- |
| 01 编辑纸感 / Editorial Paper | 暖纸底、宋体巨标题、砖红、双列错落 / Warm paper, serif display type, brick red, staggered two-column grid | 远山 FARHILL（品牌设计 / branding） | [index.html](index.html) |
| 02 深色科技 / Dark Tech | 近黑底、荧光绿、等宽数据、左侧竖栏 / Near-black, neon green, mono data, left rail | 临界智能 NEXA（AI 基建 / AI infra） | [variants/dark-tech/index.html](variants/dark-tech/index.html) |
| 03 瑞士极简 / Swiss Minimal | 白底、粗黑标题、严格网格、单点红 / White, heavy black type, strict grid, single red accent | 筑野建筑 ZHUYE（建筑事务所 / architecture） | [variants/swiss-minimal/index.html](variants/swiss-minimal/index.html) |

三版差异对照与入口页 / Comparison page: [variants/index.html](variants/index.html)

每版都是独立的 6 页站点，各自拥有 `assets/` 与 `brand.config.js`，可以单独拿走部署，互不依赖。

Each edition is a standalone six-page site with its own `assets/` and `brand.config.js`. Any edition can be copied out and deployed on its own.

## 共同点 / What They Share

- 纯 HTML / CSS / JavaScript，没有框架、没有 npm 依赖、没有构建步骤
  Pure HTML / CSS / JavaScript — no framework, no npm dependencies, no build step
- 品牌信息集中在各自的 `assets/js/brand.config.js`
  All brand data lives in each edition's `assets/js/brand.config.js`
- 每版 6 个页面：首页、服务/平台、案例/项目、关于、联系、404
  Six pages per edition: home, services/platform, work/projects, about, contact, 404
- 响应式布局，适配手机、平板与桌面
  Responsive across mobile, tablet and desktop
- 联系表单带前端校验与防重复提交
  Client-side form validation with duplicate-submit protection
- 图片位为空状态，不依赖任何图床，替换后自动显示
  Image slots render as empty states, no external image host required; fill a path and the image appears
- 支持 `prefers-reduced-motion`，键盘可达，语义化标签
  Respects `prefers-reduced-motion`, keyboard accessible, semantic markup

## 差异 / How They Differ

| 维度 Dimension | 01 远山 | 02 临界智能 | 03 筑野建筑 |
| --- | --- | --- | --- |
| 导航 Navigation | 吸顶单行 / Sticky single row | 吸顶 + 左侧竖栏 / Sticky + left rail | 非吸顶双行 / Static two-row |
| 首屏 Hero | 衬线巨标题 + 环形装饰 / Serif display + orbit | 荧光标题 + 状态面板 / Neon headline + status panel | 粗黑标题 + 12 栏网格 / Heavy type + 12-column grid |
| 服务 Services | 悬停整行反色 / Row invert on hover | Bento 卡片 / Bento cards | 表格化行 / Tabular rows |
| 案例 Work | 2 列错落 4:3 / Staggered 2-col 4:3 | 2 列卡片 16:10 / 2-col cards 16:10 | 3 列方图 1:1 / 3-col square 1:1 |
| 页脚 Footer | 深色 + 描边巨字 / Dark + outlined wordmark | 深色 + 荧光按钮 / Dark + neon button | 白底 + 实心巨字 / White + solid wordmark |
| 图片空态 Image empty | 斜线纹理 / Diagonal lines | 点阵纹理 / Dot matrix | 方格网格 / Square grid |
| 强调色 Accent | 砖红 / Brick red | 荧光绿 / Neon green | 正红 / Red |

## 快速开始 / Quick Start

直接双击对应版本的 `index.html` 即可预览。更推荐用本地静态服务器（三个版本可在同一服务下切换）：

Open the `index.html` of any edition directly, or serve the folder locally to switch between editions:

```bash
python -m http.server 8000
# 01: http://localhost:8000/
# 入口 / index: http://localhost:8000/variants/
# 02: http://localhost:8000/variants/dark-tech/
# 03: http://localhost:8000/variants/swiss-minimal/
```

部署时把整个目录上传到任意静态托管（Nginx、对象存储、GitHub Pages、Vercel 等）即可。

Deploy by uploading the whole folder to any static host (Nginx, object storage, GitHub Pages, Vercel, etc.).

## 换品牌：只改一个文件 / Rebrand in One File

每版各有一份配置，改对应版本的那一份：

Each edition has its own config; edit the one for the edition you use:

| 版本 Edition | 配置文件 Config file |
| --- | --- |
| 01 远山 | `assets/js/brand.config.js` |
| 02 临界智能 | `variants/dark-tech/assets/js/brand.config.js` |
| 03 筑野建筑 | `variants/swiss-minimal/assets/js/brand.config.js` |

以 01 版为例，打开 [assets/js/brand.config.js](assets/js/brand.config.js)，修改后刷新页面生效。

Taking edition 01 as an example, edit [assets/js/brand.config.js](assets/js/brand.config.js) and refresh.

| 字段 Field | 作用 Purpose |
| --- | --- |
| `name` / `nameEn` | 中文名与英文名，出现在页头字标、页脚巨字、页面标题 / Brand names used in header, footer wordmark and page titles |
| `monogram` | 字标缩写，用于内置 Logo 与浏览器标签图标 / Monogram for the built-in logo and favicon |
| `logoImage` | 已有 Logo 时填图片路径，留空则使用内置字标 / Optional logo image path; empty falls back to the built-in mark |
| `tagline` / `description` | 一句话定位与站点描述，同步到 meta description / Positioning and site description, synced to meta description |
| `theme` | 全站配色，写入 CSS 变量 / Palette injected as CSS variables |
| `fonts` | 标题、正文、等宽字体的字体栈 / Font stacks for display, body and mono |
| `nav` / `navCta` | 导航链接与页头按钮 / Navigation links and header CTA |
| `contact` | 邮箱、电话、地址、工作时间，页脚与联系页共用 / Email, phone, address, hours shared by footer and contact page |
| `social` | 社交账号，页脚与联系页共用 / Social accounts shared by footer and contact page |
| `footer` | 页脚标题、说明与备案信息 / Footer headline, note and legal line |
| `copyright` | 页脚著作权声明：`holder` 显示文本、`url` 点击跳转、`year: "auto"` 自动取当前年份 / Footer copyright: `holder` label, `url` link, `year: "auto"` |
| `work` | 案例数据，首页精选与案例页共用 / Case studies shared by home and work pages |

> 页面正文中的示例文案（公司故事、服务描述、FAQ 等）属于内容而非品牌标识，需要按实际情况替换。
> Body copy (story, service descriptions, FAQ, etc.) is content rather than brand identity and should be rewritten for your business.

## 页面 / Pages

以 01 版为例，三版结构一致。Edition 01 shown; all editions share the same structure.

| 文件 File | 说明 Description |
| --- | --- |
| `index.html` | 首页：首屏、数据、能力、精选案例、证言、流程、CTA / Home: hero, stats, capabilities, selected work, quote, process, CTA |
| `services.html` | 服务详情、合作方式、常见问题 / Services, engagement options, FAQ |
| `work.html` | 全部案例与客户列表 / All cases and client list |
| `about.html` | 品牌故事、价值观、团队、时间线 / Story, values, team, timeline |
| `contact.html` | 联系表单、联系方式、常见问题 / Contact form, details, FAQ |
| `404.html` | 404 提示页 / Not-found page |

02 版把 `services.html` 对应为「平台」、`work.html` 对应为「客户」；03 版对应为「服务」与「项目」，文件结构相同。

Edition 02 labels these pages Platform and Customers; edition 03 labels them Services and Projects. File names are identical.

## 图片 / Images

三版都不内置图片，也不引用外部图床。图片位默认渲染为纯 CSS 空状态（01 斜线、02 点阵、03 方格），不会出现破图。

No bundled images and no external image host. Slots render as pure-CSS empty states (01 diagonal lines, 02 dot matrix, 03 square grid), so nothing ever breaks.

| 版本 Edition | 图片位置 Where | 建议尺寸 Suggested size |
| --- | --- | --- |
| 01 远山 | 案例 `work[].image`；`about.html` 的 4 张肖像与 1 张工作室图 / cases plus 4 portraits and 1 studio shot | 1200 × 900 / 600 × 800 / 1600 × 700 |
| 02 临界智能 | 案例 `work[].image` / cases | 1200 × 900 (4:3) |
| 03 筑野建筑 | 项目 `work[].image` / projects | 1200 × 1200 (1:1) |

放入自己的图片 / Adding your own images:

1. 图片放到对应版本的 `assets/img/` 目录 / Put files in that edition's `assets/img/`
2. 案例/项目图只需在 `work[].image` 填相对路径，例如 `assets/img/work-01.jpg` / Fill `work[].image` with a relative path
3. 01 版的团队与工作室图，把 `about.html` 里的 `.media-empty` 整块换成 `<img>` / For edition 01, replace the `.media-empty` block with an `<img>`:

```html
<div class="team-photo">
  <img src="assets/img/team-chen.jpg" alt="陈砚，创始人 / 创意总监" loading="lazy" width="600" height="800">
</div>
```

4. 同步填写 `alt`，描述图片内容而不是文件名 / Write descriptive `alt` text, not file names

图片未配置时页面依然完整可上线，空状态会提示所需尺寸，便于后续补图。

The site is still complete and shippable without images; empty states show the required size.

## 接入联系表单 / Contact Form

静态站点没有服务端，当前表单在浏览器内校验后给出成功提示。接入真实提交时，在 `assets/js/site.js` 的 `initForm()` 中找到 `window.setTimeout` 处，替换为：

Static sites have no backend. The form validates in the browser and shows a success state. To wire it up, replace the `window.setTimeout` block inside `initForm()` in `assets/js/site.js` with:

```js
fetch("https://your-form-endpoint.example.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
```

提交前请收集 `name / email / company / budget / message` 字段，并在服务端做校验与频率限制。

Collect the `name / email / company / budget / message` fields and validate plus rate-limit them on the server.

## 目录结构 / Project Structure

```
xf-site-template/
├── index.html                # 01 远山（首页）/ edition 01 home
├── services.html
├── work.html
├── about.html
├── contact.html
├── 404.html
├── assets/                   # 01 版资源 / edition 01 assets
│   ├── css/site.css
│   └── js/
│       ├── brand.config.js   # 01 版品牌配置（只改这里）/ edition 01 brand config
│       └── site.js
├── variants/
│   ├── index.html            # 三版入口与差异对照 / comparison page
│   ├── dark-tech/            # 02 临界智能（独立 6 页 + assets）
│   └── swiss-minimal/        # 03 筑野建筑（独立 6 页 + assets）
├── LICENSE
├── 修改记录.md
└── ai-prompt.md              # 交给 AI 做二次改造的提示词 / AI rewrite prompt
```

每版的 `assets/js/brand.config.js` 是唯一需要改的品牌入口；`variants/` 下的两版可以单独复制出去部署。

Each edition has a single brand entry point; the two folders under `variants/` can be copied out and deployed independently.

另外，[ai-prompt.md](ai-prompt.md) 里有一份可直接复制的提示词，用于让 AI 按你的品牌与行业改造模板（路径以 01 版为准，02/03 版替换对应目录即可）。

[ai-prompt.md](ai-prompt.md) contains a ready-to-copy prompt for rewriting the template with a new brand and industry (paths assume edition 01; swap in the edition folder for 02/03).

## 浏览器支持 / Browser Support

面向现代浏览器（Chrome / Edge / Safari / Firefox 近两年版本）。使用到的 `color-mix()`、`clamp()`、`aspect-ratio`、`dvh` 在旧版浏览器中会退化显示，不影响内容阅读。

Targets modern browsers (Chrome / Edge / Safari / Firefox, last two years). Features such as `color-mix()`, `clamp()`, `aspect-ratio` and `dvh` degrade gracefully in older browsers without blocking content.

## 版权与许可 / Copyright & License

本项目由 **玹砺科技 XUANFORGE** 以 [MIT License](LICENSE) 开源，项目地址：[github.com/xuanforge-cn](https://github.com/xuanforge-cn)。

Released by **玹砺科技 XUANFORGE** under the [MIT License](LICENSE). Repository: [github.com/xuanforge-cn](https://github.com/xuanforge-cn).

Copyright (c) 2026 玹砺科技 XUANFORGE (https://github.com/xuanforge-cn)

MIT 只要求一件事：分发本项目的代码或衍生作品时，保留 `LICENSE` 中的版权声明与许可声明。除此之外可自由商用、修改、闭源分发，无需额外授权。

MIT asks for one thing: keep the copyright and permission notice in `LICENSE` when you redistribute the code or derivatives. Commercial use, modification and closed-source distribution are otherwise unrestricted.

页面页脚的著作权声明形如 `版权所有 © 2026 github.com/xuanforge-cn`，由 `brand.config.js` 的 `copyright.holder`（显示文本）与 `copyright.url`（点击跳转）生成，与许可证中的著作权人保持一致。

The footer credit reads `版权所有 © 2026 github.com/xuanforge-cn`, generated from `copyright.holder` (label) and `copyright.url` (link) in `brand.config.js`, and stays aligned with the copyright holder in the license.

## 贡献者 / Contributors

- [xuanforge-cn](https://github.com/xuanforge-cn) — 玹砺科技 / XUANFORGE
- [thoronbo](https://github.com/thoronbo)
