// Wrap the entire script inside a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {



// ========== FORM SUBMISSION HANDLING ==========
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const messageStatus = document.getElementById('message-status');

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (result.success) {
                messageStatus.textContent = 'Message sent successfully!';
                messageStatus.className = 'message-success';
                form.reset();
            } else {
                messageStatus.textContent = result.message || 'Failed to send message.';
                messageStatus.className = 'message-error';
            }
        } catch (error) {
            console.error('Error:', error);
            messageStatus.textContent = 'Failed to send message. Please try again later.';
            messageStatus.className = 'message-error';
        }

        // Hide message after 3 seconds
        setTimeout(() => {
            messageStatus.className = 'hidden';
        }, 3000);
    });
}

    // ========== HEADER SCROLL EFFECT ==========
    if (window.innerWidth > 768) {
      window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    } else {
      const header = document.querySelector('header');
      header.classList.add('scrolled');
    }
  
    // ========== OUR FOOD CAROUSEL FUNCTIONALITY ==========
    // Only run this code if .carousel-track exists on the page
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      const images = carouselTrack.querySelectorAll('img');
  
      let currentIndex = 0;
      const visibleImages = 3;
      const imageWidth = 320; // Adjust as needed
      const totalImages = images.length;
      const maxIndex = totalImages - visibleImages;
  
      function updateCarousel() {
        const translateX = -currentIndex * imageWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;
  
        prevBtn.disabled = (currentIndex === 0);
        nextBtn.disabled = (currentIndex >= maxIndex);
      }
  
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
  
      nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
  
      updateCarousel();
    }
  
    // ========== REVIEWS CAROUSEL FUNCTIONALITY ==========
    // Only run if .reviews-track exists on the page
    const reviewsTrack = document.querySelector('.reviews-track');
    if (reviewsTrack) {
      const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
      const reviewsNextBtn = document.getElementById('reviewsNextBtn');
      const reviewItems = reviewsTrack.querySelectorAll('.review-item');
  
      let currentReviewIndex = 0;
      const visibleReviews = 3;
      const reviewItemWidth = 300;
      const totalReviews = reviewItems.length;
      const maxReviewIndex = totalReviews - visibleReviews;
  
      function updateReviewsCarousel() {
        const translateX = -currentReviewIndex * reviewItemWidth;
        reviewsTrack.style.transform = `translateX(${translateX}px)`;
  
        reviewsPrevBtn.disabled = (currentReviewIndex === 0);
        reviewsNextBtn.disabled = (currentReviewIndex >= maxReviewIndex);
      }
  
      reviewsPrevBtn.addEventListener('click', () => {
        if (currentReviewIndex > 0) {
          currentReviewIndex--;
          updateReviewsCarousel();
        }
      });
  
      reviewsNextBtn.addEventListener('click', () => {
        if (currentReviewIndex < maxReviewIndex) {
          currentReviewIndex++;
          updateReviewsCarousel();
        }
      });
  
      updateReviewsCarousel();
    }
  
    // ========== NAVIGATION OVERLAY FUNCTIONALITY ==========
    const menuIcon = document.querySelector('.menu-icon');
    const closeButton = document.querySelector('.close-btn');
    const overlay = document.querySelector('.nav-overlay');
    const body = document.querySelector('body');
  
    if (menuIcon && closeButton && overlay) {
      menuIcon.addEventListener('click', toggleNav);
      closeButton.addEventListener('click', toggleNav);
    }
  
    function toggleNav() {
      if (!overlay.classList.contains('active')) {
        overlay.classList.remove('inactive');
        overlay.classList.add('active');
        body.classList.add('no-scroll');
      } else {
        overlay.classList.remove('active');
        overlay.classList.add('inactive');
        body.classList.remove('no-scroll');
      }
    }
  
    // ========== SWIPE FUNCTIONALITY FOR "ABOUT" IMAGES ON MOBILE ==========
    // Only run if .img-section exists and screen width <= 768
    if (window.innerWidth <= 768) {
      const imgSection = document.querySelector('.img-section');
      if (imgSection) {
        const imgCards = imgSection.querySelectorAll('.img-card');
        let currentIndex = 0;
        let startX = 0;
        let isSwiping = false;
  
        // Initialize images
        function initializeImages() {
          updateImagePositions();
        }
  
        function updateImagePositions() {
          imgCards.forEach((card, index) => {
            card.classList.remove('position-0', 'position-1', 'position-2', 'position-hidden');
  
            if (index === currentIndex) {
              card.classList.add('position-0');
            } else if (index === currentIndex + 1) {
              card.classList.add('position-1');
            } else if (index === currentIndex + 2) {
              card.classList.add('position-2');
            } else {
              card.classList.add('position-hidden');
            }
          });
        }
  
        function showNextImage() {
          if (currentIndex < imgCards.length - 1) {
            currentIndex++;
            updateImagePositions();
          }
        }
  
        function showPrevImage() {
          if (currentIndex > 0) {
            currentIndex--;
            updateImagePositions();
          }
        }
  
        initializeImages();
  
        // Handle touch events
        imgSection.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isSwiping = true;
        });
  
        imgSection.addEventListener('touchmove', (e) => {
          if (!isSwiping) return;
          const currentX = e.touches[0].clientX;
          const diffX = currentX - startX;
  
          if (diffX < -50) {
            // Swiped left
            isSwiping = false;
            showNextImage();
          } else if (diffX > 50) {
            // Swiped right
            isSwiping = false;
            showPrevImage();
          }
        });
  
        imgSection.addEventListener('touchend', () => {
          isSwiping = false;
        });
      }
    }
  });
  