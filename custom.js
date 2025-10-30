// Custom image slider
(function () {
  // Lazy initializer for basic image slider `.c-image-slider-column`
  var SLICK_CSS =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
  var SLICK_THEME =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
  var SLICK_JS =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
  var JQUERY_JS = "https://code.jquery.com/jquery-3.7.1.min.js";

  function loadCSS(href) {
    if (!document.querySelector('link[href="' + href + '"]')) {
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }
  }
  function loadScript(src, cb) {
    if (document.querySelector('script[src="' + src + '"]')) {
      if (cb) cb();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function ensureSlick(done) {
    // Ensure jQuery first, then Slick
    function ensureSlickCore() {
      loadCSS(SLICK_CSS);
      loadCSS(SLICK_THEME);
      loadScript(SLICK_JS, done);
    }
    if (!window.jQuery) {
      loadScript(JQUERY_JS, ensureSlickCore);
      return;
    }
    if (!window.jQuery.fn || !window.jQuery.fn.slick) {
      ensureSlickCore();
      return;
    }
    done();
  }

  function initImageSlider(selector) {
    if (!jQuery(".c-image-slider-column .c-slider-wrapper").length) {
      jQuery(".c-image-slider-column").wrapInner(
        '<div class="c-slider-wrapper"></div>'
      );
    }

    // Initialize Slick with Divi arrows
    jQuery(".c-slider-wrapper").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
      speed: 600,
      adaptiveHeight: true,
      slide: ".et_pb_module",
      responsive: [{ breakpoint: 980, settings: { slidesToShow: 1 } }],
    });
  }

  // Boot on first match (lazy & lightweight)
  (function boot() {
    var defaultSelector = ".c-image-slider-column";
    if (document.querySelector(defaultSelector)) {
      initImageSlider(defaultSelector);
      return;
    }
    var bootObserver = new MutationObserver(function () {
      if (document.querySelector(defaultSelector)) {
        bootObserver.disconnect();
        initImageSlider(defaultSelector);
      }
    });
    bootObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  })();

  // Expose globally for custom usage
  window.initImageSlider = initImageSlider;
})();

