# New Slider + Fancybox Photo Gallery

Lightweight feature + thumbnail image slider with overlay and Fancybox gallery. Dependencies (Slick + Fancybox) are auto-loaded from CDNs only when the target selector exists.

## Features

- Feature slider synced with a thumbnail slider
- Overlay button opens Fancybox gallery
- Auto-pause slider while viewing gallery
- Initializes on-demand and watches DOM changes

## Quick Start

1. Include the script on your page:

```html
<script src="New-slider-fancybox-photo-gallary.js"></script>
```

2. Add a container with images inside modules (Divi example):

```html
<div class="c-feature-image-slider-column">
  <div class="et_pb_module"><img src="image-1.jpg" alt="" /></div>
  <div class="et_pb_module"><img src="image-2.jpg" alt="" /></div>
  <!-- more modules... -->
</div>
```

3. The gallery initializes automatically when it detects `.c-feature-image-slider-column`.

## Use Anywhere (Custom Selector)

You can initialize the slider for any container by calling the global function and passing your selector:

```html
<script>
  // Use a custom selector
  window.initFeatureImageSlider(".my-gallery-container");
</script>
```

Your container should include child elements that contain images. In a non-Divi environment, replace `.et_pb_module` with your own item wrapper (see customization below).

## Customization

- Change target selector:
  - Call `initFeatureImageSlider('YOUR_SELECTOR')` anywhere after the target exists in DOM.
- Change overlay text:
  - The overlay button HTML uses the text `Voir toutes les photos`.
  - Update the string inside the code where the overlay is created (`cfs-overlay-btn`) to customize.
- Change item wrapper:
  - The script looks for images inside `.et_pb_module`. If your structure differs, replace `.et_pb_module` inside `buildFeatureFromColumn` with your wrapper class.

## Behavior

- Lazy load:
  - Slick and Fancybox are loaded only when the target selector is present in the DOM.
- Divi builder safe:
  - Skips initialization when Divi Visual Builder is active (`body.et_fb`).
- Auto re-init:
  - Re-initializes when content is dynamically added (MutationObserver) and on `et_pb_builder_ready`.

## Dependencies

Automatically loaded from CDNs:

- Slick Carousel (`slick.css`, `slick-theme.css`, `slick.min.js`)
- Fancybox (`fancybox.css`, `fancybox.umd.js`)

They are only loaded once, and only when needed.

## Troubleshooting

- Nothing happens:
  - Ensure the selector you pass actually exists and contains images.
- Double initialization:
  - Elements are protected by an `data('cfs-initialized')` flag; if you see repeats, ensure you aren’t cloning initialized nodes.
- Builder mode:
  - Visual Builder (`et_fb`) disables the script to avoid conflicts.

## License

Internal project usage. No explicit license included.
