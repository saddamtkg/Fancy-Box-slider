/**
 * Dynamic Content Loader Example
 * এই ফাইলটি শুধুমাত্র উদাহরণ হিসেবে - আপনার প্রকৃত প্রজেক্টে আলাদা JS file ব্যবহার করুন
 */

(function() {
  'use strict';

  // ============================================
  // STEP 1: Content load করার function
  // ============================================
  function loadDynamicContent() {
    // Simulate AJAX call বা actual AJAX call
    var contentHTML = `
      <div class="c-feature-image-slider-column" data-show-thumbnails="false">
        <div>
          <img src="https://picsum.photos/id/300/1200/800" alt="Dynamic Image 1" />
        </div>
        <div>
          <img src="https://picsum.photos/id/301/1200/800" alt="Dynamic Image 2" />
        </div>
        <div>
          <img src="https://picsum.photos/id/302/1200/800" alt="Dynamic Image 3" />
        </div>
        <div>
          <img src="https://picsum.photos/id/303/1200/800" alt="Dynamic Image 4" />
        </div>
      </div>
    `;

    // Check if jQuery is available
    if (typeof window.jQuery === 'undefined') {
      console.error('jQuery is not loaded. Cannot load dynamic content.');
      return;
    }

    var $ = window.jQuery;

    // Show status
    var $status = $('#dynamic-slider-status');
    var $statusText = $('#status-text');
    if ($status.length) {
      $status.show();
      $statusText.text('Content loading...');
    }

    // Content insert করুন
    var $container = $('#dynamic-slider-container');
    if ($container.length) {
      $container.html(contentHTML);
      
      if ($status.length) {
        $statusText.text('Content loaded. Initializing slider...');
      }
      
      // ============================================
      // STEP 2: Content load হওয়ার পর Slider initialize করুন
      // ============================================
      // একটু delay দিন DOM update হওয়ার জন্য
      setTimeout(function() {
        // Slider initialize করুন
        if (typeof FancyBoxSlider !== 'undefined') {
          FancyBoxSlider.initGallery('#dynamic-slider-container .c-feature-image-slider-column');
          console.log('✅ Dynamic slider initialized successfully!');
          if ($status.length) {
            $statusText.text('✅ Slider initialized successfully!');
            $status.css('background', 'rgba(34, 197, 94, 0.1)');
            $statusText.css('color', '#22c55e');
            setTimeout(function() {
              $status.fadeOut();
            }, 3000);
          }
        } else {
          console.warn('⚠️ FancyBoxSlider is not loaded yet. Retrying...');
          if ($status.length) {
            $statusText.text('⚠️ Waiting for slider script...');
          }
          // Retry after a bit
          var retryCount = 0;
          var retryInterval = setInterval(function() {
            retryCount++;
            if (typeof FancyBoxSlider !== 'undefined') {
              clearInterval(retryInterval);
              FancyBoxSlider.initGallery('#dynamic-slider-container .c-feature-image-slider-column');
              console.log('✅ Dynamic slider initialized after retry!');
              if ($status.length) {
                $statusText.text('✅ Slider initialized successfully!');
                $status.css('background', 'rgba(34, 197, 94, 0.1)');
                $statusText.css('color', '#22c55e');
                setTimeout(function() {
                  $status.fadeOut();
                }, 3000);
              }
            } else if (retryCount > 10) {
              clearInterval(retryInterval);
              console.error('❌ FancyBoxSlider failed to load after multiple attempts');
              if ($status.length) {
                $statusText.text('❌ Failed to initialize slider. Check console for errors.');
                $status.css('background', 'rgba(239, 68, 68, 0.1)');
                $statusText.css('color', '#ef4444');
              }
            }
          }, 200);
        }
      }, 200);
    } else {
      console.error('Container #dynamic-slider-container not found');
      if ($status.length) {
        $statusText.text('❌ Container not found');
        $status.css('background', 'rgba(239, 68, 68, 0.1)');
        $statusText.css('color', '#ef4444');
      }
    }
  }

  // ============================================
  // STEP 3: Page load হওয়ার পর content load করুন
  // ============================================
  // Wait for jQuery to be available
  function initDynamicLoader() {
    if (typeof window.jQuery === 'undefined') {
      // Retry if jQuery not loaded yet
      setTimeout(initDynamicLoader, 100);
      return;
    }

    var $ = window.jQuery;

    // Wait for DOM ready
    $(document).ready(function() {
      // Button click event
      $('#load-dynamic-content-btn').on('click', function() {
        loadDynamicContent();
      });

      // Auto load on page load (optional - uncomment to enable)
      // loadDynamicContent();
    });
  }

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicLoader);
  } else {
    initDynamicLoader();
  }

  // ============================================
  // Alternative: AJAX দিয়ে content load করার উদাহরণ
  // ============================================
  function loadContentViaAJAX() {
    $.ajax({
      url: 'your-api-endpoint.php', // আপনার API endpoint
      method: 'GET',
      success: function(response) {
        // Response থেকে HTML তৈরি করুন
        var html = '<div class="c-feature-image-slider-column">';
        
        // Loop through images
        if (response.images && response.images.length > 0) {
          response.images.forEach(function(img) {
            html += '<div><img src="' + img.url + '" alt="' + img.alt + '" /></div>';
          });
        }
        
        html += '</div>';

        // Content insert করুন
        $('#dynamic-slider-container').html(html);

        // Slider initialize করুন
        setTimeout(function() {
          if (typeof FancyBoxSlider !== 'undefined') {
            FancyBoxSlider.initGallery('#dynamic-slider-container .c-feature-image-slider-column');
          }
        }, 100);
      },
      error: function() {
        console.error('Failed to load content');
      }
    });
  }

  // ============================================
  // Alternative: Content string থেকে load করার উদাহরণ
  // ============================================
  function loadContentFromString(htmlString) {
    // HTML string insert করুন
    $('#dynamic-slider-container').html(htmlString);

    // Slider initialize করুন
    setTimeout(function() {
      if (typeof FancyBoxSlider !== 'undefined') {
        FancyBoxSlider.initGallery('#dynamic-slider-container .c-feature-image-slider-column');
      } else {
        // যদি slider script এখনো load না হয়ে থাকে
        var checkInterval = setInterval(function() {
          if (typeof FancyBoxSlider !== 'undefined') {
            clearInterval(checkInterval);
            FancyBoxSlider.initGallery('#dynamic-slider-container .c-feature-image-slider-column');
          }
        }, 100);
      }
    }, 100);
  }

  // Export functions (যদি প্রয়োজন হয়)
  window.DynamicContentLoader = {
    load: loadDynamicContent,
    loadViaAJAX: loadContentViaAJAX,
    loadFromString: loadContentFromString
  };

})();

