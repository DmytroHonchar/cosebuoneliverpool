// Wrap the entire script inside a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
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

    // Our Food Carousel Functionality
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselTrack = document.querySelector('.carousel-track');
    const images = document.querySelectorAll('.carousel-track img');

    let currentIndex = 0;
    const visibleImages = 3;
    const imageWidth = 320; // Adjusted width
    const totalImages = images.length;
    const maxIndex = totalImages - visibleImages;

    function updateCarousel() {
        const translateX = -currentIndex * imageWidth;
        carouselTrack.style.transform = `translateX(${translateX}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
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

    // Reviews Carousel Functionality
    const reviewsPrevBtn = document.getElementById('reviewsPrevBtn');
    const reviewsNextBtn = document.getElementById('reviewsNextBtn');
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviewItems = document.querySelectorAll('.review-item');

    let currentReviewIndex = 0;
    const visibleReviews = 3;
    const reviewItemWidth = 300;
    const totalReviews = reviewItems.length;
    const maxReviewIndex = totalReviews - visibleReviews;

    function updateReviewsCarousel() {
        const translateX = -currentReviewIndex * reviewItemWidth;
        reviewsTrack.style.transform = `translateX(${translateX}px)`;

        reviewsPrevBtn.disabled = currentReviewIndex === 0;
        reviewsNextBtn.disabled = currentReviewIndex >= maxReviewIndex;
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

    // Navigation Overlay Functionality
    const menuIcon = document.querySelector(".menu-icon");
    const closeButton = document.querySelector(".close-btn");
    const overlay = document.querySelector(".nav-overlay");
    const body = document.querySelector("body");

    menuIcon.addEventListener("click", toggleNav);
    closeButton.addEventListener("click", toggleNav);

    function toggleNav() {
        if (!overlay.classList.contains("active")) {
            overlay.classList.remove("inactive");
            overlay.classList.add("active");
            body.classList.add("no-scroll");
        } else {
            overlay.classList.remove("active");
            overlay.classList.add("inactive");
            body.classList.remove("no-scroll");
        }
    }

    // Swipe functionality for the about section images on mobile devices
    if (window.innerWidth <= 768) {
        const imgCards = document.querySelectorAll('.img-section .img-card');
        let currentIndex = 0;
        let startX = 0;
        let isSwiping = false;

        // Initialize images
        function initializeImages() {
            imgCards.forEach((card, index) => {
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active', 'swipe-left', 'swipe-right', 'reset');
                }
            });
        }

        initializeImages();

        // Handle touch events
        const imgSection = document.querySelector('.img-section');

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

        // Functions to show next and previous images
        function showNextImage() {
            if (currentIndex < imgCards.length - 1) {
                imgCards[currentIndex].classList.add('swipe-left');
                imgCards[currentIndex].classList.remove('active');

                currentIndex++;
                imgCards[currentIndex].classList.add('active', 'reset');
                imgCards[currentIndex].classList.remove('swipe-left', 'swipe-right');

                // Clean up classes after animation
                setTimeout(() => {
                    imgCards[currentIndex - 1].classList.remove('swipe-left');
                    imgCards[currentIndex - 1].classList.add('reset');
                }, 500);
            }
        }

        function showPrevImage() {
            if (currentIndex > 0) {
                imgCards[currentIndex].classList.add('swipe-right');
                imgCards[currentIndex].classList.remove('active');

                currentIndex--;
                imgCards[currentIndex].classList.add('active', 'reset');
                imgCards[currentIndex].classList.remove('swipe-left', 'swipe-right');

                // Clean up classes after animation
                setTimeout(() => {
                    imgCards[currentIndex + 1].classList.remove('swipe-right');
                    imgCards[currentIndex + 1].classList.add('reset');
                }, 500);
            }
        }
    }
});
