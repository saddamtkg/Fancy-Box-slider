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

### Installation

**1. Include Required Libraries**

```html
<head>
  <!-- Slick Carousel -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
  />
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
  />

  <!-- Fancybox -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"
  />

  <!-- Custom Styles -->
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <!-- Your content -->

  <!-- jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <!-- Slick Carousel -->
  <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

  <!-- Fancybox -->
  <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>

  <!-- Gallery Script -->
  <script src="custom.js"></script>
</body>
```

**2. Add Gallery Markup**

```html
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
```

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

### JavaScript Settings

Modify default settings in `custom.js`:

```javascript
autoplay: true,
autoplaySpeed: 3500,
speed: 700,
slidesToShow: 5
```

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
