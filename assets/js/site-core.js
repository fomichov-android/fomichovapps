/**
 * FomichovApps Unified Site Configuration, Analytics (GA4 + Consent Mode v2),
 * Eye-Comfort Theme Switcher, and Google Play Attribution Script (Late 2026)
 *
 * КАК НАСТРОИТЬ ПРИ ПОКУПКЕ ДОМЕНА И ПОДКЛЮЧЕНИИ АНАЛИТИКИ:
 * 1. Замените siteUrl на ваш новый домен (или запустите скрипт: python3 update-domain.py yourdomain.com G-XXXXXXX)
 * 2. Вставьте ваш идентификатор Google Analytics 4 (формата "G-XXXXXXXXXX") в поле ga4MeasurementId.
 * 3. При желании вставьте ID Microsoft Clarity (бесплатные тепловые карты кликов) в поле clarityProjectId.
 */
window.FOMICHOV_CONFIG = {
  siteUrl: "https://fomichovapps.com",
  ga4MeasurementId: "",         // Пример: "G-1234567890" (оставьте пустым, пока не создадите счётчик в Google Analytics)
  clarityProjectId: "",         // Пример: "abcde12345" (Microsoft Clarity — по желанию)
  developerEmail: "fomichov.developer@gmail.com",
  developerId: "5082361350201276993"
};

(function () {
  // 1. Initialize Eye-Comfort Theme (Dark Soft by default, or user-saved Light/Dark)
  try {
    var savedTheme = localStorage.getItem("fomichov_theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("theme-light");
    } else if (!savedTheme && window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      // Keep soft dark as default brand identity unless user toggles, or respect saved choice
    }
  } catch (e) {}

  // 2. Initialize Google Analytics 4 (GA4) with Consent Mode v2 if configured
  var cfg = window.FOMICHOV_CONFIG || {};
  if (cfg.ga4MeasurementId && cfg.ga4MeasurementId.indexOf("G-") === 0 && cfg.ga4MeasurementId !== "G-XXXXXXXXXX") {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    // Default Consent Mode v2 (privacy-safe analytics storage)
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
      wait_for_update: 500
    });

    gtag("js", new Date());
    gtag("config", cfg.ga4MeasurementId, {
      anonymize_ip: true,
      send_page_view: true
    });

    var gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.ga4MeasurementId);
    document.head.appendChild(gaScript);
  }

  // 3. Initialize Microsoft Clarity if configured
  if (cfg.clarityProjectId && cfg.clarityProjectId.length > 3) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", cfg.clarityProjectId);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var htmlEl = document.documentElement;
    var pageLang = (htmlEl.getAttribute("lang") || "uk").toLowerCase();

    // Save language preference when user visits a language branch
    try {
      if (window.location.pathname.indexOf("/en/") !== -1) {
        localStorage.setItem("fomichov_lang", "en");
      } else if (window.location.pathname.indexOf("/uk/") !== -1) {
        localStorage.setItem("fomichov_lang", "uk");
      }
    } catch (e) {}

    // 4. Bind Theme Toggle Button(s)
    function updateToggleIcons() {
      var isLight = htmlEl.classList.contains("theme-light");
      var btns = document.querySelectorAll(".js-theme-toggle");
      btns.forEach(function (btn) {
        btn.innerHTML = isLight
          ? '<svg class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>'
          : '<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>';
        var label = isLight
          ? (pageLang === "en" ? "Switch to dark eye-care theme" : "Увімкнути темну тему для очей")
          : (pageLang === "en" ? "Switch to soft light theme" : "Увімкнути м’яку світлу тему");
        btn.setAttribute("aria-label", label);
        btn.setAttribute("title", label);
      });
    }

    var toggleBtns = document.querySelectorAll(".js-theme-toggle");
    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isLight = htmlEl.classList.toggle("theme-light");
        try {
          localStorage.setItem("fomichov_theme", isLight ? "light" : "dark");
        } catch (e) {}
        updateToggleIcons();
      });
    });
    updateToggleIcons();

    // 5. UTM Passthrough & Automatic Google Play Attribution + GA4 Click Tracking
    var currentQuery = window.location.search;
    var pageParams = new URLSearchParams(currentQuery);
    var playLinks = document.querySelectorAll('.js-gp-link, a[href*="play.google.com/store/apps/"]');

    playLinks.forEach(function (link) {
      try {
        var targetUrl = new URL(link.href);
        // Forward existing UTM params or attach default site attribution
        if (currentQuery) {
          pageParams.forEach(function (value, key) {
            targetUrl.searchParams.set(key, value);
          });
        } else if (!targetUrl.searchParams.has("utm_source")) {
          targetUrl.searchParams.set("utm_source", "fomichovapps_website");
          targetUrl.searchParams.set("utm_medium", "organic_web");
          targetUrl.searchParams.set("utm_campaign", pageLang + "_landing");
        }
        link.href = targetUrl.toString();

        // Track outbound Google Play click in GA4
        link.addEventListener("click", function () {
          if (typeof window.gtag === "function") {
            var appId = targetUrl.searchParams.get("id") || "developer_page";
            window.gtag("event", "google_play_click", {
              app_id: appId,
              page_language: pageLang,
              page_path: window.location.pathname,
              link_url: link.href
            });
          }
        });
      } catch (e) {}
    });
  });
})();
