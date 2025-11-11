# Dynamic Content Slider - ব্যবহারের গাইড

## 📖 সম্পূর্ণ প্রক্রিয়া বুঝুন

### সমস্যা:
যদি আপনার content JavaScript দিয়ে load হয় এবং slider script load হওয়ার আগেই content DOM-এ থাকে, তাহলে slider automatically initialize হবে না।

### সমাধান:
Content load হওয়ার পর manually slider initialize করুন।

---

## 🔄 Step-by-Step প্রক্রিয়া

### Step 1: Content HTML তৈরি করুন
JavaScript দিয়ে আপনার content HTML তৈরি করুন এবং **অবশ্যই** `c-feature-image-slider-column` class যোগ করুন:

```javascript
var contentHTML = `
  <div class="c-feature-image-slider-column">
    <div><img src="image1.jpg" alt="Image 1" /></div>
    <div><img src="image2.jpg" alt="Image 2" /></div>
    <div><img src="image3.jpg" alt="Image 3" /></div>
  </div>
`;
```

### Step 2: Content-কে DOM-এ Insert করুন
আপনার target container-এ content insert করুন:

```javascript
$('#your-container').html(contentHTML);
// অথবা
$('#your-container').append(contentHTML);
```

### Step 3: Slider Initialize করুন
Content DOM-এ insert হওয়ার পর slider initialize করুন:

```javascript
setTimeout(function() {
  FancyBoxSlider.initGallery('#your-container .c-feature-image-slider-column');
}, 100);
```

**কেন setTimeout?** DOM update হওয়ার জন্য একটু সময় দিন।

---

## 💻 সম্পূর্ণ উদাহরণ

### উদাহরণ 1: Simple Content Load

```javascript
// Function তৈরি করুন
function loadSliderContent() {
  // 1. HTML content তৈরি করুন
  var html = '<div class="c-feature-image-slider-column">';
  html += '<div><img src="img1.jpg" /></div>';
  html += '<div><img src="img2.jpg" /></div>';
  html += '<div><img src="img3.jpg" /></div>';
  html += '</div>';
  
  // 2. DOM-এ insert করুন
  $('#slider-container').html(html);
  
  // 3. Slider initialize করুন
  setTimeout(function() {
    FancyBoxSlider.initGallery('#slider-container .c-feature-image-slider-column');
  }, 100);
}

// Button click-এ call করুন
$('#load-btn').on('click', loadSliderContent);
```

### উদাহরণ 2: AJAX দিয়ে Content Load

```javascript
$.ajax({
  url: 'api/get-images.php',
  method: 'GET',
  success: function(response) {
    // 1. Response থেকে HTML তৈরি করুন
    var html = '<div class="c-feature-image-slider-column">';
    
    // Loop through images
    response.images.forEach(function(img) {
      html += '<div><img src="' + img.url + '" alt="' + img.alt + '" /></div>';
    });
    
    html += '</div>';
    
    // 2. DOM-এ insert করুন
    $('#slider-container').html(html);
    
    // 3. Slider initialize করুন
    setTimeout(function() {
      FancyBoxSlider.initGallery('#slider-container .c-feature-image-slider-column');
    }, 100);
  }
});
```

### উদাহরণ 3: Content আগে থেকে আছে

যদি content আগে থেকেই DOM-এ থাকে কিন্তু slider initialize হয়নি:

```javascript
$(document).ready(function() {
  // Check করুন slider initialize হয়েছে কিনা
  if ($('.c-feature-image-slider-column').length > 0) {
    // সব existing galleries initialize করুন
    FancyBoxSlider.initAll();
  }
});
```

---

## 🎯 Important Points

### ✅ করণীয়:
1. **Class যোগ করুন:** Content-এ অবশ্যই `c-feature-image-slider-column` class থাকতে হবে
2. **Timing:** Content insert হওয়ার পর slider initialize করুন
3. **setTimeout ব্যবহার করুন:** DOM update হওয়ার জন্য 100ms delay দিন
4. **Script Order:** `fancy-box-slider.js` আগে load হতে হবে

### ❌ ভুল করবেন না:
1. Content insert করার আগে slider initialize করবেন না
2. Class ভুলে যাবেন না
3. setTimeout ছাড়া initialize করবেন না

---

## 🔧 Available Methods

### Method 1: Specific Gallery Initialize
```javascript
FancyBoxSlider.initGallery('#container .c-feature-image-slider-column');
```

### Method 2: jQuery Object দিয়ে
```javascript
var $gallery = $('.my-gallery');
FancyBoxSlider.initGallery($gallery);
```

### Method 3: সব Galleries Initialize
```javascript
FancyBoxSlider.initAll();
```

---

## 📝 Real-World Example

আপনার প্রকৃত প্রজেক্টে এভাবে ব্যবহার করুন:

```html
<!-- HTML -->
<div id="product-gallery"></div>
<button id="load-products">Load Products</button>
```

```javascript
// আপনার আলাদা JS file (যেমন: product-loader.js)
$('#load-products').on('click', function() {
  // AJAX call
  $.ajax({
    url: 'api/products.php',
    success: function(data) {
      // HTML তৈরি করুন
      var html = '<div class="c-feature-image-slider-column">';
      data.products.forEach(function(product) {
        html += '<div><img src="' + product.image + '" /></div>';
      });
      html += '</div>';
      
      // Insert করুন
      $('#product-gallery').html(html);
      
      // Slider initialize করুন
      setTimeout(function() {
        FancyBoxSlider.initGallery('#product-gallery .c-feature-image-slider-column');
      }, 100);
    }
  });
});
```

---

## 🆘 Troubleshooting

**Slider কাজ করছে না?**
- Check করুন `c-feature-image-slider-column` class আছে কিনা
- Check করুন `fancy-box-slider.js` load হয়েছে কিনা
- Browser console-এ error check করুন
- setTimeout ব্যবহার করেছেন কিনা check করুন

**Content load হচ্ছে কিন্তু slider initialize হচ্ছে না?**
- `FancyBoxSlider.initGallery()` call করেছেন কিনা check করুন
- Selector সঠিক কিনা check করুন
- Script load হওয়ার পর call করছেন কিনা check করুন

---

## 📌 Quick Checklist

- [ ] Content HTML-এ `c-feature-image-slider-column` class আছে
- [ ] Content DOM-এ insert হয়েছে
- [ ] `fancy-box-slider.js` load হয়েছে
- [ ] `FancyBoxSlider.initGallery()` call করেছেন
- [ ] setTimeout ব্যবহার করেছেন

---

**আরও উদাহরণ দেখতে `dynamic-content.js` file দেখুন!**

