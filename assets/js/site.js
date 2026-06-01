/* site.js — theme toggle, reading progress, back-to-top, link-index enhancement.
   Loads alongside the existing app.js / search bundle; touches nothing it owns. */
(function () {
  "use strict";

  /* ---- theme toggle ----
     Suppress transitions during the switch: a CSS transition on a var()-backed
     property won't repaint when only the custom property changes (Chrome quirk),
     so we flip instantly with transitions off, then restore them for hover. */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var root = document.documentElement;
    var cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.classList.add("theme-switching");
    root.setAttribute("data-theme", next);
    void root.offsetHeight;
    root.classList.remove("theme-switching");
    try { localStorage.setItem("theme", next); } catch (err) {}
  });

  /* ---- back to top ---- */
  var totop = document.querySelector(".totop");
  if (totop) {
    totop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    var onScrollTop = function () { totop.classList.toggle("show", window.scrollY > 800); };
    window.addEventListener("scroll", onScrollTop, { passive: true });
    onScrollTop();
  }

  /* ---- reading progress (posts only) ---- */
  var pfill = document.querySelector(".progress__fill");
  if (pfill) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      pfill.style.width = (max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0) + "%";
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---- link-index enhancement (Curated Insights roundups) ---- */
  var roots = document.querySelectorAll(".post--links");
  Array.prototype.forEach.call(roots, function (root) {
    var heads = root.querySelectorAll("h1, h2");
    Array.prototype.forEach.call(heads, function (h, i) {
      var no = ("0" + (i + 1)).slice(-2);
      var count = 0, el = h.nextElementSibling;
      while (el && el.tagName !== "H1" && el.tagName !== "H2") {
        if (el.querySelectorAll) count += el.querySelectorAll("li").length;
        el = el.nextElementSibling;
      }
      h.setAttribute("data-no", no + " —");
      if (count) h.setAttribute("data-count", count + (count === 1 ? " link" : " links"));
    });

    var items = root.querySelectorAll("li");
    Array.prototype.forEach.call(items, function (li) {
      var a = li.querySelector("a[href]");
      if (!a || a.classList.contains("link-item__src")) return;
      a.classList.add("link-item__text");
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      if (li.querySelector(".link-item__src")) return;
      var host = "";
      try { host = new URL(a.href, location.href).hostname.replace(/^www\./, ""); } catch (err) { host = ""; }
      if (!host) return;
      var s = document.createElement("a");
      s.className = "link-item__src";
      s.href = a.href; s.target = "_blank"; s.rel = "noopener noreferrer";
      s.innerHTML = host + ' <span class="ext">↗</span>';
      li.appendChild(s);
    });
  });
})();
