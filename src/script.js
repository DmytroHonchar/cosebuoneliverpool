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
    header.classList.add('scrolled'); // Apply background immediately
}

// Our Food Carousel Functionality
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselTrack = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');

let currentIndex = 0;
const visibleImages = 3;
const imageWidth = images[0].clientWidth + 40; // Image width plus margin
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
const reviewItemWidth = reviewItems[0].clientWidth + 20; // Review item width plus margin
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
document.addEventListener("DOMContentLoaded", function () {
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
});
