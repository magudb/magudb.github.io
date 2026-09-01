/* site.js — theme toggle, mobile menu, reading progress, back-to-top,
   and the link-index enhancement that turns a flat markdown link roundup
   into the Tatami banded layout. Loads alongside app.js; touches nothing it owns. */
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

  /* ---- mobile menu ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-menu-toggle]");
    if (!btn) return;
    var drawer = document.getElementById(btn.getAttribute("aria-controls") || "site-menu");
    if (!drawer) return;
    var open = drawer.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Close" : "Menu";
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

  /* ============================================================
     LINK INDEX
     Markdown gives us a flat sequence:  h1/h2  ->  ul  ->  h2  ->  ul ...
     CSS re-forms that into 5fr/7fr bands. This pass supplies what CSS
     can't: section numbers, per-section link counts, the sticky wrapper,
     source hosts, and the removal of sections that have no links.
     ============================================================ */
  var HOST_RE = /^www\./;

  function textOf(el) { return (el.textContent || "").replace(/\s+/g, " ").trim(); }

  function hostOf(href) {
    try { return new URL(href, location.href).hostname.replace(HOST_RE, ""); }
    catch (err) { return ""; }
  }

  /* The elements belonging to a heading, up to the NEXT heading of any level.
     Stopping at any heading (rather than same-or-higher rank) is what keeps a
     section's link count its own, and stops the favourites band from swallowing
     the rest of the post in the 2015 roundups where the whole hierarchy is
     shifted down a level. Returns { lists, others, links }. */
  function sectionOf(head) {
    var lists = [], others = [], links = 0;
    var el = head.nextElementSibling;
    while (el) {
      if (/^H[1-6]$/.test(el.tagName)) break;
      if (el.tagName === "UL" || el.tagName === "OL") {
        lists.push(el);
        links += el.children.length;
      } else {
        others.push(el);
      }
      el = el.nextElementSibling;
    }
    return { lists: lists, others: others, links: links };
  }

  function isFavLabel(l) { return /^(my favou?rit|must see)/.test(l); }
  function isTocLabel(l) { return /^categories\b/.test(l); }

  /* Which heading level acts as the section level for this post. Normally h1/h2;
     but ~10 posts from 2015 use "h1 title / h2 favourites / h3 sections", and
     there h3 is the section level, not a sub-heading. */
  function sectionHeads(root) {
    var all = Array.prototype.slice.call(root.children).filter(function (el) {
      return /^H[123]$/.test(el.tagName);
    });
    var plain = all.filter(function (h) {
      var l = textOf(h).toLowerCase();
      return !isFavLabel(l) && !isTocLabel(l);
    });
    var hasH2 = plain.some(function (h) { return h.tagName === "H2"; });
    var useH3 = !hasH2 && plain.some(function (h) { return h.tagName === "H3"; });
    return all.filter(function (h) { return h.tagName !== "H3" || useH3; });
  }

  /* Wrap a heading's contents so the design's sticky rail works, and hang the
     number and count off it. */
  function dressHeading(head, no, count) {
    if (head.querySelector(".linkdex__sticky")) return;
    var sticky = document.createElement("span");
    sticky.className = "linkdex__sticky";

    if (no) {
      var n = document.createElement("span");
      n.className = "linkdex__no";
      n.textContent = no;
      sticky.appendChild(n);
    }

    var name = document.createElement("span");
    name.className = "linkdex__name";
    while (head.firstChild) name.appendChild(head.firstChild);
    sticky.appendChild(name);

    if (count) {
      var c = document.createElement("span");
      c.className = "linkdex__count";
      c.textContent = count;
      sticky.appendChild(c);
    }

    head.appendChild(sticky);
  }

  /* Split a list item into its link, its trailing note, and a source chip.
     Older roundups are written as "* [Title](url) - a note about it", and some
     carry a second link inside the note; both stay intact. */
  function dressItem(li) {
    /* Items are visited twice — once per section, then once more to catch lists
       that sit outside any heading. Without this guard the second visit would
       collect the source chip we just appended into the trailing note. */
    if (li.dataset.dressed) return;
    var a = li.querySelector("a[href]");
    if (!a || a.classList.contains("link-item__src")) return;
    /* A few older roundups indent an item, giving <li><ul><li>…</li></ul></li>.
       querySelector would reach the inner anchor and dress the outer item with a
       duplicate host chip, so leave the link to the item that actually owns it. */
    if (a.closest("li") !== li) return;
    li.dataset.dressed = "1";

    a.classList.add("link-item__text");
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");

    /* Everything after the leading link becomes a muted note, so the title
       stays the title and the commentary reads as commentary. */
    if (!li.querySelector(".link-item__note")) {
      var trailing = [], n = a.nextSibling;
      while (n) {
        if (!(n.nodeType === 1 && n.classList.contains("link-item__src"))) trailing.push(n);
        n = n.nextSibling;
      }
      var meaningful = trailing.some(function (node) {
        return node.nodeType === 1 || (node.textContent || "").replace(/[\s–—-]+/g, "") !== "";
      });
      if (meaningful) {
        var note = document.createElement("span");
        note.className = "link-item__note";
        trailing.forEach(function (node) { note.appendChild(node); });
        /* drop a leading " - " separator now that the note is its own line */
        var first = note.firstChild;
        if (first && first.nodeType === 3) {
          first.nodeValue = first.nodeValue.replace(/^[\s–—-]+/, "");
        }
        if (textOf(note)) li.appendChild(note);
      }
    }

    if (li.querySelector(".link-item__src")) return;
    var host = hostOf(a.href);
    if (!host) return;
    var src = document.createElement("span");
    src.className = "link-item__src";
    src.textContent = host + " ";
    var ext = document.createElement("span");
    ext.className = "ext";
    ext.textContent = "↗";
    src.appendChild(ext);
    li.appendChild(src);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".linkdex"), function (root) {
    var heads = sectionHeads(root);

    var no = 0;
    heads.forEach(function (head) {
      var label = textOf(head).toLowerCase();
      var isFav = isFavLabel(label);
      var isToc = isTocLabel(label);
      var sec = sectionOf(head);
      head.classList.add("linkdex__head");

      /* A heading with nothing under it is an empty rubric — drop it and any
         stray whitespace nodes, rather than leaving a headed band with no links. */
      if (sec.links === 0 && sec.others.length === 0) {
        head.classList.add("is-empty");
        head.setAttribute("hidden", "");
        return;
      }

      sec.lists.forEach(function (list) {
        if (isFav) list.classList.add("linkdex__fav");
        if (isToc) list.classList.add("linkdex__toc");
        Array.prototype.forEach.call(list.children, dressItem);
      });

      if (isFav) {
        head.classList.add("linkdex__fav-head");
        dressHeading(head, "★", "");
      } else if (isToc) {
        head.classList.add("linkdex__toc-head");
        dressHeading(head, "", "");
      } else {
        no += 1;
        var n = (no < 10 ? "0" : "") + no;
        dressHeading(head, n, sec.links + (sec.links === 1 ? " link" : " links"));
      }
    });

    /* Link lists outside any heading still deserve the item treatment. */
    Array.prototype.forEach.call(root.querySelectorAll("li"), dressItem);
  });
})();
