(function () {
  "use strict";

  var STORAGE_KEY = "ohmycatch-lang";

  function currentLang() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved === "zh" || saved === "en") {
      return saved;
    }
    var nav = navigator.language || "";
    return /^zh/i.test(nav) ? "zh" : "en";
  }

  function setLang(lang) {
    document.documentElement.lang = lang;
    var root = document.documentElement;
    root.querySelectorAll("[data-lang]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    var btn = root.querySelector("[data-lang-switch]");
    if (btn) {
      btn.textContent = lang === "zh" ? "English" : "中文";
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* storage unavailable — ignore */
    }
  }

  var btn = document.querySelector("[data-lang-switch]");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = document.documentElement.lang === "zh" ? "en" : "zh";
      setLang(next);
    });
  }

  setLang(currentLang());
})();
