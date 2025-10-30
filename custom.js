/**
 * Modern Gallery System - Custom JavaScript
 * Fixed version with proper initialization
 */

(function () {
  "use strict";

  // Wait for jQuery to be ready
  if (typeof jQuery === "undefined") {
    console.error("jQuery is required but not loaded");
    return;
  }

  jQuery(function ($) {
    // ============================================================
    // BASIC IMAGE SLIDER (.c-image-slider-column)
    // ============================================================

    function initBasicSlider() {
      $(".c-image-slider-column").each(function () {
        var $column = $(this);

        // Skip if already initialized
        if ($column.data("basic-slider-init")) {
          return;
        }

        // Wrap modules if not already wrapped
        if (!$column.find(".c-slider-wrapper").length) {
          $column.wrapInner('<div class="c-slider-wrapper"></div>');
        }

        var $wrapper = $column.find(".c-slider-wrapper");

        // Destroy existing slider if any
        if ($wrapper.hasClass("slick-initialized")) {
          $wrapper.slick("unslick");
        }

        // Initialize Slick
        try {
          $wrapper.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 600,
            adaptiveHeight: true,
            slide: ".et_pb_module",
            pauseOnHover: true,
            pauseOnFocus: true,
            cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
            prevArrow:
              '<button type="button" class="slick-prev" aria-label="Previous"><span>‹</span></button>',
            nextArrow:
              '<button type="button" class="slick-next" aria-label="Next"><span>›</span></button>',
            responsive: [
              {
                breakpoint: 980,
                settings: {
                  slidesToShow: 1,
                },
              },
            ],
          });

          $column.data("basic-slider-init", true);
          console.log("✓ Basic slider initialized");
        } catch (e) {
          console.error("Error initializing basic slider:", e);
        }
      });
    }

    // ============================================================
    // FEATURE GALLERY (.c-feature-image-slider-column)
    // ============================================================

    function initFeatureGallery() {
      $(".c-feature-image-slider-column").each(function () {
        var $column = $(this);

        // Skip if already initialized
        if ($column.data("feature-gallery-init")) {
          return;
        }

        // Extract images
        var imgs = [];
        $column.find(".et_pb_module").each(function () {
          var $img = $(this).find("img").first();
          if ($img.length) {
            imgs.push({
              src: $img.attr("src"),
              alt: $img.attr("alt") || "",
            });
          }
        });

        if (!imgs.length) {
          console.warn("No images found in feature gallery");
          return;
        }

        // Generate unique IDs
        var timestamp = Date.now();
        var random = Math.floor(Math.random() * 10000);
        var uid = "cfs_" + timestamp + "_" + random;
        var featId = uid + "_feat";
        var thumbId = uid + "_thumb";

        // Build HTML structure
        var $wrap = $('<div class="c-feature-wrap"></div>');
        var $feature = $(
          '<div class="feature-slider" id="' + featId + '"></div>'
        );
        var $thumbs = $(
          '<div class="thumb-slider" id="' + thumbId + '"></div>'
        );

        // Populate feature slider
        $.each(imgs, function (i, img) {
          $feature.append(
            '<div class="feature-slide">' +
              '<div class="cfs-overlay-wrap">' +
              '<img src="' +
              img.src +
              '" alt="' +
              img.alt +
              '">' +
              '<div class="cfs-overlay-btn">View All Photos</div>' +
              "</div>" +
              "</div>"
          );
        });

        // Populate thumbnail slider
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

        // Create wrapper
        var $thumbWrapper = $('<div class="thumb-slider-wrapper"></div>');
        $thumbWrapper.append($thumbs);
        $thumbWrapper.append(
          '<div class="button-wrap">' +
            '<button class="see-all-btn" type="button">View All Photos</button>' +
            "</div>"
        );

        // Add to DOM
        $wrap.append($feature).append($thumbWrapper);
        $column.prepend($wrap);

        // Hide original modules
        $column.find(".et_pb_module").hide();

        // Small delay to ensure DOM is ready
        setTimeout(function () {
          var $featureSlider = $("#" + featId);
          var $thumbSlider = $("#" + thumbId);

          if (!$featureSlider.length || !$thumbSlider.length) {
            console.error("Slider elements not found");
            return;
          }

          try {
            // Initialize feature slider first
            $featureSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              fade: false,
              arrows: false,
              dots: false,
              autoplay: true,
              autoplaySpeed: 3500,
              speed: 700,
              adaptiveHeight: false,
              pauseOnHover: true,
              pauseOnFocus: true,
              asNavFor: "#" + thumbId,
              draggable: true,
              swipe: true,
              touchMove: true,
              lazyLoad: "ondemand",
              cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
            });

            console.log("✓ Feature slider initialized");

            // Initialize thumbnail slider
            $thumbSlider.slick({
              slidesToShow: Math.min(5, imgs.length),
              slidesToScroll: 1,
              asNavFor: "#" + featId,
              focusOnSelect: true,
              arrows: imgs.length > 5,
              dots: false,
              autoplay: false,
              speed: 500,
              infinite: imgs.length > 5,
              draggable: true,
              swipe: true,
              touchMove: true,
              centerMode: false,
              cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
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

            console.log("✓ Thumbnail slider initialized");

            // Lightbox functionality
            var fancyboxOpening = false;

            function openGallery(e) {
              if (e) {
                e.preventDefault();
                e.stopPropagation();
              }

              // Prevent multiple simultaneous openings
              if (fancyboxOpening) {
                return false;
              }

              // Check if Fancybox is already open
              if (typeof Fancybox !== "undefined" && Fancybox.getInstance()) {
                return false;
              }

              fancyboxOpening = true;

              var items = $.map(imgs, function (img) {
                return {
                  src: img.src,
                  type: "image",
                  caption: img.alt,
                };
              });

              // Pause feature slider
              $featureSlider.slick("slickPause");

              // Open Fancybox
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
                        fancyboxOpening = false;
                      },
                      close: function () {
                        fancyboxOpening = false;
                        $featureSlider.slick("slickPlay");
                      },
                    },
                  });
                } catch (err) {
                  console.error("Fancybox error:", err);
                  fancyboxOpening = false;
                }
              } else if ($.fancybox) {
                // Fallback for older Fancybox
                $.fancybox.open(items, {
                  loop: true,
                  beforeShow: function () {
                    fancyboxOpening = true;
                  },
                  afterShow: function () {
                    fancyboxOpening = false;
                  },
                  afterClose: function () {
                    fancyboxOpening = false;
                    $featureSlider.slick("slickPlay");
                  },
                });
              } else {
                console.warn("Fancybox not available");
                fancyboxOpening = false;
                window.open(items[0].src, "_blank");
              }

              return false;
            }

            // Bind click events with event delegation
            $wrap.off("click.fancybox");
            $wrap.on("click.fancybox", ".cfs-overlay-btn", openGallery);
            $wrap.on("click.fancybox", ".see-all-btn", openGallery);
            $wrap.on("click.fancybox", ".feature-slide img", openGallery);
          } catch (e) {
            console.error("Error initializing feature gallery sliders:", e);
          }
        }, 100);

        $column.data("feature-gallery-init", true);
      });
    }

    // ============================================================
    // Initialize Everything
    // ============================================================

    function initAll() {
      // Check if Slick is available
      if (typeof $.fn.slick === "undefined") {
        console.error("Slick Carousel is not loaded");
        return;
      }

      initBasicSlider();
      initFeatureGallery();
    }

    // Run on ready
    initAll();

    // Run on window load
    $(window).on("load", function () {
      console.log("Window loaded, checking sliders...");
      initAll();
    });

    // Divi builder support
    if (typeof window.et_pb_custom !== "undefined") {
      $(document).on("et_pb_after_init_modules", initAll);
    }

    console.log("✓ Modern Gallery System ready");
  });
})();
