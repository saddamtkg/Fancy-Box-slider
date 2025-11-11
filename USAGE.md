# Fancy Box Slider - Usage Guide

## 📦 Installation on Any Website

### Step 1: Copy Required Files

Copy these files to your website:
- `fancy-box-slider.js` - Main JavaScript file (loads all dependencies automatically)
- `styles.css` - Stylesheet (optional - can be loaded via JS)

### Step 2: Include in Your HTML

Add these lines to your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- ============================================
       OPTIONAL: Include CSS manually
       (If you skip this, JS will try to load it automatically)
       ============================================ -->
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- ============================================
       YOUR CONTENT HERE
       ============================================ -->
  
  <!-- ============================================
       REQUIRED: Include the slider script
       This will automatically load:
       - jQuery (if not already loaded)
       - Slick Carousel CSS & JS
       - Fancybox CSS & JS
       ============================================ -->
  <script src="fancy-box-slider.js"></script>
</body>
</html>
```

---

## 🎯 Basic Usage

### Image Gallery (Default)

```html
<!-- ============================================
     BASIC IMAGE GALLERY
     Shows: Large feature slider + Thumbnails + Lightbox
     ============================================ -->
<div class="c-feature-image-slider-column">
  <div>
    <img src="image1.jpg" alt="Image 1" />
  </div>
  <div>
    <img src="image2.jpg" alt="Image 2" />
  </div>
  <div>
    <img src="image3.jpg" alt="Image 3" />
  </div>
</div>
```

### Content Slider (No Images)

```html
<!-- ============================================
     CONTENT SLIDER
     Works with any HTML content (text, divs, etc.)
     ============================================ -->
<div class="c-feature-image-slider-column">
  <div class="item">
    <h3>Title 1</h3>
    <p>Content here...</p>
  </div>
  <div class="item">
    <h3>Title 2</h3>
    <p>Content here...</p>
  </div>
  <div class="item">
    <h3>Title 3</h3>
    <p>Content here...</p>
  </div>
</div>
```

---

## ⚙️ Data Attributes Reference

### Available Data Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-show-feature` | boolean | `true` | Show/hide large feature image slider |
| `data-show-thumbnails` | boolean | `true` | Show/hide thumbnail carousel |
| `data-enable-lightbox` | boolean | `true` | Enable/disable Fancybox popup |
| `data-autoplay` | boolean | `true` | Enable/disable automatic sliding |
| `data-autoplay-speed` | number | `3500` | Time between slides (milliseconds) |
| `data-slides-to-show` | number | `1` | Number of slides to show at once (content sliders only) |

---

## 📝 Usage Examples

### Example 1: Full Gallery (Default)

```html
<!-- Shows: Feature slider + Thumbnails + Lightbox -->
<div class="c-feature-image-slider-column">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 2: Feature Slider Only (No Thumbnails)

```html
<!-- Shows: Only large feature slider with arrows & dots -->
<div class="c-feature-image-slider-column" data-show-thumbnails="false">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 3: Thumbnails Only (No Feature Slider)

```html
<!-- Shows: Only thumbnail carousel -->
<div class="c-feature-image-slider-column" data-show-feature="false">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 4: Gallery Without Lightbox

```html
<!-- Shows: Feature slider + Thumbnails, but no popup -->
<div class="c-feature-image-slider-column" data-enable-lightbox="false">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 5: Disable Autoplay

```html
<!-- Manual navigation only -->
<div class="c-feature-image-slider-column" data-autoplay="false">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 6: Custom Autoplay Speed

```html
<!-- Slower autoplay (5 seconds) -->
<div class="c-feature-image-slider-column" data-autoplay-speed="5000">
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 7: Content Slider (Single Slide)

```html
<!-- Content slider showing 1 item at a time -->
<div class="c-feature-image-slider-column">
  <div class="card">
    <h3>Card 1</h3>
    <p>Content here...</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>Content here...</p>
  </div>
  <div class="card">
    <h3>Card 3</h3>
    <p>Content here...</p>
  </div>
</div>
```

