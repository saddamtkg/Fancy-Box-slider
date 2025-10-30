# 🎨 Modern Gallery System

> A lightweight, customizable image slider and gallery system with thumbnail navigation and lightbox functionality.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jQuery](https://img.shields.io/badge/jQuery-3.6+-blue.svg)](https://jquery.com/)
[![Slick](https://img.shields.io/badge/Slick-1.8.1-green.svg)](https://kenwheeler.github.io/slick/)
[![Fancybox](https://img.shields.io/badge/Fancybox-5.0-orange.svg)](https://fancyapps.com/fancybox/)

<div align="center">
  <img src="https://img.shields.io/badge/Responsive-✓-success" alt="Responsive">
  <img src="https://img.shields.io/badge/Accessible-✓-success" alt="Accessible">
  <img src="https://img.shields.io/badge/Modern%20UI-✓-success" alt="Modern UI">
</div>

---

## 📸 Demo

```html
<!-- It's this simple -->
<div class="c-image-slider-column">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Photo 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Photo 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Photo 3" /></div>
</div>
```

**[View Live Demo](#) • [Download ZIP](#)**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Core Features
- **Two Gallery Types** - Basic slider + Advanced thumbnail gallery
- **Lightbox Integration** - Full-screen image viewing with Fancybox
- **Touch Enabled** - Swipe gestures for mobile devices
- **Keyboard Navigation** - Arrow keys and tab support
- **Auto-play** - Configurable automatic slideshow

</td>
<td width="50%">

### 🎨 Design
- **Modern Dark Theme** - Beautiful glassmorphism effects
- **Fully Responsive** - Mobile-first design
- **Smooth Animations** - 60fps performance
- **Customizable Colors** - CSS variables for easy theming
- **Accessibility** - WCAG 2.1 compliant

</td>
</tr>
</table>

---

## 🚀 Quick Start

### 1️⃣ Add Dependencies

Add to your `<head>`:

```html
<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- Slick Carousel -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />

<!-- Fancybox -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />

<!-- Custom Styles -->
<link href="styles.css" rel="stylesheet" />
```

### 2️⃣ Add Scripts

Add before closing `</body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
<script src="custom.js"></script>
```

### 3️⃣ Add HTML Markup

```html
<!-- Basic Slider -->
<div class="c-image-slider-column">
  <div class="et_pb_module">
    <img src="image1.jpg" alt="Description" />
  </div>
  <div class="et_pb_module">
    <img src="image2.jpg" alt="Description" />
  </div>
</div>
```

**That's it!** 🎉 Your slider is ready.

---

## 📖 Usage

### Basic Gallery (Default - All Features)

Full feature gallery with large image, thumbnails, and lightbox:

```html
<div class="c-feature-image-slider-column">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Image 3" /></div>
</div>
```

---

### 🎛️ Customization Options (Data Attributes)

Control what displays using HTML data attributes:

#### **Option 1: Show Only Large Feature Image**

Hide thumbnails, show only the large slider with arrows and dots:

```html
<div class="c-feature-image-slider-column" data-show-thumbnails="false">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Image 3" /></div>
</div>
```

**Result:** Large feature slider only, with navigation arrows and dots

---

#### **Option 2: Show Only Thumbnail Carousel**

Hide large image, show only thumbnail carousel:

```html
<div class="c-feature-image-slider-column" data-show-feature="false">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Image 3" /></div>
</div>
```

**Result:** Horizontal thumbnail carousel only, clickable for lightbox

---

#### **Option 3: Disable Lightbox (No Fancybox Popup)**

Gallery without lightbox functionality:

```html
<div class="c-feature-image-slider-column" data-enable-lightbox="false">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Image 3" /></div>
</div>
```

**Result:** No "View All Photos" button or click-to-enlarge functionality

---

#### **Option 4: Disable Autoplay**

Manual navigation only:

```html
<div class="c-feature-image-slider-column" data-autoplay="false">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
  <div class="et_pb_module"><img src="photo3.jpg" alt="Image 3" /></div>
</div>
```

**Result:** Images don't auto-advance, user must click arrows or thumbnails

---

#### **Option 5: Custom Autoplay Speed**

Change autoplay interval (in milliseconds):

```html
<div class="c-feature-image-slider-column" data-autoplay-speed="5000">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
</div>
```

**Result:** Slides change every 5 seconds instead of default 3.5 seconds

---

#### **Option 6: Combine Multiple Options**

Mix and match data attributes:

```html
<!-- Large image only, no lightbox, slow autoplay -->
<div class="c-feature-image-slider-column"
     data-show-thumbnails="false"
     data-enable-lightbox="false"
     data-autoplay-speed="6000">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
</div>

<!-- Thumbnails only, with lightbox, no autoplay -->
<div class="c-feature-image-slider-column"
     data-show-feature="false"
     data-autoplay="false">
  <div class="et_pb_module"><img src="photo1.jpg" alt="Image 1" /></div>
  <div class="et_pb_module"><img src="photo2.jpg" alt="Image 2" /></div>
</div>
```

---

### 📋 All Available Data Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-show-feature` | `true`/`false` | `true` | Show/hide large feature image |
| `data-show-thumbnails` | `true`/`false` | `true` | Show/hide thumbnail carousel |
| `data-enable-lightbox` | `true`/`false` | `true` | Enable/disable Fancybox popup |
| `data-autoplay` | `true`/`false` | `true` | Enable/disable automatic sliding |
| `data-autoplay-speed` | Number (ms) | `3500` | Time between slide changes |

---

### 💡 Common Use Cases

<details>
<summary><strong>Simple Hero Slider (full-width images)</strong></summary>

```html
<div class="c-feature-image-slider-column"
     data-show-thumbnails="false"
     data-enable-lightbox="false">
  <div class="et_pb_module"><img src="hero1.jpg" alt="Hero 1" /></div>
  <div class="et_pb_module"><img src="hero2.jpg" alt="Hero 2" /></div>
  <div class="et_pb_module"><img src="hero3.jpg" alt="Hero 3" /></div>
</div>
```
</details>

<details>
<summary><strong>Product Gallery (click to enlarge)</strong></summary>

```html
<div class="c-feature-image-slider-column" data-autoplay="false">
  <div class="et_pb_module"><img src="product1.jpg" alt="Product View 1" /></div>
  <div class="et_pb_module"><img src="product2.jpg" alt="Product View 2" /></div>
  <div class="et_pb_module"><img src="product3.jpg" alt="Product View 3" /></div>
</div>
```
</details>

<details>
<summary><strong>Thumbnail Grid Only (portfolio)</strong></summary>

```html
<div class="c-feature-image-slider-column" data-show-feature="false">
  <div class="et_pb_module"><img src="work1.jpg" alt="Project 1" /></div>
  <div class="et_pb_module"><img src="work2.jpg" alt="Project 2" /></div>
  <div class="et_pb_module"><img src="work3.jpg" alt="Project 3" /></div>
  <div class="et_pb_module"><img src="work4.jpg" alt="Project 4" /></div>
  <div class="et_pb_module"><img src="work5.jpg" alt="Project 5" /></div>
</div>
```
</details>

---

## 🔧 Adapt to Your HTML Structure

**Want to use your own class names?** No problem! Just change 2 lines in `custom.js`:

### For Basic Slider

**Change wrapper class** (line ~11):
```javascript
// From:
$('.c-image-slider-column').each(function() {

// To:
$('.your-custom-class').each(function() {
```

**Change image container** (line ~27):
```javascript
// From:
slide: '.et_pb_module',

// To:
slide: '.your-image-wrapper',
```

### Example with Bootstrap:

```html
<!-- Your HTML -->
<div class="my-slider">
  <div class="slide-item"><img src="img1.jpg" alt="Image 1" /></div>
  <div class="slide-item"><img src="img2.jpg" alt="Image 2" /></div>
</div>
```

```javascript
// Update custom.js
$('.my-slider').each(function() {
  // ... existing code ...
  slide: '.slide-item',
```

### For Feature Gallery

**Change wrapper class** (line ~46):
```javascript
// From:
$('.c-feature-image-slider-column').each(function() {

// To:
$('.my-gallery').each(function() {
```

**Change image finder** (line ~56):
```javascript
// From:
$column.find('.et_pb_module').each(function() {

// To:
$column.find('.gallery-item').each(function() {
```

---

## 🎨 Customization

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0e1a;      /* Main background */
  --bg-secondary: #111827;    /* Panel background */

  /* Accents */
  --accent-primary: #6366f1;  /* Primary color (purple) */
  --accent-secondary: #8b5cf6; /* Secondary color */

  /* Text */
  --text-primary: #f9fafb;    /* Main text */
  --text-muted: #9ca3af;      /* Muted text */
}
```

**Examples:**

<details>
<summary>🔵 Blue Theme</summary>

```css
:root {
  --accent-primary: #3b82f6;
  --accent-secondary: #06b6d4;
  --accent-hover: #2563eb;
}
```
</details>

<details>
<summary>🟢 Green Theme</summary>

```css
:root {
  --accent-primary: #10b981;
  --accent-secondary: #14b8a6;
  --accent-hover: #059669;
}
```
</details>

<details>
<summary>🔴 Red Theme</summary>

```css
:root {
  --accent-primary: #ef4444;
  --accent-secondary: #f59e0b;
  --accent-hover: #dc2626;
}
```
</details>

### Change Animation Speed

In `custom.js`:

```javascript
autoplaySpeed: 4000,  // Slide interval (milliseconds)
speed: 600,           // Transition speed
```

### Change Thumbnail Count

```javascript
slidesToShow: 5,  // Change to 3, 4, 6, etc.
```

### Disable Autoplay

```javascript
autoplay: false,
```

---

## 📚 Configuration Options

### Slider Settings

| Option | Default | Description |
|--------|---------|-------------|
| `autoplay` | `true` | Enable automatic sliding |
| `autoplaySpeed` | `4000` | Delay between slides (ms) |
| `speed` | `600` | Transition duration (ms) |
| `arrows` | `true` | Show navigation arrows |
| `dots` | `true` | Show dot indicators |
| `infinite` | `true` | Enable infinite looping |
| `fade` | `true` | Use fade transition |
| `pauseOnHover` | `true` | Pause on mouse hover |

### Thumbnail Settings

| Option | Default | Description |
|--------|---------|-------------|
| `slidesToShow` | `5` | Number of thumbnails visible |
| `focusOnSelect` | `true` | Click to navigate |
| `responsive` | `true` | Adapt to screen size |

### Lightbox Settings

| Option | Default | Description |
|--------|---------|-------------|
| `infinite` | `true` | Loop through images |
| `Toolbar` | Custom | Toolbar buttons |
| `on.close` | Resume | Resume autoplay on close |

---

## 📱 Responsive Breakpoints

| Device | Screen Size | Thumbnails Shown |
|--------|-------------|------------------|
| Desktop | > 980px | 5 |
| Tablet | 767px - 980px | 4 |
| Mobile Large | 480px - 767px | 3 |
| Mobile Small | < 480px | 2 |

---

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ 12+ |
| Edge | ✅ Latest |
| Opera | ✅ Latest |
| IE 11 | ❌ Not supported |

---

## 🐛 Troubleshooting

<details>
<summary><strong>Slider doesn't work</strong></summary>

**Check loading order:**
```html
<!-- Correct order -->
<script src="jquery.js"></script>         <!-- 1. jQuery first -->
<script src="slick.js"></script>          <!-- 2. Slick second -->
<script src="custom.js"></script>         <!-- 3. Your script last -->
```

**Verify class names match:**
```html
<div class="c-image-slider-column">  <!-- Must be exact -->
```
</details>

<details>
<summary><strong>Images don't show</strong></summary>

**Check HTML structure:**
```html
<!-- Correct -->
<div class="c-image-slider-column">
  <div class="et_pb_module">           <!-- Wrapper needed -->
    <img src="image.jpg" alt="..." />
  </div>
</div>
```

**Check image paths:**
- Use correct relative/absolute paths
- Verify images exist at specified location
</details>

<details>
<summary><strong>Lightbox doesn't open</strong></summary>

**Verify Fancybox is loaded:**
```javascript
// Check in browser console
console.log(typeof Fancybox); // Should be "object" or "function"
```

**Only works with feature gallery:**
```html
<!-- Must use this class -->
<div class="c-feature-image-slider-column">
```
</details>

<details>
<summary><strong>Styles look broken</strong></summary>

**CSS loading order matters:**
```html
<!-- Load in this order -->
<link rel="stylesheet" href="slick.css" />
<link rel="stylesheet" href="slick-theme.css" />
<link rel="stylesheet" href="styles.css" />  <!-- Last -->
```

**Clear browser cache:**
- Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
- Firefox: Ctrl+Shift+Delete
</details>

---

## ⚡ Performance Tips

1. **Optimize Images**
   ```bash
   # Recommended sizes
   Feature Image: 1200x800px, < 200KB
   Thumbnails: 200x133px, < 50KB
   ```

2. **Use Modern Formats**
   - WebP for Chrome, Firefox, Edge
   - JPEG as fallback

3. **Lazy Loading**
   ```javascript
   lazyLoad: 'ondemand',  // Already enabled by default
   ```

4. **Limit Slides**
   - Keep under 15 images per gallery for best performance

---

## 📦 File Structure

```
project/
├── index.html          # Demo page
├── styles.css          # All styles (no inline CSS)
├── custom.js           # Slider initialization
└── README.md           # This file
```

---

## 🎯 Advanced Features

### Add Custom Arrow Icons

```javascript
prevArrow: '<button class="custom-arrow prev">←</button>',
nextArrow: '<button class="custom-arrow next">→</button>',
```

### Add Image Captions

```html
<img src="photo.jpg" alt="Description" data-caption="Your caption here" />
```

### Multiple Galleries on Same Page

Just add more divs with the same classes:

```html
<!-- Gallery 1 -->
<div class="c-feature-image-slider-column">
  <!-- images -->
</div>

<!-- Gallery 2 -->
<div class="c-feature-image-slider-column">
  <!-- images -->
</div>
```

Both will work independently! 🎉

---

## 📄 License

MIT License © 2025

Free for personal and commercial use.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💡 Tips & Best Practices

**✅ DO:**
- Always include `alt` text for accessibility
- Optimize images before uploading
- Test on multiple devices
- Use semantic HTML

**❌ DON'T:**
- Mix inline styles with external CSS
- Use huge image files (> 500KB)
- Forget to test keyboard navigation
- Skip alt attributes

---

## 📞 Support

- 📧 **Issues:** [Open an issue](https://github.com/yourusername/repo/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/repo/discussions)
- 📖 **Documentation:** See sections above

---

## 🏆 Credits

Built with:
- [jQuery](https://jquery.com/) - JavaScript library
- [Slick Carousel](https://kenwheeler.github.io/slick/) - Carousel functionality
- [Fancybox](https://fancyapps.com/fancybox/) - Lightbox gallery

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/repo?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/repo?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/repo?style=social)

---

<div align="center">

**[⬆ Back to Top](#-modern-gallery-system)**

Made with ❤️ by [Your Name](https://github.com/yourusername)

⭐ **Star this repo if you find it helpful!**

</div>
