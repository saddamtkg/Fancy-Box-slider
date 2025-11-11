/**
 * Fancy Box Slider - Standalone Gallery System
 * Dynamically loads all dependencies and initializes sliders
 * Works with any HTML structure
 */

(function () {
  "use strict";

  // Configuration
  var CONFIG = {
    // CDN URLs
    jquery: "https://code.jquery.com/jquery-3.6.0.min.js",
    slickCSS: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
    slickThemeCSS:
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css",
    slickJS:
      "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
    fancyboxCSS:
      "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css",
    fancyboxJS:
      "https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js",
    // Custom CSS (relative to this script)
    customCSS: "styles.css",
  };

  // State management
  var state = {
    jqueryLoaded: false,
    slickLoaded: false,
    fancyboxLoaded: false,
    customCSSLoaded: false,
    initialized: false,
  };

  /**
   * Load CSS dynamically
   */
  function loadCSS(url, id) {
    return new Promise(function (resolve, reject) {
      // Check if already loaded
      if (document.getElementById(id)) {
        resolve();
        return;
      }

      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      link.id = id;

      link.onload = function () {
        resolve();
      };
      link.onerror = function () {
        reject(new Error("Failed to load CSS: " + url));
      };

      document.head.appendChild(link);
    });
  }

  /**
   * Load JavaScript dynamically
   */
  function loadJS(url) {
    return new Promise(function (resolve, reject) {
      // Check if already loaded
      var scripts = document.getElementsByTagName("script");
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src === url) {
          resolve();
          return;
        }
      }

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.async = false;

      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject(new Error("Failed to load JS: " + url));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Get custom CSS path relative to this script
   */
  function getCustomCSSPath() {
    // Try to find the current script
    var scripts = document.getElementsByTagName("script");
    var currentScript = null;
    
    // Find the script that contains this code (fancy-box-slider.js)
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf("fancy-box-slider.js") !== -1) {
        currentScript = scripts[i];
        break;
      }
    }
    
    // Fallback to last script if not found
    if (!currentScript && scripts.length > 0) {
      currentScript = scripts[scripts.length - 1];
    }
    
    if (currentScript && currentScript.src) {
      var scriptPath = currentScript.src;
      var scriptDir = scriptPath.substring(0, scriptPath.lastIndexOf("/") + 1);
      return scriptDir + CONFIG.customCSS;
    }
    
    // Fallback to root
    return CONFIG.customCSS;
  }

  /**
   * Load all dependencies
   */
  function loadDependencies() {
    return new Promise(function (resolve, reject) {
      // Check if jQuery is already loaded
      if (typeof window.jQuery !== "undefined") {
        state.jqueryLoaded = true;
        loadRemainingDependencies().then(resolve).catch(reject);
        return;
      }

      // Load jQuery first
      loadJS(CONFIG.jquery)
        .then(function () {
          state.jqueryLoaded = true;
          return loadRemainingDependencies();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Load remaining dependencies (CSS and JS)
   */
  function loadRemainingDependencies() {
    var promises = [];

    // Load CSS files (required)
    promises.push(loadCSS(CONFIG.slickCSS, "fancy-slider-slick-css"));
    promises.push(
      loadCSS(CONFIG.slickThemeCSS, "fancy-slider-slick-theme-css")
    );
    promises.push(loadCSS(CONFIG.fancyboxCSS, "fancy-slider-fancybox-css"));
    
    // Load custom CSS (optional - may already be included in HTML)
    promises.push(
      loadCSS(getCustomCSSPath(), "fancy-slider-custom-css").catch(function (err) {
        // Custom CSS is optional - if not found, it may already be included in HTML
        console.log("Custom CSS not loaded via JS (may already be in HTML):", err.message);
        return Promise.resolve();
      })
    );

    // Load JS files
    promises.push(
      loadJS(CONFIG.slickJS).then(function () {
        state.slickLoaded = true;
      })
    );
    promises.push(
      loadJS(CONFIG.fancyboxJS).then(function () {
        state.fancyboxLoaded = true;
      })
    );

    return Promise.all(promises).then(function () {
      state.customCSSLoaded = true;
    });
  }

  /**
   * Find images in any HTML structure
   * Supports: .et_pb_module img, direct img children, or any nested structure
   */
  function findImages($container) {
    var imgs = [];
    var $items = $container.children();

    // If no direct children, try to find any structure
    if ($items.length === 0) {
      $items = $container.find("> *");
    }

    $items.each(function () {
      var $item = $(this);
      var $img = $item.find("img").first();

      // If no img found, check if the item itself is an img
      if ($img.length === 0 && $item.is("img")) {
        $img = $item;
      }

      if ($img.length) {
        imgs.push({
          src: $img.attr("src"),
          alt: $img.attr("alt") || "",
        });
      }
    });

    return imgs;
  }

  /**
   * Find content items (for content-based sliders)
   * Returns jQuery collection of direct children
   */
  function findContentItems($container) {
    var $items = $container.children();

    // If no direct children, try to find any structure
    if ($items.length === 0) {
      $items = $container.find("> *");
    }

    return $items;
  }

  /**
   * Initialize gallery for a single container
   */
  function initGallery($column) {
    // Skip if already initialized
    if ($column.data("gallery-initialized")) {
      return;
    }

    // Check if Slick is available
    if (typeof $.fn.slick === "undefined") {
      // Retry with exponential backoff (max 5 retries)
      var retryCount = $column.data("slick-retry-count") || 0;
      if (retryCount < 5) {
        $column.data("slick-retry-count", retryCount + 1);
        setTimeout(function () {
          initGallery($column);
        }, 100 * (retryCount + 1));
      } else {
        console.error("Slick Carousel failed to load after multiple attempts");
      }
      return;
    }
    // Reset retry count on success
    $column.removeData("slick-retry-count");

    // READ DATA ATTRIBUTES (with defaults)
    var showFeature = $column.attr("data-show-feature") !== "false";
    var showThumbnails = $column.attr("data-show-thumbnails") !== "false";
    var enableLightbox = $column.attr("data-enable-lightbox") !== "false";
    var autoplay = $column.attr("data-autoplay") !== "false";
    var autoplaySpeed =
      parseInt($column.attr("data-autoplay-speed")) || 3500;

    // Extract images - works with any structure
    var imgs = findImages($column);
    var $contentItems = findContentItems($column);
    var isContentSlider = imgs.length === 0 && $contentItems.length > 0;

    // If no images and no content items, skip
    if (!imgs.length && !$contentItems.length) {
      console.warn("No images or content found in slider container");
      return;
    }

    // For content-based sliders (no images), use simple slider mode
    if (isContentSlider) {
      // Disable thumbnails and lightbox for content sliders
      showThumbnails = false;
      enableLightbox = false;
      
      // Get number of items
      var itemCount = $contentItems.length;
      
      // Determine slides to show (can be configured via data attribute)
      var slidesToShow = parseInt($column.attr("data-slides-to-show")) || 1;
      slidesToShow = Math.min(slidesToShow, itemCount);
      
      // Initialize content slider directly
      setTimeout(function () {
        $column.slick({
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
          fade: false,
          arrows: itemCount > slidesToShow,
          dots: true,
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed,
          speed: 700,
          adaptiveHeight: true,
          pauseOnHover: true,
          pauseOnFocus: true,
          draggable: true,
          swipe: true,
          touchMove: true,
          cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
          responsive: [
            {
              breakpoint: 980,
              settings: {
                slidesToShow: Math.min(2, itemCount),
                arrows: itemCount > 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                arrows: itemCount > 1,
              },
            },
          ],
        });
      }, 100);
      
      $column.data("gallery-initialized", true);
      return;
    }

    // Generate unique IDs
    var uid =
      "gallery_" + Date.now() + "_" + Math.floor(Math.random() * 9999);
    var featId = uid + "_feature";
    var thumbId = uid + "_thumb";

    // Build wrapper
    var $wrap = $('<div class="c-feature-wrap"></div>');

    // BUILD FEATURE SLIDER (if enabled)
    if (showFeature) {
      var $feature = $(
        '<div class="feature-slider" id="' + featId + '"></div>'
      );

      $.each(imgs, function (i, img) {
        var overlay = enableLightbox
          ? '<div class="cfs-overlay-btn">View All Photos</div>'
          : "";
        $feature.append(
          '<div class="feature-slide">' +
            '<div class="cfs-overlay-wrap">' +
            '<img src="' +
            img.src +
            '" alt="' +
            img.alt +
            '">' +
            overlay +
            "</div>" +
            "</div>"
        );
      });

      $wrap.append($feature);
    }

    // BUILD THUMBNAIL SLIDER (if enabled)
    if (showThumbnails) {
      var $thumbWrapper = $('<div class="thumb-slider-wrapper"></div>');
      var $thumbs = $(
        '<div class="thumb-slider" id="' + thumbId + '"></div>'
      );

      $.each(imgs, function (i, img) {
        $thumbs.append(
          '<div class="thumb-item">' +
            '<div class="thumb">' +
            '<img src="' +
            img.src +
            '" alt="' +
            img.alt +
            '">' +
            "</div>" +
            "</div>"
        );
      });

      $thumbWrapper.append($thumbs);

      // Add button if lightbox enabled
      if (enableLightbox) {
        $thumbWrapper.append(
          '<div class="button-wrap">' +
            '<button class="see-all-btn" type="button">View All Photos</button>' +
            "</div>"
        );
      }

      $wrap.append($thumbWrapper);
    }

    // Add to DOM and hide original content
    $column.prepend($wrap);
    // Hide all direct children except the wrapper we just added
    $column.children().not($wrap[0]).hide();

    // Initialize sliders after DOM ready
    var initTimeout = setTimeout(function () {
      // INITIALIZE FEATURE SLIDER
      if (showFeature) {
        var $featureSlider = $("#" + featId);

        $featureSlider.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          arrows: !showThumbnails,
          dots: !showThumbnails,
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed,
          speed: 700,
          adaptiveHeight: false,
          pauseOnHover: true,
          pauseOnFocus: true,
          draggable: true,
          swipe: true,
          touchMove: true,
          asNavFor: showThumbnails ? "#" + thumbId : null,
          cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
        });
      }

      // INITIALIZE THUMBNAIL SLIDER
      if (showThumbnails) {
        var $thumbSlider = $("#" + thumbId);

        $thumbSlider.slick({
          slidesToShow: Math.min(5, imgs.length),
          slidesToScroll: 1,
          focusOnSelect: true,
          arrows: imgs.length > 5,
          dots: false,
          autoplay: false,
          speed: 500,
          infinite: imgs.length > 5,
          draggable: true,
          swipe: true,
          touchMove: true,
          asNavFor: showFeature ? "#" + featId : null,
          slide: ".thumb-item",
          prevArrow:
            '<button type="button" class="slick-prev" aria-label="Previous"><span>‹</span></button>',
          nextArrow:
            '<button type="button" class="slick-next" aria-label="Next"><span>›</span></button>',
          responsive: [
            {
              breakpoint: 980,
              settings: {
                slidesToShow: Math.min(4, imgs.length),
                arrows: imgs.length > 4,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: Math.min(3, imgs.length),
                arrows: imgs.length > 3,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: Math.min(2, imgs.length),
                arrows: imgs.length > 2,
              },
            },
          ],
        });
      }

      // LIGHTBOX FUNCTIONALITY
      if (enableLightbox) {
        var opening = false;

        function openLightbox(e) {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }

          if (
            opening ||
            (typeof Fancybox !== "undefined" && Fancybox.getInstance())
          ) {
            return false;
          }

          opening = true;

          var items = $.map(imgs, function (img) {
            return { src: img.src, type: "image", caption: img.alt };
          });

          // Pause feature slider
          if (showFeature && autoplay) {
            $("#" + featId).slick("slickPause");
          }

          if (typeof Fancybox !== "undefined") {
            try {
              Fancybox.show(items, {
                infinite: true,
                Toolbar: {
                  display: {
                    left: ["infobar"],
                    middle: [],
                    right: ["slideshow", "thumbs", "close"],
                  },
                },
                on: {
                  done: function () {
                    opening = false;
                  },
                  close: function () {
                    opening = false;
                    if (showFeature && autoplay) {
                      $("#" + featId).slick("slickPlay");
                    }
                  },
                },
              });
            } catch (err) {
              console.error("Fancybox error:", err);
              opening = false;
            }
          } else if ($.fancybox) {
            $.fancybox.open(items, {
              loop: true,
              afterClose: function () {
                opening = false;
                if (showFeature && autoplay) {
                  $("#" + featId).slick("slickPlay");
                }
              },
            });
          } else {
            opening = false;
            window.open(items[0].src, "_blank");
          }

          return false;
        }

        // Bind events
        $wrap.off("click.lightbox");
        $wrap.on(
          "click.lightbox",
          ".cfs-overlay-btn, .see-all-btn, .feature-slide img, .thumb img",
          openLightbox
        );
      }
    }, 100);

    $column.data("gallery-initialized", true);
  }

  /**
   * Initialize all galleries
   */
  function initAllGalleries() {
    if (typeof window.jQuery === "undefined") {
      console.error("jQuery is required but not loaded");
      return;
    }

    var $ = window.jQuery;

    $(".c-feature-image-slider-column").each(function () {
      initGallery($(this));
    });
  }

  /**
   * Main initialization function
   */
  function init() {
    if (state.initialized) {
      return;
    }

    loadDependencies()
      .then(function () {
        // Wait for jQuery to be ready
        if (typeof window.jQuery !== "undefined") {
          window.jQuery(function ($) {
            state.initialized = true;
            initAllGalleries();

            // Re-initialize on window load (for dynamically added content)
            $(window).on("load", function () {
              initAllGalleries();
            });

            // Support for Divi Builder
            if (typeof window.et_pb_custom !== "undefined") {
              $(document).on("et_pb_after_init_modules", function () {
                initAllGalleries();
              });
            }

            // Support for dynamically added content (MutationObserver)
            // Debounced to prevent performance issues
            if (typeof MutationObserver !== "undefined") {
              var mutationTimeout;
              var observer = new MutationObserver(function (mutations) {
                // Clear previous timeout
                clearTimeout(mutationTimeout);
                // Debounce: wait 300ms before initializing
                mutationTimeout = setTimeout(function () {
                  initAllGalleries();
                }, 300);
              });

              observer.observe(document.body, {
                childList: true,
                subtree: true,
              });
            }
          });
        }
      })
      .catch(function (error) {
        console.error("Failed to load dependencies:", error);
      });
  }

  // Auto-initialize when script loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API for manual initialization
  window.FancyBoxSlider = {
    init: init,
    initGallery: function (selector) {
      if (typeof window.jQuery !== "undefined") {
        var $ = window.jQuery;
        // Support both selector string and jQuery object
        if (typeof selector === "string") {
          $(selector).each(function () {
            // Reset initialization flag to allow re-initialization
            var $el = $(this);
            $el.removeData("gallery-initialized");
            initGallery($el);
          });
        } else if (selector && selector.length) {
          // jQuery object
          selector.each(function () {
            var $el = $(this);
            $el.removeData("gallery-initialized");
            initGallery($el);
          });
        } else if (selector && selector.jquery) {
          // Single jQuery element
          selector.removeData("gallery-initialized");
          initGallery(selector);
        }
      } else {
        console.warn("jQuery is not loaded. Cannot initialize gallery.");
      }
    },
    // New method: Initialize all existing galleries (useful for pre-loaded content)
    initAll: function () {
      if (typeof window.jQuery !== "undefined") {
        var $ = window.jQuery;
        $(".c-feature-image-slider-column").each(function () {
          var $el = $(this);
          // Reset initialization flag to allow re-initialization
          $el.removeData("gallery-initialized");
          initGallery($el);
        });
      } else {
        console.warn("jQuery is not loaded. Cannot initialize galleries.");
      }
    },
  };
})();

