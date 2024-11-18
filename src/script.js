window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselTrack = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-track img');

let currentIndex = 0;
const visibleImages = 3;
const imageWidth = 300; // Width of one image
const totalImages = images.length;
const maxIndex = totalImages - visibleImages;

function updateCarousel() {
    const translateX = -currentIndex * imageWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    // Disable or enable buttons based on the current index
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
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

// Initialize carousel
updateCarousel();
