document.querySelector('.nav-opener').addEventListener('click', function () {
    document.querySelector('body').classList.toggle('active');
});

function scaleSlides(swiper) {
    const isMobileView = swiper.params.slidesPerView === 1;

    swiper.slides.forEach((slide) => {
        var scale, opacity;
        if (slide === swiper.slides[swiper.activeIndex]) {
            scale = 1;
            opacity = 1;
        } else {
            scale = isMobileView ? 1 : 0.8;
            opacity = isMobileView ? 1 : 0.6;
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
    loopedSlides: 3,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            loopedSlides: 3
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
