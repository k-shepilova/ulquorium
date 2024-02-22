document.querySelector('.nav-opener').addEventListener('click', function () {
    document.querySelector('body').classList.toggle('active');
});

function scaleSlides(swiper) {
    // Adjust the scale based on the active breakpoint
    const isMobileView = swiper.params.slidesPerView === 1;

    swiper.slides.forEach((slide) => {
        var scale, opacity;
        if (slide === swiper.slides[swiper.activeIndex]) {
            scale = 1; // Center slide scale
            opacity = 1;
        } else {
            scale = isMobileView ? 1 : 0.8; // Smaller scale for other slides on desktop
            opacity = isMobileView ? 1 : 0.6; // Set the opacity lower for "inactive" slides on desktop
        }
        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = opacity;
    });
}

// Initialize Swiper
const mySwiper = new Swiper('.swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 3, // Set to the total number of slides
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Define your breakpoints here
    breakpoints: {
        // when window width is <= 640px
        640: {
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            loopedSlides: 3 // This should still be the total number of slides
        }
    },
    on: {
        init: function () {
            scaleSlides(this);
        },
        slideChange: function () {
            scaleSlides(this);
        },
        resize: function () {
            scaleSlides(this);
        }
    }
});
