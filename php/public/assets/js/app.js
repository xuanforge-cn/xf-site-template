/**
 * PHP 版交互层：只负责菜单、滚动状态、进场动画与表单校验。
 * 页头页脚由 PHP 输出，这里不再渲染任何结构。
 *
 * 署名：github.com/xuanforge-cn
 */
(function () {
  "use strict";

  var doc = document;

  function $(selector, scope) {
    return (scope || doc).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
  }

  /* 页头滚动态 + 移动端菜单 */
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

  /* 滚动进场 */
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
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* 从其他页面跳转到 ?p=work#slug 时，等布局稳定再定位 */
  function initHash() {
    if (!window.location.hash) return;

    var target = doc.getElementById(window.location.hash.slice(1));
    if (!target) return;

    target.style.transition = "none";
    target.classList.add("is-visible");
    window.setTimeout(function () {
      target.scrollIntoView({ block: "start" });
    }, 0);
  }

  /* 表单前端校验：无效时阻止提交，有效时交给 PHP 处理 */
  function initForms() {
    $$("[data-validate]").forEach(function (form) {
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

        if (fields.name && fields.name.value.trim().length < 2) {
          setError(fields.name, "请填写你的称呼（至少 2 个字）");
          ok = false;
        } else if (fields.name) {
          setError(fields.name, "");
        }

        if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim())) {
          setError(fields.email, "请填写有效的邮箱地址");
          ok = false;
        } else if (fields.email) {
          setError(fields.email, "");
        }

        if (fields.message && fields.message.value.trim().length < 10) {
          setError(fields.message, "再多说一点吧，至少 10 个字");
          ok = false;
        } else if (fields.message) {
          setError(fields.message, "");
        }

        return ok;
      };

      Object.keys(fields).forEach(function (key) {
        if (!fields[key]) return;
        fields[key].addEventListener("input", function () {
          if (fields[key].closest(".field").classList.contains("has-error")) validate();
        });
      });

      form.addEventListener("submit", function (event) {
        if (!validate()) {
          event.preventDefault();
          var status = $("[data-form-status]", form);
          if (status) {
            status.className = "form-status is-error";
            status.textContent = "请检查标红的字段后再提交。";
          }
        }
      });
    });
  }

  initHeader();
  initReveal();
  initHash();
  initForms();
})();
