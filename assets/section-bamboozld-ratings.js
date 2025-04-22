document.addEventListener('DOMContentLoaded', function() {
  initReviewsCarousel();
});

document.addEventListener('shopify:section:load', function(event) {
  if (event.detail.sectionId.includes('bamboozld-ratings')) {
    initReviewsCarousel();
  }
});

function initReviewsCarousel() {
  const reviewsContainer = document.querySelector('.reviews-grid');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  if (!reviewsContainer || !prevBtn || !nextBtn) return;
  
  let autoScrollInterval;
  const autoScrollDelay = 3000;
  let isAnimating = false;
  
  let autoScrollHandler = function() {};
  let prevBtnClickHandler, nextBtnClickHandler;
  
  const updateLayout = () => {
    const windowWidth = window.innerWidth;
    const reviewCards = document.querySelectorAll('.review-card');
    
    clearInterval(autoScrollInterval);
    
    prevBtn.removeEventListener('click', prevBtnClickHandler);
    nextBtn.removeEventListener('click', nextBtnClickHandler);
    
    reviewCards.forEach(card => {
      card.style.display = '';
      card.classList.add('card-active');
    });
    
    // Function to animate transition between cards
    const animateTransition = (cardsToHide, cardsToShow) => {
      if (isAnimating) return;
      isAnimating = true;
      
      // First phase: hide cards that should be hidden
      cardsToHide.forEach(card => {
        card.classList.remove('card-active');
        card.classList.add('card-leaving');
      });
      
      // Wait for leaving animation to complete
      setTimeout(() => {
        cardsToHide.forEach(card => {
          card.style.display = 'none';
          card.classList.remove('card-leaving');
        });
        
        // Second phase: show cards that should be visible
        cardsToShow.forEach(card => {
          card.style.display = '';
          card.classList.add('card-entering');
          
          void card.offsetWidth;
          
          card.classList.remove('card-entering');
          card.classList.add('card-active');
        });
        
        // Animation complete
        setTimeout(() => {
          isAnimating = false;
        }, 500);
      }, 300);
    };
    
    if (windowWidth <= 767) {
      let currentIndex = 0;
      if (!reviewsContainer.dataset.currentIndex) {
        reviewsContainer.dataset.currentIndex = currentIndex;
      } else {
        currentIndex = parseInt(reviewsContainer.dataset.currentIndex);
      }
      
      reviewCards.forEach((card, index) => {
        if (index !== currentIndex) {
          card.style.display = 'none';
        }
      });
      
      prevBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length;
        
        const cardsToHide = [reviewCards[currentIndex]];
        const cardsToShow = [reviewCards[newIndex]];
        
        animateTransition(cardsToHide, cardsToShow);
        currentIndex = newIndex;
        reviewsContainer.dataset.currentIndex = currentIndex;
      };
      
      nextBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newIndex = (currentIndex + 1) % reviewCards.length;
        
        const cardsToHide = [reviewCards[currentIndex]];
        const cardsToShow = [reviewCards[newIndex]];
        
        animateTransition(cardsToHide, cardsToShow);
        currentIndex = newIndex;
        reviewsContainer.dataset.currentIndex = currentIndex;
      };
      
      autoScrollHandler = function() {
        if (isAnimating) return;
        const newIndex = (currentIndex + 1) % reviewCards.length;
        
        const cardsToHide = [reviewCards[currentIndex]];
        const cardsToShow = [reviewCards[newIndex]];
        
        animateTransition(cardsToHide, cardsToShow);
        currentIndex = newIndex;
        reviewsContainer.dataset.currentIndex = currentIndex;
      };
      
    } else if (windowWidth <= 991) {
      let currentPairIndex = 0;
      if (!reviewsContainer.dataset.currentPairIndex) {
        reviewsContainer.dataset.currentPairIndex = currentPairIndex;
      } else {
        currentPairIndex = parseInt(reviewsContainer.dataset.currentPairIndex);
      }
      
      const totalPairs = Math.ceil(reviewCards.length / 2);
      
      reviewCards.forEach((card, index) => {
        const pairIndex = Math.floor(index / 2);
        if (pairIndex !== currentPairIndex) {
          card.style.display = 'none';
        }
      });
      
      prevBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newPairIndex = (currentPairIndex - 1 + totalPairs) % totalPairs;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const pairIndex = Math.floor(index / 2);
          if (pairIndex === currentPairIndex) {
            cardsToHide.push(card);
          } else if (pairIndex === newPairIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentPairIndex = newPairIndex;
        reviewsContainer.dataset.currentPairIndex = currentPairIndex;
      };
      
      nextBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newPairIndex = (currentPairIndex + 1) % totalPairs;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const pairIndex = Math.floor(index / 2);
          if (pairIndex === currentPairIndex) {
            cardsToHide.push(card);
          } else if (pairIndex === newPairIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentPairIndex = newPairIndex;
        reviewsContainer.dataset.currentPairIndex = currentPairIndex;
      };
      
      autoScrollHandler = function() {
        if (isAnimating) return;
        const newPairIndex = (currentPairIndex + 1) % totalPairs;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const pairIndex = Math.floor(index / 2);
          if (pairIndex === currentPairIndex) {
            cardsToHide.push(card);
          } else if (pairIndex === newPairIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentPairIndex = newPairIndex;
        reviewsContainer.dataset.currentPairIndex = currentPairIndex;
      };
      
    } else {
      let currentTrioIndex = 0;
      if (!reviewsContainer.dataset.currentTrioIndex) {
        reviewsContainer.dataset.currentTrioIndex = currentTrioIndex;
      } else {
        currentTrioIndex = parseInt(reviewsContainer.dataset.currentTrioIndex);
      }
      
      const totalTrios = Math.ceil(reviewCards.length / 3);
      
      reviewCards.forEach((card, index) => {
        const trioIndex = Math.floor(index / 3);
        if (trioIndex !== currentTrioIndex) {
          card.style.display = 'none';
        }
      });
      
      prevBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newTrioIndex = (currentTrioIndex - 1 + totalTrios) % totalTrios;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const trioIndex = Math.floor(index / 3);
          if (trioIndex === currentTrioIndex) {
            cardsToHide.push(card);
          } else if (trioIndex === newTrioIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentTrioIndex = newTrioIndex;
        reviewsContainer.dataset.currentTrioIndex = currentTrioIndex;
      };
      
      nextBtnClickHandler = function() {
        if (isAnimating) return;
        resetAutoScroll();
        const newTrioIndex = (currentTrioIndex + 1) % totalTrios;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const trioIndex = Math.floor(index / 3);
          if (trioIndex === currentTrioIndex) {
            cardsToHide.push(card);
          } else if (trioIndex === newTrioIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentTrioIndex = newTrioIndex;
        reviewsContainer.dataset.currentTrioIndex = currentTrioIndex;
      };
      
      autoScrollHandler = function() {
        if (isAnimating) return;
        const newTrioIndex = (currentTrioIndex + 1) % totalTrios;
        
        const cardsToHide = [];
        const cardsToShow = [];
        
        reviewCards.forEach((card, index) => {
          const trioIndex = Math.floor(index / 3);
          if (trioIndex === currentTrioIndex) {
            cardsToHide.push(card);
          } else if (trioIndex === newTrioIndex) {
            cardsToShow.push(card);
          }
        });
        
        animateTransition(cardsToHide, cardsToShow);
        currentTrioIndex = newTrioIndex;
        reviewsContainer.dataset.currentTrioIndex = currentTrioIndex;
      };
    }
    
    prevBtn.addEventListener('click', prevBtnClickHandler);
    nextBtn.addEventListener('click', nextBtnClickHandler);
    
    setupAutoScroll();
  };
  
  function setupAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
  }
  
  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
  }
  
  setupDragToScroll(reviewsContainer);
  
  function setupDragToScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    
    element.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      e.preventDefault();
      
      clearInterval(autoScrollInterval);
    });
    
    element.addEventListener('mouseleave', () => {
      isDown = false;
      
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
    });
    
    element.addEventListener('mouseup', () => {
      isDown = false;
      
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
    });
    
    element.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    });
    
    element.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
      
      clearInterval(autoScrollInterval);
    }, { passive: true });
    
    element.addEventListener('touchend', () => {
      isDown = false;
      
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
    });
    
    element.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - element.offsetLeft;
      const walk = (x - startX) * 2;
      element.scrollLeft = scrollLeft - walk;
    }, { passive: true });
  }
  
  updateLayout();
  
  window.addEventListener('resize', function() {
    clearInterval(autoScrollInterval);
    updateLayout();
  });
  
  document.querySelector('.reviews-carousel').addEventListener('mouseenter', function() {
    clearInterval(autoScrollInterval);
  });
  
  document.querySelector('.reviews-carousel').addEventListener('mouseleave', function() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(autoScrollHandler, autoScrollDelay);
  });
}

if (Shopify && Shopify.designMode) {
  initReviewsCarousel();
} 