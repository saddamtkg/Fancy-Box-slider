# Modern Feature Gallery System

A lightweight jQuery gallery with feature slider, thumbnail navigation, and lightbox viewing.

## Installation

### 1. Include Dependencies

```html
<!-- CSS -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
/>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"
/>
<link rel="stylesheet" href="styles.css" />

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
<script src="custom.js"></script>
```

### 2. Basic HTML Structure

```html
<div class="c-feature-image-slider-column">
  <div class="et_pb_module"><img src="image1.jpg" alt="Description 1" /></div>
  <div class="et_pb_module"><img src="image2.jpg" alt="Description 2" /></div>
  <div class="et_pb_module"><img src="image3.jpg" alt="Description 3" /></div>
</div>
```

## Usage

### Default Gallery

No attributes needed - includes large slider, thumbnails, autoplay, and lightbox.

```html
<div class="c-feature-image-slider-column">
  <!-- images -->
</div>
```

### Customization Options

| Attribute              | Values      | Default | Description             |
| ---------------------- | ----------- | ------- | ----------------------- |
| `data-show-feature`    | true/false  | true    | Show large slider       |
| `data-show-thumbnails` | true/false  | true    | Show thumbnail carousel |
| `data-enable-lightbox` | true/false  | true    | Enable lightbox popup   |
| `data-autoplay`        | true/false  | true    | Enable autoplay         |
| `data-autoplay-speed`  | number (ms) | 3500    | Slide interval          |

### Examples

**Large slider only (hero slider):**

```html
<div class="c-feature-image-slider-column" data-show-thumbnails="false"></div>
```

**Thumbnails only (portfolio grid):**

```html
<div class="c-feature-image-slider-column" data-show-feature="false"></div>
```

**No lightbox:**

```html
<div class="c-feature-image-slider-column" data-enable-lightbox="false"></div>
```

**Manual navigation:**

```html
<div class="c-feature-image-slider-column" data-autoplay="false"></div>
```

**Custom speed:**

```html
<div class="c-feature-image-slider-column" data-autoplay-speed="5000"></div>
```

**Combine options:**

```html
<div
  class="c-feature-image-slider-column"
  data-show-thumbnails="false"
  data-enable-lightbox="false"
  data-autoplay-speed="6000"
></div>
```

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Touch/swipe enabled
- ✅ Keyboard navigation
- ✅ Multiple independent galleries per page
- ✅ Automatic initialization
- ✅ Smooth transitions

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## File Structure

```
project/
├── index.html       # Demo page
├── styles.css       # Gallery styles
├── custom.js        # Gallery script
└── README.md        # Documentation
```

## License

MIT License © 2025