/* c-feature-image-slider-column — feature + thumbnail slider with overlay + fancybox */
(function () {
  // ✅ Stop if Divi Visual Builder is active
  if (document.body.classList.contains("et_fb")) return;

  // CDN URLs
  var SLICK_CSS =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
  var SLICK_THEME =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
  var SLICK_JS =
    "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
  var FANCY_CSS =
    "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css";
  var FANCY_JS =
    "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js";
  var JQUERY_JS = "https://code.jquery.com/jquery-3.7.1.min.js";

  function loadCSS(href) {
    if (!document.querySelector('link[href="' + href + '"]')) {
      var l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
    }
  }
  function loadScript(src, cb) {
    if (document.querySelector('script[src="' + src + '"]')) {
      if (cb) cb();
      return;
    }
    var s = document.createElement("script");
    s.src = src;
    s.onload = cb;
    document.head.appendChild(s);
  }

  function ensureDeps(done) {
    // Ensure jQuery first, then Slick, then Fancybox
    function ensureSlickThenFancy() {
      loadCSS(SLICK_CSS);
      loadCSS(SLICK_THEME);
      loadScript(SLICK_JS, function () {
        loadCSS(FANCY_CSS);
        loadScript(FANCY_JS, done);
      });
    }
    if (!window.jQuery) {
      loadScript(JQUERY_JS, ensureSlickThenFancy);
      return;
    }
    if (
      !window.jQuery.fn ||
      !window.jQuery.fn.slick ||
      typeof Fancybox === "undefined"
    ) {
      ensureSlickThenFancy();
      return;
    }
    done();
  }

  // Lightweight, reusable initializer: pass any selector to use anywhere
  function initFeatureImageSlider(selector) {
    if (!document.querySelector(selector)) return;

    ensureDeps(function () {
      (function ($) {
        function buildFeatureFromColumn($col) {
          if ($col.data("cfs-initialized")) return;

          var imgs = [];
          $col.find(".et_pb_module").each(function () {
            var $img = $(this).find("img").first();
            if ($img.length) imgs.push($img.attr("src"));
          });
          if (!imgs.length) return;

          var uid =
            "cfs_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
          var featId = uid + "_feat";
          var thumbId = uid + "_thumb";

          var $wrap = $('<div class="c-feature-wrap"></div>');
          var $feature = $(
            '<div class="feature-slider" id="' + featId + '"></div>'
          );
          var $thumbs = $(
            '<div class="thumb-slider" id="' + thumbId + '"></div>'
          );

          imgs.forEach(function (src) {
            $feature.append(
              '<div class="feature-slide"><div class="cfs-overlay-wrap"><img src="' +
                src +
                '" alt=""><div class="cfs-overlay-btn">Voir toutes les photos</div></div></div>'
            );
            $thumbs.append(
              '<div class="thumb"><div class="cfs-overlay-wrap"><img src="' +
                src +
                '" alt=""><div class="cfs-overlay-btn thumb-overlay-btn">Voir toutes les</div></div></div>'
            );
          });

          var $thumbWrapper = $('<div class="thumb-slider-wrapper"></div>');
          $thumbWrapper.append($thumbs);
          $thumbWrapper.append(
            '<div class="button-wrap"><button class="see-all-btn hero-btn btn-primary subtle-hover" type="button">Voir toutes les photos</button></div>'
          );

          $wrap.append($feature).append($thumbWrapper);
          $col.prepend($wrap);

          $col.find(".et_pb_module").hide();

          var $f = $("#" + featId);
          var $t = $("#" + thumbId);

          $f.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3500,
            speed: 700,
            adaptiveHeight: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            asNavFor: "#" + thumbId,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
          });

          $t.slick({
            slidesToShow: Math.min(5, imgs.length),
            slidesToScroll: 1,
            asNavFor: "#" + featId,
            focusOnSelect: true,
            arrows: false,
            autoplay: false,
            speed: 700,
            infinite: imgs.length > 5,
            draggable: true,
            swipe: true,
            swipeToSlide: true,
            touchMove: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            prevArrow:
              '<button type="button" class="slick-prev"><span class="etmodules-arrow">&#xe045;</span></button>',
            nextArrow:
              '<button type="button" class="slick-next"><span class="etmodules-arrow">&#xe046;</span></button>',
            responsive: [
              {
                breakpoint: 980,
                settings: { slidesToShow: Math.min(4, imgs.length) },
              },
              {
                breakpoint: 767,
                settings: { slidesToShow: Math.min(3, imgs.length) },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: Math.min(2, imgs.length) },
              },
            ],
          });

          function openGallery() {
            var items = imgs.map(function (s) {
              return { src: s, type: "image" };
            });
            if (typeof Fancybox !== "undefined") {
              Fancybox.show(items, {
                infinite: true,
                on: {
                  reveal: () => $f.slick("slickPause"),
                  closing: () => $f.slick("slickPlay"),
                },
              });
            } else if ($.fancybox) {
              $.fancybox.open(items, {
                loop: true,
                beforeShow: () => $f.slick("slickPause"),
                afterClose: () => $f.slick("slickPlay"),
              });
            } else {
              window.open(items[0].src, "_blank");
            }
          }

          $wrap.on(
            "click",
            "img, .cfs-overlay-btn, .cfs-overlay-wrap, .see-all-btn",
            openGallery
          );

          $col.data("cfs-initialized", true);
        }

        function initAll() {
          $(selector).each(function () {
            buildFeatureFromColumn($(this));
          });
        }

        $(window).off("load.cfs").on("load.cfs", initAll);
        $(document)
          .off("et_pb_builder_ready.cfs")
          .on("et_pb_builder_ready.cfs", initAll);
        var observer = new MutationObserver(initAll);
        observer.observe(document.body, { childList: true, subtree: true });

        if (document.readyState !== "loading") initAll();
      })(jQuery);
    });
  }

  // Boot the initializer only when the target appears (lazy & lightweight)
  (function bootOnFirstMatch() {
    var defaultSelector = ".c-feature-image-slider-column";
    if (document.querySelector(defaultSelector)) {
      initFeatureImageSlider(defaultSelector);
      return;
    }
    var bootObserver = new MutationObserver(function () {
      if (document.querySelector(defaultSelector)) {
        bootObserver.disconnect();
        initFeatureImageSlider(defaultSelector);
      }
    });
    bootObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  })();

  // Expose globally for use anywhere with custom selectors
  window.initFeatureImageSlider = initFeatureImageSlider;
})();

// Expose globally for use anywhere with custom selectors
window.initFeatureImageSlider = initFeatureImageSlider;
