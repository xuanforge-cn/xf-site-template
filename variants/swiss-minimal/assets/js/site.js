/**
 * 瑞士极简版 · 站点逻辑
 * 读取 brand.config.js，渲染页头、页脚与项目列表。
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

  function $(s, scope) {
    return (scope || doc).querySelector(s);
  }

  function $$(s, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(s));
  }

  function currentFile() {
    var f = window.location.pathname.split("/").pop();
    return f === "" ? "index.html" : f;
  }

  function applyTheme() {
    var t = Object.assign(
      {
        paper: "#F7F6F3",
        ink: "#111110",
        muted: "#6B6B66",
        line: "#D8D6CF",
        accent: "#D93A2B",
        dark: "#111110"
      },
      B.theme || {}
    );
    var map = {
      paper: "--paper",
      ink: "--ink",
      muted: "--muted",
      line: "--line",
      accent: "--accent",
      dark: "--dark"
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
    meta.setAttribute("content", t.paper);
  }

  function applyFavicon() {
    var t = B.theme || {};
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect width="64" height="64" fill="' + (t.paper || "#F7F6F3") + '"/>' +
      '<rect x="6" y="6" width="52" height="52" fill="' + (t.ink || "#111110") + '"/>' +
      '<circle cx="46" cy="18" r="6" fill="' + (t.accent || "#D93A2B") + '"/>' +
      "</svg>";
    var link = doc.querySelector('link[rel="icon"]');
    if (!link) {
      link = doc.createElement("link");
      link.setAttribute("rel", "icon");
      doc.head.appendChild(link);
    }
    link.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
  }

  function applyMeta() {
    var t = doc.querySelector("title[data-page]");
    if (t) {
      doc.title = t.getAttribute("data-page") + " · " + [B.name, B.nameEn].filter(Boolean).join(" ");
    }
    var d = doc.querySelector('meta[name="description"]');
    if (d && B.description) d.setAttribute("content", B.description);
    var a = doc.querySelector('meta[name="author"]');
    if (a && B.copyright) a.setAttribute("content", B.copyright.holder || "");
  }

  function renderHeader() {
    var page = currentFile();
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
    var phone = (B.contact || {}).phone || "";

    var html =
      '<a class="skip" href="#main">跳到主要内容</a>' +
      '<header class="masthead" data-masthead>' +
        '<div class="wrap masthead-grid">' +
          '<a class="brand" href="index.html" aria-label="' + esc((B.name || "") + " 首页") + '">' +
            '<span class="brand-mark" aria-hidden="true"></span>' +
            '<span class="brand-name">' + esc(B.name || "") + "</span>" +
            '<span class="brand-en">' + esc(B.nameEn || "") + "</span>" +
          "</a>" +
          '<p class="masthead-note">' + esc((B.contact || {}).city || "") + " · " + esc(phone) + "</p>" +
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mainnav">' +
            "<span>菜单</span><i aria-hidden=\"true\"></i>" +
          "</button>" +
        "</div>" +
        '<nav class="mainnav" id="mainnav" aria-label="主导航">' +
          '<div class="wrap mainnav-inner">' +
            "<ul>" + links + "</ul>" +
            '<a class="nav-cta" href="' + esc(cta.href) + '">' + esc(cta.label) + " <span aria-hidden=\"true\">↗</span></a>" +
          "</div>" +
        "</nav>" +
      "</header>";

    doc.body.insertAdjacentHTML("afterbegin", html);
  }

  function renderFooter() {
    var c = B.contact || {};
    var credit = B.copyright || {};
    var year = credit.year === "auto" || !credit.year ? new Date().getFullYear() : credit.year;
    var creditName = esc(credit.holder || "");
    var creditHtml = credit.url
      ? '<a href="' + esc(credit.url) + '" target="_blank" rel="noopener noreferrer">' + creditName + "</a>"
      : creditName;

    var navLinks = (B.nav || [])
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
        '<div class="wrap">' +
          '<div class="footer-top">' +
            '<div class="footer-lead">' +
              '<p class="tag">Next</p>' +
              "<h2>" + esc((B.footer || {}).headline || "") + "</h2>" +
              '<p class="footer-note">' + esc((B.footer || {}).note || "") + "</p>" +
              '<a class="link-arrow" href="contact.html">写一封邮件 <span aria-hidden="true">→</span></a>' +
            "</div>" +
            '<div class="footer-cols">' +
              "<div><p class=\"tag\">Index</p><ul>" + navLinks + "</ul></div>" +
              "<div><p class=\"tag\">Contact</p><ul>" +
                '<li><a href="mailto:' + esc(c.email || "") + '">' + esc(c.email || "") + "</a></li>" +
                '<li><a href="tel:' + esc(c.phoneHref || "") + '">' + esc(c.phone || "") + "</a></li>" +
                '<li class="is-plain">' + esc(c.address || "") + "</li>" +
              "</ul></div>" +
              "<div><p class=\"tag\">Follow</p><ul>" + social + "</ul></div>" +
            "</div>" +
          "</div>" +
          '<p class="footer-mark" aria-hidden="true">' + esc(B.nameEn || B.name || "") + "</p>" +
          '<div class="footer-base">' +
            "<!-- 著作权声明：署名主体须与 LICENSE 版权行保持一致 -->" +
            '<p>版权所有 © ' + esc(year) + " " + creditHtml + "</p>" +
            '<p><a href="#top">回到顶部 ↑</a></p>' +
          "</div>" +
        "</div>" +
      "</footer>";

    doc.body.insertAdjacentHTML("beforeend", html);
  }

  function renderWork() {
    $$("[data-projects]").forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit"), 10);
      var onlyFeatured = grid.getAttribute("data-filter") === "featured";
      var items = (B.work || []).filter(function (i) {
        return !onlyFeatured || i.featured;
      });
      if (limit > 0) items = items.slice(0, limit);

      grid.innerHTML = items
        .map(function (item, index) {
          var no = String(index + 1).padStart(2, "0");
          var media = item.image
            ? '<img src="' + esc(item.image) + '" alt="' + esc(item.client + " 项目照片") + '" loading="lazy" width="1200" height="1200">'
            : '<div class="media-empty" role="img" aria-label="' + esc(item.client + " 项目照片待补充") + '">' +
                '<span class="plus" aria-hidden="true">＋</span><span>图片待补充</span><small>1200 × 1200</small></div>';

          return (
            '<article class="project" id="' + esc(item.slug) + '">' +
              '<a href="work.html#' + esc(item.slug) + '">' +
                '<figure class="project-media">' + media + "</figure>" +
                '<div class="project-meta"><span class="no">' + no + "</span><span>" + esc(item.year) + "</span></div>" +
                '<h3 class="project-title">' + esc(item.title) + "</h3>" +
                '<p class="project-sub">' + esc(item.client) + " · " + esc(item.place || item.category) + "</p>" +
                (item.area ? '<p class="project-area">' + esc(item.area) + "</p>" : "") +
              "</a>" +
            "</article>"
          );
        })
        .join("");
    });
  }

  function initHeader() {
    var head = $("[data-masthead]");
    if (!head) return;
    var btn = $(".menu-toggle", head);
    var open = false;

    var setOpen = function (v) {
      open = v;
      head.classList.toggle("is-open", v);
      btn.setAttribute("aria-expanded", v ? "true" : "false");
      doc.body.classList.toggle("is-locked", v);
    };

    btn.addEventListener("click", function () { setOpen(!open); });
    $$(".mainnav a", head).forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

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
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.08 });

    items.forEach(function (i) { io.observe(i); });
  }

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
      var n = fields.name.value.trim();
      var e = fields.email.value.trim();
      var m = fields.message.value.trim();

      if (n.length < 2) { setError(fields.name, "请填写称呼"); ok = false; } else setError(fields.name, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) { setError(fields.email, "邮箱格式不正确"); ok = false; } else setError(fields.email, "");
      if (m.length < 10) { setError(fields.message, "请至少写 10 个字"); ok = false; } else setError(fields.message, "");
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
      submit.textContent = "发送中…";
      /* 接入真实接口时在这里发起 fetch */
      window.setTimeout(function () {
        form.reset();
        submit.disabled = false;
        submit.textContent = "发送 →";
        status.className = "form-status is-ok";
        status.textContent = "已收到，我们会在两个工作日内回复。";
      }, 450);
    });
  }

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

  if (window.location.hash) {
    var target = doc.getElementById(window.location.hash.slice(1));
    if (target) {
      target.classList.add("is-in");
      target.style.transition = "none";
      window.setTimeout(function () { target.scrollIntoView({ block: "start" }); }, 0);
    }
  }
})();
