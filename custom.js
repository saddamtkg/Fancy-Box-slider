/**
 * Modern Gallery System - Single Flexible Slider
 * One function that adapts to data attributes
 */

(function () {
  "use strict";

  if (typeof jQuery === "undefined") {
    console.error("jQuery is required but not loaded");
    return;
  }

  jQuery(function ($) {
    function initGallery() {
      $(".c-feature-image-slider-column").each(function () {
        var $column = $(this);

        // Skip if already initialized
        if ($column.data("gallery-initialized")) {
          return;
        }

        // READ DATA ATTRIBUTES (with defaults)
        var showFeature = $column.attr("data-show-feature") !== "false";
        var showThumbnails = $column.attr("data-show-thumbnails") !== "false";
        var enableLightbox = $column.attr("data-enable-lightbox") !== "false";
        var autoplay = $column.attr("data-autoplay") !== "false";
        var autoplaySpeed =
          parseInt($column.attr("data-autoplay-speed")) || 3500;

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

        if (!imgs.length) return;

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

        // Add to DOM and hide original
        $column.prepend($wrap);
        $column.find(".et_pb_module").hide();

        // Initialize sliders after DOM ready
        setTimeout(function () {
          // INITIALIZE FEATURE SLIDER
          if (showFeature) {
            var $featureSlider = $("#" + featId);

            $featureSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              fade: false,
              arrows: !showThumbnails,
              dots: !showThumbnails,
              autoplay: false,
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
              autoplay: true,
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
      });
    }

    // Initialize
    function init() {
      if (typeof $.fn.slick === "undefined") {
        console.error("Slick Carousel not loaded");
        return;
      }
      initGallery();
    }

    init();
    $(window).on("load", init);

    if (typeof window.et_pb_custom !== "undefined") {
      $(document).on("et_pb_after_init_modules", init);
    }
  });
})();
