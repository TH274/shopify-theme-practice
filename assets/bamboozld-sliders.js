
document.addEventListener('DOMContentLoaded', function() {
  initSliders();
  
  window.addEventListener('resize', debounce(function() {
    initSliders();
  }, 250));

  function initSliders() {
    initSliderType('.most-popular-slider:not(.most-popular-grid)', '.product-container', '.product-card');
    
    initSliderType('.new-arrivals-slider:not(.new-arrivals-grid)', '.new-arrival-products', '.new-arrival-product-card');
  }
  
  /**
   * Initialize a specific type of slider
   * @param {string} sliderSelector - Selector for the slider container
   * @param {string} containerSelector - Selector for the products container
   * @param {string} cardSelector - Selector for the product cards
   */
  function initSliderType(sliderSelector, containerSelector, cardSelector) {
    const sliders = document.querySelectorAll(sliderSelector);
    
    sliders.forEach(slider => {
      const container = slider.querySelector(containerSelector);
      const prevBtn = slider.querySelector('.prev-btn');
      const nextBtn = slider.querySelector('.next-btn');
      
      if (container && prevBtn && nextBtn) {
        const cards = container.querySelectorAll(cardSelector || '.product-card');
        
        if (cards.length === 0) return;
        
        const cardRect = cards[0].getBoundingClientRect();
        const cardWidth = cardRect.width;
        
        const scrollAmount = cardWidth + parseInt(getComputedStyle(container).gap);
        
        updateNavButtons(container, prevBtn, nextBtn);
        
        // Remove existing event listeners
        prevBtn.removeEventListener('click', prevBtnClickHandler);
        nextBtn.removeEventListener('click', nextBtnClickHandler);
        container.removeEventListener('scroll', scrollHandler);
        
        // Add event listeners
        prevBtn.addEventListener('click', prevBtnClickHandler);
        nextBtn.addEventListener('click', nextBtnClickHandler);
        container.addEventListener('scroll', scrollHandler);
        
        // Initialize drag to scroll
        setupDragToScroll(container);
        
        function prevBtnClickHandler() {
          container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          });
        }
        
        function nextBtnClickHandler() {
          container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
        
        function scrollHandler() {
          updateNavButtons(container, prevBtn, nextBtn);
        }
      }
    });
  }
  
  /**
   * Set up drag to scroll functionality
   * @param {HTMLElement} element - The scrollable container
   */
  function setupDragToScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let isDragging = false;

    element.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      e.preventDefault();
    });

    element.addEventListener('mouseleave', () => {
      isDown = false;
      isDragging = false;
    });

    element.addEventListener('mouseup', (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        
        const clickedElement = e.target;
        const closestLink = clickedElement.closest('a');
        if (closestLink) {
          const clickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            closestLink.removeEventListener('click', clickHandler);
          };
          closestLink.addEventListener('click', clickHandler, { once: true });
        }
      }
      
      isDown = false;
      isDragging = false;
    });

    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      
      if (Math.abs(walk) > 5) {
        isDragging = true;
      }
      
      element.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    element.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      if (isDragging) {
        const touchTarget = document.elementFromPoint(
          e.changedTouches[0].clientX, 
          e.changedTouches[0].clientY
        );
        
        if (touchTarget) {
          const closestLink = touchTarget.closest('a');
          if (closestLink) {
            e.preventDefault();
            const clickHandler = function(e) {
              e.preventDefault();
              closestLink.removeEventListener('click', clickHandler);
            };
            closestLink.addEventListener('click', clickHandler, { once: true });
          }
        }
      }
      
      isDown = false;
      isDragging = false;
    });

    element.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      
      if (Math.abs(walk) > 10) {
        isDragging = true;
      }
      
      element.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }
  
  /**
   * Update navigation button states based on scroll position
   * @param {HTMLElement} container - The scrollable container
   * @param {HTMLElement} prevBtn - Previous button element
   * @param {HTMLElement} nextBtn - Next button element
   */
  function updateNavButtons(container, prevBtn, nextBtn) {
    const scrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    
    if (scrollLeft <= 0) {
      prevBtn.parentElement.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.parentElement.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }
    
    if (scrollLeft >= maxScrollLeft - 5) {
      nextBtn.parentElement.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.parentElement.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }
  }
  
  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
}); 