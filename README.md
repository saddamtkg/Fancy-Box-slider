# Modern Feature Gallery System

> Professional image gallery with feature slider, thumbnail navigation, and lightbox functionality.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jQuery](https://img.shields.io/badge/jQuery-3.6+-blue.svg)](https://jquery.com/)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)]()

**✨ Live Preview:** [https://saddamtkg.github.io/Fancy-Box-slider/](https://saddamtkg.github.io/Fancy-Box-slider/)

---

## Overview

Modern Feature Gallery System is a lightweight, responsive image gallery built with jQuery, Slick Carousel, and Fancybox. Create stunning image galleries with just a few lines of HTML.

### Key Features

- 🖼️ **Large Feature Slider** - Main image display with smooth animations
- 🎞️ **Thumbnail Navigation** - Interactive thumbnail carousel
- 🔍 **Lightbox Gallery** - Full-screen image viewing
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Auto-play Support** - Configurable automatic slideshow
- 🎨 **Highly Customizable** - Control features via data attributes
- 🔄 **Multiple Instances** - Unlimited independent galleries per page

---

## Quick Start

### Installation (Standalone - Recommended)

**🚀 One Script Loads Everything!**

The slider automatically loads all dependencies (jQuery, Slick, Fancybox) from JavaScript. Just include two files:

```html
<head>
  <!-- Custom Styles (optional - can be loaded via JS) -->
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <!-- Your content -->

  <!-- Fancy Box Slider - Standalone (loads all dependencies automatically) -->
  <script src="fancy-box-slider.js"></script>
</body>
```

**2. Add Gallery Markup (Works with ANY HTML Structure!)**

```html
<!-- Example 1: Divi Builder structure -->
<div class="c-feature-image-slider-column">
  <div class="et_pb_module">
    <img src="image1.jpg" alt="Image 1" />
  </div>
  <div class="et_pb_module">
    <img src="image2.jpg" alt="Image 2" />
  </div>
  <div class="et_pb_module">
    <img src="image3.jpg" alt="Image 3" />
  </div>
</div>

<!-- Example 2: Simple div structure -->
<div class="c-feature-image-slider-column">
  <div><img src="image1.jpg" alt="Image 1" /></div>
  <div><img src="image2.jpg" alt="Image 2" /></div>
  <div><img src="image3.jpg" alt="Image 3" /></div>
</div>

<!-- Example 3: Direct images -->
<div class="c-feature-image-slider-column">
  <img src="image1.jpg" alt="Image 1" />
  <img src="image2.jpg" alt="Image 2" />
  <img src="image3.jpg" alt="Image 3" />
</div>

<!-- Example 4: Any nested structure -->
<div class="c-feature-image-slider-column">
  <article><img src="image1.jpg" alt="Image 1" /></article>
  <section><img src="image2.jpg" alt="Image 2" /></section>
  <div><img src="image3.jpg" alt="Image 3" /></div>
</div>
```

**✨ Key Benefits:**
- ✅ **Zero Configuration** - Just add the class `c-feature-image-slider-column`
- ✅ **Works Everywhere** - Compatible with any HTML structure
- ✅ **Auto-loads Dependencies** - jQuery, Slick, and Fancybox load automatically
- ✅ **No Conflicts** - Can be used on any website without breaking existing code

---

## Configuration

### Data Attributes

Control gallery behavior using HTML5 data attributes:

| Attribute              | Type    | Default | Description                      |
| ---------------------- | ------- | ------- | -------------------------------- |
| `data-show-feature`    | boolean | `true`  | Display large feature slider     |
| `data-show-thumbnails` | boolean | `true`  | Display thumbnail carousel       |
| `data-enable-lightbox` | boolean | `true`  | Enable Fancybox lightbox         |
| `data-autoplay`        | boolean | `true`  | Enable automatic slideshow       |
| `data-autoplay-speed`  | number  | `3500`  | Autoplay interval (milliseconds) |

### Usage Examples

**Default Gallery** (all features enabled)

```html
<div class="c-feature-image-slider-column">
  <!-- images -->
</div>
```

**Hero Slider** (large slider only, no lightbox)

```html
<div
  class="c-feature-image-slider-column"
  data-show-thumbnails="false"
  data-enable-lightbox="false"
>
  <!-- images -->
</div>
```

**Portfolio Grid** (thumbnails only)

```html
<div class="c-feature-image-slider-column" data-show-feature="false">
  <!-- images -->
</div>
```

**Product Gallery** (manual navigation, slower speed)

```html
<div class="c-feature-image-slider-column" data-autoplay="false">
  <!-- images -->
</div>
```

**Custom Configuration** (combined options)

```html
<div
  class="c-feature-image-slider-column"
  data-show-thumbnails="false"
  data-autoplay-speed="5000"
>
  <!-- images -->
</div>
```

---

## Technical Specifications

### Responsive Breakpoints

| Device     | Screen Width  | Thumbnails Visible |
| ---------- | ------------- | ------------------ |
| Desktop    | ≥ 980px       | 5 thumbnails       |
| Tablet     | 767px - 979px | 4 thumbnails       |
| Mobile (L) | 480px - 766px | 3 thumbnails       |
| Mobile (S) | < 480px       | 2 thumbnails       |

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari 12+
- Edge (latest)
- Opera (latest)

### Dependencies

- jQuery 3.6+
- Slick Carousel 1.8.1
- Fancybox 5.0

---

### JavaScript API

The slider exposes a global API for manual initialization:

```javascript
// Initialize all galleries on the page
FancyBoxSlider.init();

// Initialize a specific gallery
FancyBoxSlider.initGallery('.my-custom-gallery');
```

### Advanced Configuration

All settings are controlled via HTML data attributes (see Configuration section above). The slider automatically detects and initializes any element with the class `c-feature-image-slider-column`.

---

## Support

- 📖 **Documentation:** See examples in `index.html`
- 🐛 **Issues:** [Report bugs](https://github.com/saddamtkg/Fancy-Box-slider/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/saddamtkg/Fancy-Box-slider/discussions)

---

## License

MIT License © 2025

Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software.

---

## Credits

Built with:

- [jQuery](https://jquery.com/)
- [Slick Carousel](https://kenwheeler.github.io/slick/)
- [Fancybox](https://fancyapps.com/fancybox/)

---

<div align="center">

**[⬆ Back to Top](#modern-feature-gallery-system)**

Made with ❤️ for the web development community

</div>
