document.querySelector('.nav-opener').addEventListener('click', function (event) {
    event.stopPropagation();
    document.querySelector('body').classList.add('active');
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.querySelector('body').classList.remove('active');
});

document.addEventListener('click', function(event) {
    var isClickInsideMenu = document.querySelector('.mobile-menu').contains(event.target);
    var isMenuActive = document.querySelector('body').classList.contains('active');

    if (!isClickInsideMenu && isMenuActive) {
        document.querySelector('body').classList.remove('active');
    }
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
        740: {
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
