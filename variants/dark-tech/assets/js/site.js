/**
 * 深色科技版 · 站点逻辑
 * 读取 brand.config.js，渲染侧栏、页头、页脚与案例，注入主题变量。
 * 署名：github.com/xuanforge-cn
 */
(function () {
  "use strict";

  var B = window.BRAND || {};
  var doc = document;
  var root = doc.documentElement;

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function $(sel, scope) {
    return (scope || doc).querySelector(sel);
  }

  function $$(sel, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(sel));
  }

  function pageFile() {
    var f = window.location.pathname.split("/").pop();
    return f === "" ? "index.html" : f;
  }

  /* ── 主题 ────────────────────────────────────────────── */
  function applyTheme() {
    var t = Object.assign(
      {
        bg: "#0A0A0B",
        panel: "#131316",
        panelSoft: "#1A1A1F",
        text: "#F1F1EE",
        muted: "#8A8A93",
        line: "#27272E",
        accent: "#C6FF3D",
        accentInk: "#0A0A0B"
      },
      B.theme || {}
    );
    var map = {
      bg: "--bg",
      panel: "--panel",
      panelSoft: "--panel-soft",
      text: "--text",
      muted: "--muted",
      line: "--line",
      accent: "--accent",
      accentInk: "--accent-ink"
    };
    Object.keys(map).forEach(function (k) {
      if (t[k]) root.style.setProperty(map[k], t[k]);
    });

    var f = B.fonts || {};
    if (f.sans) root.style.setProperty("--font-sans", f.sans);
    if (f.mono) root.style.setProperty("--font-mono", f.mono);
    if (B.lang) root.setAttribute("lang", B.lang);

    var meta = doc.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = doc.createElement("meta");
      meta.setAttribute("name", "theme-color");
      doc.head.appendChild(meta);
    }
    meta.setAttribute("content", t.bg);
  }

  function applyFavicon() {
    var t = B.theme || {};
    var mark = B.monogram || "N";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" fill="' + (t.bg || "#0A0A0B") + '"/>' +
      '<rect x="2" y="2" width="60" height="60" fill="none" stroke="' + (t.accent || "#C6FF3D") + '" stroke-width="2"/>' +
      '<text x="32" y="42" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" ' +
      'font-weight="700" fill="' + (t.accent || "#C6FF3D") + '">' + esc(mark) + "</text></svg>";
    var link = doc.querySelector('link[rel="icon"]');
    if (!link) {
      link = doc.createElement("link");
      link.setAttribute("rel", "icon");
      doc.head.appendChild(link);
    }
    link.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
  }

  function applyMeta() {
    var titleNode = doc.querySelector("title[data-page]");
    if (titleNode) {
      doc.title = titleNode.getAttribute("data-page") + " · " + [B.name, B.nameEn].filter(Boolean).join(" ");
    }
    var desc = doc.querySelector('meta[name="description"]');
    if (desc && B.description) desc.setAttribute("content", B.description);
    var author = doc.querySelector('meta[name="author"]');
    if (author && B.copyright) author.setAttribute("content", (B.copyright.holder || "") );
  }

  /* ── 左侧竖栏 ────────────────────────────────────────── */
  function renderRail() {
    var html =
      '<aside class="rail" aria-hidden="true">' +
        '<span class="rail-mark">' + esc(B.monogram || "N") + "</span>" +
        '<span class="rail-line"></span>' +
        '<span class="rail-word">' + esc(B.nameEn || "") + "</span>" +
        '<span class="rail-dot"></span>' +
      "</aside>";
    doc.body.insertAdjacentHTML("afterbegin", html);
  }

  /* ── 页头 ────────────────────────────────────────────── */
  function renderHeader() {
    var page = pageFile();
    var links = (B.nav || [])
      .map(function (item) {
        return (
          '<li><a href="' + esc(item.href) + '"' +
          (item.href === page ? ' class="is-active" aria-current="page"' : "") +
          ">" + esc(item.label) + "</a></li>"
        );
      })
      .join("");
    var cta = B.navCta || { label: "联系我们", href: "contact.html" };

    var html =
      '<a class="skip-link" href="#main">跳到主要内容</a>' +
      '<header class="topbar" data-topbar>' +
        '<a class="logo" href="index.html" aria-label="' + esc((B.name || "") + " 首页") + '">' +
          '<span class="logo-mark" aria-hidden="true">' + esc(B.monogram || "N") + "</span>" +
          '<span class="logo-text">' + esc(B.name || "") + "<em>" + esc(B.nameEn || "") + "</em></span>" +
        "</a>" +
        '<nav class="nav" id="site-nav" aria-label="主导航"><ul>' + links + "</ul>" +
          '<div class="nav-contact">' +
            '<a href="mailto:' + esc((B.contact || {}).email || "") + '">' + esc((B.contact || {}).email || "") + "</a>" +
            '<a href="tel:' + esc((B.contact || {}).phoneHref || "") + '">' + esc((B.contact || {}).phone || "") + "</a>" +
          "</div>" +
        "</nav>" +
        '<div class="topbar-actions">' +
          '<a class="btn btn-accent btn-sm topbar-cta" href="' + esc(cta.href) + '">' + esc(cta.label) + "</a>" +
          '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">' +
            '<span class="menu-bars" aria-hidden="true"><i></i><i></i></span>' +
            '<span class="visually-hidden">打开菜单</span>' +
          "</button>" +
        "</div>" +
      "</header>";

    doc.body.insertAdjacentHTML("afterbegin", html);
  }

  /* ── 页脚 ────────────────────────────────────────────── */
  function renderFooter() {
    var c = B.contact || {};
    var credit = B.copyright || {};
    var year = credit.year === "auto" || !credit.year ? new Date().getFullYear() : credit.year;
    var creditName = esc(credit.holder || "");
    var creditHtml = credit.url
      ? '<a class="credit-link" href="' + esc(credit.url) + '" target="_blank" rel="noopener noreferrer">' + creditName + "</a>"
      : creditName;

    var navLinks = (B.nav || [])
      .concat([{ label: "联系", href: "contact.html" }])
      .map(function (i) {
        return '<li><a href="' + esc(i.href) + '">' + esc(i.label) + "</a></li>";
      })
      .join("");

    var social = (B.social || [])
      .map(function (i) {
        return '<li><a href="' + esc(i.href) + '" rel="noopener">' + esc(i.label) + "</a></li>";
      })
      .join("");

    var html =
      '<footer class="footer">' +
        '<div class="shell">' +
          '<div class="footer-grid">' +
            '<div class="footer-lead">' +
              '<p class="label">下一步</p>' +
              '<h2>' + esc((B.footer || {}).headline || "") + "</h2>" +
              '<p class="footer-note">' + esc((B.footer || {}).note || "") + "</p>" +
              '<a class="btn btn-accent" href="contact.html">' + esc((B.navCta || {}).label || "联系我们") + "<span aria-hidden=\"true\">→</span></a>" +
            "</div>" +
            '<div class="footer-cols">' +
              '<div><p class="label">导航</p><ul>' + navLinks + "</ul></div>" +
              '<div><p class="label">联系</p><ul>' +
                '<li><a href="mailto:' + esc(c.email || "") + '">' + esc(c.email || "") + "</a></li>" +
                '<li><a href="tel:' + esc(c.phoneHref || "") + '">' + esc(c.phone || "") + "</a></li>" +
                '<li class="is-muted">' + esc(c.address || "") + "</li>" +
              "</ul></div>" +
              '<div><p class="label">关注</p><ul>' + social + "</ul></div>" +
            "</div>" +
          "</div>" +
          '<div class="footer-base">' +
            "<!-- 著作权声明：署名主体须与 LICENSE 版权行保持一致 -->" +
            '<p>版权所有 © ' + esc(year) + " " + creditHtml + "</p>" +
            ((B.footer || {}).legal ? "<p>" + esc(B.footer.legal) + "</p>" : "") +
            '<p><a href="#top">回到顶部 ↑</a></p>' +
          "</div>" +
        "</div>" +
      "</footer>";

    doc.body.insertAdjacentHTML("beforeend", html);
  }

  /* ── 案例 ────────────────────────────────────────────── */
  function renderWork() {
    $$("[data-work-grid]").forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit"), 10);
      var onlyFeatured = grid.getAttribute("data-filter") === "featured";
      var items = (B.work || []).filter(function (i) {
        return !onlyFeatured || i.featured;
      });
      if (limit > 0) items = items.slice(0, limit);

      grid.innerHTML = items
        .map(function (item, index) {
          var media = item.image
            ? '<img src="' + esc(item.image) + '" alt="' + esc(item.client + " 项目视觉") + '" loading="lazy" width="1200" height="900">'
            : '<div class="media-empty" role="img" aria-label="' + esc(item.client + " 项目图片待补充") + '">' +
                "<span>IMAGE PENDING</span><small>1200 × 900</small></div>";

          return (
            '<article class="work-tile" id="' + esc(item.slug) + '">' +
              '<a href="work.html#' + esc(item.slug) + '">' +
                '<div class="tile-media">' + media + "</div>" +
                '<div class="tile-head"><span>' + esc(item.client) + "</span><span>" + esc(item.year) + "</span></div>" +
                '<h3 class="tile-title">' + esc(item.title) + "</h3>" +
                '<p class="tile-text">' + esc(item.summary) + "</p>" +
                (item.metric
                  ? '<div class="tile-metric"><strong>' + esc(item.metric) + "</strong><span>" + esc(item.metricLabel || "") + "</span></div>"
                  : "") +
                '<span class="tile-cat">' + esc(item.category) + " →</span>" +
              "</a>" +
            "</article>"
          );
        })
        .join("");
    });
  }

  /* ── 联系方式与社交链接 ──────────────────────────────── */
  function bindContact() {
    var c = B.contact || {};
    $$("[data-contact]").forEach(function (el) {
      var key = el.getAttribute("data-contact");
      var value = c[key];
      if (!value) return;
      el.textContent = value;
      if (key === "email") el.setAttribute("href", "mailto:" + value);
      if (key === "phone") el.setAttribute("href", "tel:" + (c.phoneHref || value));
    });

    $$("[data-social-list]").forEach(function (list) {
      list.innerHTML = (B.social || [])
        .map(function (i) {
          return '<a href="' + esc(i.href) + '" rel="noopener">' + esc(i.label) + "</a>";
        })
        .join("");
    });
  }

  /* ── 数字滚动 ────────────────────────────────────────── */
  function initCounters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;

    var run = function (node) {
      var target = parseFloat(node.getAttribute("data-count"));
      var decimals = (node.getAttribute("data-decimals") || "0") | 0;
      var start = null;
      var duration = 1100;

      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = (target * eased).toFixed(decimals);
        if (p < 1) window.requestAnimationFrame(step);
        else node.textContent = target.toFixed(decimals);
      };
      window.requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (n) {
        n.textContent = parseFloat(n.getAttribute("data-count")).toFixed(
          (n.getAttribute("data-decimals") || "0") | 0
        );
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ── 进场与其他交互 ──────────────────────────────────── */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (i) { i.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var d = parseInt(e.target.getAttribute("data-delay"), 10) || 0;
        e.target.style.transitionDelay = d * 80 + "ms";
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (i) { io.observe(i); });
  }

  function initHeader() {
    var bar = $("[data-topbar]");
    if (!bar) return;

    var onScroll = function () {
      bar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var btn = $(".menu-btn", bar);
    var open = false;
    var setOpen = function (v) {
      open = v;
      bar.classList.toggle("nav-open", v);
      doc.body.classList.toggle("is-locked", v);
      btn.setAttribute("aria-expanded", v ? "true" : "false");
    };

    btn.addEventListener("click", function () { setOpen(!open); });
    $$(".nav a", bar).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  }

  /* 鼠标光晕：只更新两个 CSS 变量，交由 CSS 绘制 */
  function initGlow() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ticking = false;
    window.addEventListener(
      "pointermove",
      function (e) {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          root.style.setProperty("--mx", e.clientX + "px");
          root.style.setProperty("--my", e.clientY + "px");
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function initForm() {
    var form = $("[data-form]");
    if (!form) return;
    var status = $("[data-form-status]");
    var fields = {
      name: $('[name="name"]', form),
      email: $('[name="email"]', form),
      message: $('[name="message"]', form)
    };

    var setError = function (field, msg) {
      var wrap = field.closest(".field");
      var err = $(".field-error", wrap);
      wrap.classList.toggle("has-error", Boolean(msg));
      err.textContent = msg || "";
      field.setAttribute("aria-invalid", msg ? "true" : "false");
    };

    var validate = function () {
      var ok = true;
      var name = fields.name.value.trim();
      var email = fields.email.value.trim();
      var message = fields.message.value.trim();

      if (name.length < 2) { setError(fields.name, "至少 2 个字符"); ok = false; } else setError(fields.name, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setError(fields.email, "邮箱格式不正确"); ok = false; } else setError(fields.email, "");
      if (message.length < 10) { setError(fields.message, "请至少写 10 个字"); ok = false; } else setError(fields.message, "");
      return ok;
    };

    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener("input", function () {
        if (fields[k].closest(".field").classList.contains("has-error")) validate();
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        status.className = "form-status is-error";
        status.textContent = "请检查标红字段";
        return;
      }
      var submit = $('button[type="submit"]', form);
      submit.disabled = true;
      submit.textContent = "提交中…";
      /* 接入真实接口时在这里发起 fetch */
      window.setTimeout(function () {
        form.reset();
        submit.disabled = false;
        submit.textContent = "发送需求 →";
        status.className = "form-status is-ok";
        status.textContent = "已收到，我们会在 2 小时内联系你。";
      }, 500);
    });
  }

  /* ── 启动 ────────────────────────────────────────────── */
  applyTheme();
  applyFavicon();
  applyMeta();
  renderRail();
  renderHeader();
  renderFooter();
  renderWork();
  bindContact();
  initHeader();
  initReveal();
  initCounters();
  initGlow();
  initForm();

  if (window.location.hash) {
    var t = doc.getElementById(window.location.hash.slice(1));
    if (t) {
      t.style.transition = "none";
      t.classList.add("is-in");
      window.setTimeout(function () { t.scrollIntoView({ block: "start" }); }, 0);
    }
  }

  var yearNode = $("[data-year]");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
})();