### Example 8: Content Slider (Multiple Slides)

```html
<!-- Content slider showing 3 items at a time -->
<div class="c-feature-image-slider-column" data-slides-to-show="3">
  <div class="card">
    <h3>Card 1</h3>
    <p>Content here...</p>
  </div>
  <div class="card">
    <h3>Card 2</h3>
    <p>Content here...</p>
  </div>
  <div class="card">
    <h3>Card 3</h3>
    <p>Content here...</p>
  </div>
  <div class="card">
    <h3>Card 4</h3>
    <p>Content here...</p>
  </div>
</div>
```

### Example 9: Combined Options

```html
<!-- Feature slider only, no autoplay, slower speed when enabled -->
<div 
  class="c-feature-image-slider-column" 
  data-show-thumbnails="false"
  data-autoplay="false"
  data-autoplay-speed="6000"
>
  <div><img src="img1.jpg" alt="Image 1" /></div>
  <div><img src="img2.jpg" alt="Image 2" /></div>
  <div><img src="img3.jpg" alt="Image 3" /></div>
</div>
```

### Example 11: Different HTML Structures

```html
<!-- Works with any HTML structure -->

<!-- Structure 1: Simple divs -->
<div class="c-feature-image-slider-column">
  <div><img src="img1.jpg" /></div>
  <div><img src="img2.jpg" /></div>
</div>

<!-- Structure 2: Direct images -->
<div class="c-feature-image-slider-column">
  <img src="img1.jpg" />
  <img src="img2.jpg" />
</div>

<!-- Structure 3: Semantic HTML -->
<div class="c-feature-image-slider-column">
  <article><img src="img1.jpg" /></article>
  <section><img src="img2.jpg" /></section>
</div>

<!-- Structure 4: Divi Builder -->
<div class="c-feature-image-slider-column">
  <div class="et_pb_module"><img src="img1.jpg" /></div>
  <div class="et_pb_module"><img src="img2.jpg" /></div>
</div>
```

---

## 🔧 Advanced: JavaScript API

If you need to manually initialize sliders:

```javascript
// Initialize all galleries on the page
FancyBoxSlider.init();

// Initialize a specific gallery
FancyBoxSlider.initGallery('.my-custom-gallery');
```

---

## 📋 Quick Reference Card

### For Image Galleries:
```html
<div class="c-feature-image-slider-column">
  <!-- Add images here -->
</div>
```

### For Content Sliders:
```html
<div class="c-feature-image-slider-column" data-slides-to-show="3">
  <!-- Add any HTML content here -->
</div>
```

### Common Attributes:
- `data-show-feature="false"` - Hide feature slider
- `data-show-thumbnails="false"` - Hide thumbnails
- `data-enable-lightbox="false"` - Disable popup
- `data-autoplay="false"` - Disable autoplay
- `data-autoplay-speed="5000"` - Set speed (ms)
- `data-slides-to-show="3"` - Show multiple slides (content only)

---

## ✅ Checklist for Implementation

- [ ] Copy `fancy-box-slider.js` to your website
- [ ] Copy `styles.css` to your website (optional)
- [ ] Include script tag: `<script src="fancy-box-slider.js"></script>`
- [ ] Add class `c-feature-image-slider-column` to your container
- [ ] Add images or content inside the container
- [ ] (Optional) Add data attributes for customization

---

## 🆘 Troubleshooting

**Slider not working?**
- Check browser console for errors
- Ensure script is loaded after your content
- Verify jQuery is available (script loads it automatically)

**Images not showing?**
- Check image paths are correct
- Verify images exist in the specified location

**Styles not applied?**
- Ensure `styles.css` is included or let JS load it automatically
- Check for CSS conflicts with your existing styles

---

**Need help?** Check the main `index.html` file for working examples!

