/**
 * 站点通用逻辑：读取 brand.config.js，渲染页头页脚、注入主题、处理交互
 *
 * 项目署名：玹砺科技 XUANFORGE
 */
(function () {
  "use strict";

  var B = window.BRAND || {};
  var doc = document;
  var root = doc.documentElement;

  /* ── 小工具 ──────────────────────────────────────────── */
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function $(selector, scope) {
    return (scope || doc).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
  }

  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  function colors() {
    return Object.assign(
      {
        paper: "#F4F0E7",
        ink: "#16130E",
        accent: "#C0452A"
      },
      B.theme || {}
    );
  }

  /* ── 主题变量 ────────────────────────────────────────── */
  function applyTheme() {
    var c = colors();
    var map = {
      paper: "--paper",
      paperSoft: "--paper-soft",
      ink: "--ink",
      inkSoft: "--ink-soft",
      muted: "--muted",
      line: "--line",
      accent: "--accent",
      accentInk: "--accent-ink",
      dark: "--dark",
      darkSoft: "--dark-soft"
    };
    Object.keys(map).forEach(function (key) {
      if (c[key]) root.style.setProperty(map[key], c[key]);
    });

    var fonts = B.fonts || {};
    if (fonts.display) root.style.setProperty("--font-display", fonts.display);
    if (fonts.body) root.style.setProperty("--font-body", fonts.body);
    if (fonts.mono) root.style.setProperty("--font-mono", fonts.mono);

    if (B.lang) root.setAttribute("lang", B.lang);

    var meta = doc.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = doc.createElement("meta");
      meta.setAttribute("name", "theme-color");
      doc.head.appendChild(meta);
    }
    meta.setAttribute("content", c.paper);
  }

  /* ── 浏览器标签图标（用字标即时生成，无需额外文件） ──── */
  function applyFavicon() {
    var c = colors();
    var mark = B.monogram || (B.nameEn || "S").slice(0, 2);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" fill="' + c.ink + '"/>' +
      '<text x="32" y="43" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" ' +
      'font-size="26" font-weight="700" fill="' + c.paper + '">' + esc(mark) + "</text>" +
      "</svg>";
    var link = doc.querySelector('link[rel="icon"]');
    if (!link) {
      link = doc.createElement("link");
      link.setAttribute("rel", "icon");
      doc.head.appendChild(link);
    }
    link.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
  }

  /* ── 页面标题与分享信息 ──────────────────────────────── */
  function applyMeta() {
    var page = doc.querySelector("title[data-page]");
    if (page) {
      var label = page.getAttribute("data-page");
      var brand = [B.name, B.nameEn].filter(Boolean).join(" ");
      doc.title = label + " · " + brand;
    }
    var desc = doc.querySelector('meta[name="description"]');
    if (desc && B.description) desc.setAttribute("content", B.description);
    var author = doc.querySelector('meta[name="author"]');
    if (author && B.copyright) author.setAttribute("content", B.copyright.holder || "");
    var ogTitle = doc.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", doc.title);
    var ogDesc = doc.querySelector('meta[property="og:description"]');
    if (ogDesc && B.description) ogDesc.setAttribute("content", B.description);
  }

  /* ── 品牌 Logo ───────────────────────────────────────── */
  function brandMark() {
    if (B.logoImage) {
      return '<img src="' + esc(B.logoImage) + '" alt="" width="44" height="44">';
    }
    return (
      '<svg viewBox="0 0 44 44" role="img" aria-hidden="true" focusable="false">' +
      '<rect x="1" y="1" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
      '<path d="M10 30 L22 12 L34 30" fill="none" stroke="currentColor" stroke-width="1.4"/>' +
      '<circle cx="22" cy="30" r="2.6" fill="currentColor"/>' +
      "</svg>"
    );
  }

  /* ── 页头 ────────────────────────────────────────────── */
  function renderHeader() {
    var page = currentPage();
    var nav = (B.nav || [])
      .map(function (item) {
        var active = item.href === page;
        return (
          '<li><a href="' + esc(item.href) + '"' +
          (active ? ' class="is-active" aria-current="page"' : "") +
          ">" + esc(item.label) + "</a></li>"
        );
      })
      .join("");

    var cta = B.navCta || { label: "联系我们", href: "contact.html" };
    var html =
      '<a class="skip-link" href="#main">跳到主要内容</a>' +
      '<header class="site-header" data-header>' +
        '<div class="shell header-inner">' +
          '<a class="brand" href="index.html" aria-label="' + esc((B.name || "首页") + " 首页") + '">' +
            '<span class="brand-mark">' + brandMark() + "</span>" +
            '<span class="brand-type">' +
              '<span class="brand-name">' + esc(B.name || "") + "</span>" +
              '<span class="brand-en">' + esc(B.nameEn || "") + "</span>" +
            "</span>" +
          "</a>" +
          '<nav class="site-nav" id="site-nav" aria-label="主导航">' +
            "<ul>" + nav + "</ul>" +
            '<div class="nav-aside">' +
              '<p class="nav-aside-label">直接联系</p>' +
              '<a href="mailto:' + esc((B.contact || {}).email || "") + '">' + esc((B.contact || {}).email || "") + "</a>" +
              '<a href="tel:' + esc((B.contact || {}).phoneHref || "") + '">' + esc((B.contact || {}).phone || "") + "</a>" +
            "</div>" +
          "</nav>" +
          '<div class="header-actions">' +
            '<a class="btn btn-ink btn-sm header-cta" href="' + esc(cta.href) + '">' + esc(cta.label) + "</a>" +
            '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">' +
              '<span class="nav-toggle-label">菜单</span>' +
              '<span class="nav-toggle-bars" aria-hidden="true"><i></i><i></i></span>' +
            "</button>" +
          "</div>" +
        "</div>" +
      "</header>";

    doc.body.insertAdjacentHTML("afterbegin", html);
  }

  /* ── 页脚 ────────────────────────────────────────────── */
  function renderFooter() {
    var contact = B.contact || {};
    var credit = B.copyright || {};
    var year =
      credit.year === "auto" || !credit.year ? new Date().getFullYear() : credit.year;

    // 署名主体：与 LICENSE 中的版权行保持一致；配置了 url 时渲染为外链
    var creditName = esc(credit.holder || "");
    var creditHtml = credit.url
      ? '<a class="footer-credit-link" href="' + esc(credit.url) +
        '" target="_blank" rel="noopener noreferrer">' + creditName + "</a>"
      : creditName;

    var navLinks = (B.nav || [])
      .concat([{ label: "联系", href: "contact.html" }])
      .map(function (item) {
        return '<li><a href="' + esc(item.href) + '">' + esc(item.label) + "</a></li>";
      })
      .join("");

    var social = (B.social || [])
      .map(function (item) {
        return (
          '<li><a href="' + esc(item.href) + '" rel="noopener">' + esc(item.label) +
          (item.note ? '<span class="social-note">' + esc(item.note) + "</span>" : "") +
          "</a></li>"
        );
      })
      .join("");

    var html =
      '<footer class="site-footer">' +
        '<div class="shell">' +
          '<div class="footer-top">' +
            '<div class="footer-lead">' +
              '<p class="eyebrow eyebrow-light">开始一段合作</p>' +
              '<h2 class="footer-headline">' + esc((B.footer || {}).headline || "") + "</h2>" +
              '<p class="footer-note">' + esc((B.footer || {}).note || "") + "</p>" +
              '<a class="btn btn-light" href="contact.html">预约一次沟通<span class="btn-arrow" aria-hidden="true">→</span></a>' +
            "</div>" +
            '<div class="footer-cols">' +
              "<div><h3>导航</h3><ul>" + navLinks + "</ul></div>" +
              "<div><h3>联系</h3><ul>" +
                '<li><a href="mailto:' + esc(contact.email || "") + '">' + esc(contact.email || "") + "</a></li>" +
                '<li><a href="tel:' + esc(contact.phoneHref || "") + '">' + esc(contact.phone || "") + "</a></li>" +
                '<li class="is-plain">' + esc(contact.address || "") + "</li>" +
                '<li class="is-plain">' + esc(contact.city || "") + "</li>" +
              "</ul></div>" +
              "<div><h3>关注</h3><ul class=\"social-list\">" + social + "</ul></div>" +
            "</div>" +
          "</div>" +
          '<div class="footer-word" aria-hidden="true">' + esc(B.nameEn || B.name || "") + "</div>" +
          '<div class="footer-base">' +
            // 著作权声明：展示主体与 LICENSE 中的版权归属一致
            "<!-- 著作权声明：署名主体须与 LICENSE 版权行保持一致；修改请改 brand.config.js 的 copyright -->" +
            '<p class="footer-copyright">版权所有 © ' + esc(year) + " " + creditHtml + "</p>" +
            ((B.footer || {}).legal ? "<p>" + esc(B.footer.legal) + "</p>" : "") +
            '<p class="footer-top-link"><a href="#top">回到顶部 ↑</a></p>' +
          "</div>" +
        "</div>" +
      "</footer>";

    doc.body.insertAdjacentHTML("beforeend", html);
  }

  /* ── 案例卡片 ────────────────────────────────────────── */
  function renderWork() {
    $$("[data-work-grid]").forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit"), 10);
      var onlyFeatured = grid.getAttribute("data-filter") === "featured";
      var items = (B.work || []).filter(function (item) {
        return !onlyFeatured || item.featured;
      });
      if (limit > 0) items = items.slice(0, limit);

      grid.innerHTML = items
        .map(function (item, index) {
          // image 为空时渲染空状态，避免出现破图
          var media = item.image
            ? '<img src="' + esc(item.image) + '" alt="' + esc(item.client + " 项目视觉") + '" ' +
              'loading="lazy" width="1200" height="900">'
            : '<div class="media-empty" role="img" aria-label="' + esc(item.client + " 项目图片待补充") + '">' +
                "<span>图片待补充</span><small>1200 × 900</small></div>";

          return (
            '<article class="work-card reveal" id="' + esc(item.slug) + '" data-delay="' + ((index % 3) + 1) + '">' +
              '<a class="work-link" href="work.html#' + esc(item.slug) + '">' +
                '<figure class="work-media">' + media + "</figure>" +
                '<div class="work-head">' +
                  '<span class="work-client">' + esc(item.client) + "</span>" +
                  '<span class="work-year">' + esc(item.year) + "</span>" +
                "</div>" +
                '<h3 class="work-title">' + esc(item.title) + "</h3>" +
                '<p class="work-summary">' + esc(item.summary) + "</p>" +
                '<span class="work-more">' + esc(item.category) + ' <i aria-hidden="true">→</i></span>' +
              "</a>" +
            "</article>"
          );
        })
        .join("");
    });
  }

  /* ── 联系方式与社交链接（改配置即可同步全站） ────────── */
  function bindContact() {
    var contact = B.contact || {};
    $$("[data-contact]").forEach(function (el) {
      var key = el.getAttribute("data-contact");
      var value = contact[key];
      if (!value) return;
      el.textContent = value;
      if (key === "email") el.setAttribute("href", "mailto:" + value);
      if (key === "phone") el.setAttribute("href", "tel:" + (contact.phoneHref || value));
    });

    $$("[data-social-list]").forEach(function (list) {
      list.innerHTML = (B.social || [])
        .map(function (item) {
          return (
            '<a href="' + esc(item.href) + '" rel="noopener">' + esc(item.label) + "</a>"
          );
        })
        .join("");
    });
  }

  /* ── 页头滚动态与移动端菜单 ──────────────────────────── */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle", header);
    var nav = $("#site-nav", header);
    if (!toggle || !nav) return;

    var setOpen = function (open) {
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      doc.body.classList.toggle("is-locked", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("nav-open"));
    });

    $$("a", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setOpen(false);
    });
  }

  /* ── 滚动进场 ────────────────────────────────────────── */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.getAttribute("data-delay"), 10) || 0;
        entry.target.style.transitionDelay = delay * 90 + "ms";
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ── 静态站表单：本地校验 + 成功反馈 ──────────────────
   * 纯静态站点没有服务端。接入真实提交时，在下方 submit 处
   * 用 fetch 把 payload 发到你的表单服务（如 Formspree）即可。
   */
  function initForm() {
    var form = $("[data-contact-form]");
    if (!form) return;

    var status = $("[data-form-status]", form.parentNode);
    var fields = {
      name: $('[name="name"]', form),
      email: $('[name="email"]', form),
      message: $('[name="message"]', form)
    };

    var setError = function (field, text) {
      var wrap = field.closest(".field");
      var error = wrap ? $(".field-error", wrap) : null;
      if (!wrap || !error) return;
      wrap.classList.toggle("has-error", Boolean(text));
      error.textContent = text || "";
      field.setAttribute("aria-invalid", text ? "true" : "false");
    };

    var validate = function () {
      var ok = true;
      var name = fields.name.value.trim();
      var email = fields.email.value.trim();
      var message = fields.message.value.trim();

      if (name.length < 2) { setError(fields.name, "请填写你的称呼（至少 2 个字）"); ok = false; }
      else setError(fields.name, "");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        setError(fields.email, "请填写有效的邮箱地址"); ok = false;
      } else setError(fields.email, "");

      if (message.length < 10) { setError(fields.message, "再多说一点吧，至少 10 个字"); ok = false; }
      else setError(fields.message, "");

      return ok;
    };

    Object.keys(fields).forEach(function (key) {
      if (!fields[key]) return;
      fields[key].addEventListener("input", function () {
        if (fields[key].closest(".field").classList.contains("has-error")) validate();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validate()) {
        if (status) {
          status.className = "form-status is-error";
          status.textContent = "请检查标红的字段后再提交。";
        }
        return;
      }

      var submit = $('button[type="submit"]', form);
      if (submit) { submit.disabled = true; submit.textContent = "发送中…"; }

      /* 接入真实后端时：在此处用 fetch 提交表单数据 */
      window.setTimeout(function () {
        form.reset();
        if (submit) { submit.disabled = false; submit.innerHTML = '发送信息<span class="btn-arrow" aria-hidden="true">→</span>'; }
        if (status) {
          status.className = "form-status is-success";
          status.textContent = "已收到你的信息，我们会在一个工作日内回复。";
        }
      }, 600);
    });
  }

  /* ── 启动 ────────────────────────────────────────────── */
  applyTheme();
  applyFavicon();
  applyMeta();
  renderHeader();
  renderFooter();
  renderWork();
  bindContact();
  initHeader();
  initReveal();
  initForm();

  // 从其他页面跳转到 work.html#项目名 时，等卡片渲染完再定位
  if (window.location.hash) {
    var target = doc.getElementById(window.location.hash.slice(1));
    if (target) {
      // 先取消进场位移，避免滚动定位被动画带偏
      target.style.transition = "none";
      target.classList.add("is-visible");
      window.setTimeout(function () {
        target.scrollIntoView({ block: "start" });
      }, 0);
    }
  }

  var yearNode = $("[data-year]");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
})();
